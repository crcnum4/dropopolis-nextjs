import { PublicKey, SOLANA_SCHEMA } from "@solana/web3.js";
import BN from "bn.js";
import { deserialize } from "borsh";
import {Buffer} from 'buffer';
import { REE_ESCROW_PREFIX } from "../statics/pdaPrefixs";

export interface EscrowData {
  active: number,
  seller: PublicKey,
  sellerAssetAccount: PublicKey,
  assetMint: PublicKey,
  assetMetadata: PublicKey,
  assetHoldingAccount: PublicKey,
  paymentTokenMint: PublicKey,
  expectedAmount: BN,
  buffer: Buffer,
}

export class Escrow {
  active: boolean;
  seller: PublicKey;
  sellerAssetAccount: PublicKey;
  assetMint: PublicKey;
  assetMetadata: PublicKey;
  assetHoldingAccount: PublicKey;
  paymentTokenMint: PublicKey;
  expectedAmount: BN;

  constructor(data: EscrowData) {
    this.active = data.active != 0;
    this.seller = new PublicKey(data.seller);
    this.sellerAssetAccount = new PublicKey(data.sellerAssetAccount);
    this.assetMint = new PublicKey(data.assetMint);
    this.assetMetadata = new PublicKey(data.assetMetadata);
    this.assetHoldingAccount = new PublicKey(data.assetHoldingAccount);
    this.paymentTokenMint = new PublicKey(data.paymentTokenMint);
    this.expectedAmount = data.expectedAmount;
  }

  static decode(data: Buffer): Escrow {
    const escrow = deserialize(SOLANA_SCHEMA, this, data);
    return escrow;
  }
}

SOLANA_SCHEMA.set(Escrow, {
  kind: 'struct',
  fields: [
    ['active', 'u8'],
    ['seller', [32]],
    ['sellerAssetAccount',[32]],
    ['assetMint', [32]],
    ['assetMetadata', [32]],
    ['assetHoldingAccount', [32]],
    ['paymentTokenMint', [32]],
    ['expectedAmount', 'u64'],
    ['buffer', 'buffer']
  ]
})

export const getEscrow = async (
  programId: PublicKey, assetMint: PublicKey, seller: PublicKey
): Promise<PublicKey> => {
  const seeds: Buffer[] = [
    Buffer.from(REE_ESCROW_PREFIX),
    programId.toBuffer(),
    assetMint.toBuffer(),
    seller.toBuffer(),
  ]

  const [escrowPda, _bumpSeed] = await PublicKey.findProgramAddress(seeds, programId);

  return escrowPda;
}

export const getHoldingAccount = async (
  programId: PublicKey,
  assetMint: PublicKey,
  escrowPda: PublicKey,
): Promise<PublicKey> => {
  const seeds: Buffer[] = [
    Buffer.from(REE_ESCROW_PREFIX),
    programId.toBuffer(),
    assetMint.toBuffer(),
    escrowPda.toBuffer(),
  ]

  const [holdingAccount, _bumpSeed] = await PublicKey.findProgramAddress(seeds, programId);

  return holdingAccount;
}

export const getEscrowAndHoldingKeys = async(
  programId: PublicKey, assetMint: PublicKey, seller: PublicKey
): Promise<[PublicKey, PublicKey]> => {
  const escrowPda = await getEscrow(programId, assetMint, seller)
  return [escrowPda, await getHoldingAccount(programId, assetMint, escrowPda)]
}