import { 
  PublicKey,
  TransactionInstruction,
  SystemProgram,
  SYSVAR_RENT_PUBKEY
} from "@solana/web3.js";
import { NATIVE_MINT, TOKEN_PROGRAM_ID } from "@solana/spl-token2";
import { keyFormat } from "../utils";
import { Serializer, Ux } from "../../tools/serializer";

export type CreateEscrowKeys = {
  escrowPda: PublicKey,
  payer: PublicKey,
  assetMint: PublicKey,
  assetMetadata: PublicKey,
  assetHoldingAccount: PublicKey,
  seller: PublicKey,
  sellerAssetAccount: PublicKey,
  programId: PublicKey,
  reeMetaProgramId: PublicKey,
  identifier: PublicKey,
}
 
export const createEscrowInstruction = (
  keys: CreateEscrowKeys, sellPrice: number
): TransactionInstruction => {
  return new TransactionInstruction({
    programId: keys.programId,
    keys: [
      keyFormat.writable(keys.escrowPda),
      keyFormat.full(keys.payer),
      keyFormat.readonly(keys.assetMint),
      keyFormat.readonly(keys.assetMetadata),
      keyFormat.writable(keys.assetHoldingAccount),
      keyFormat.signOnly(keys.seller),
      keyFormat.writable(keys.sellerAssetAccount),
      keyFormat.readonly(SystemProgram.programId),
      keyFormat.readonly(SYSVAR_RENT_PUBKEY),
      keyFormat.readonly(TOKEN_PROGRAM_ID),
      keyFormat.readonly(keys.reeMetaProgramId),
      keyFormat.readonly(NATIVE_MINT),
      keyFormat.readonly(keys.identifier),
    ],
    data: Buffer.concat([
      Serializer.number(0, Ux.U8),
      Serializer.number(sellPrice, Ux.U64)
    ])
  })
}