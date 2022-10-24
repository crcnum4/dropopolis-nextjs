import { 
  PublicKey,
  TransactionInstruction,
  SystemProgram,
  SYSVAR_RENT_PUBKEY
} from "@solana/web3.js";
import { NATIVE_MINT, TOKEN_PROGRAM_ID } from "@solana/spl-token2";
import { keyFormat } from "../utils";
import { Serializer, Ux } from "../../tools/serializer";

export type CompleteEscrowKeys = {
  programId: PublicKey,
  reeMetaProgramId: PublicKey,
  escrowPda: PublicKey,
  payer: PublicKey,
  assetMetadata: PublicKey,
  assetHoldingAccount: PublicKey,
  seller: PublicKey,
  buyerAssetAccount: PublicKey,
  //TODO add the following for non Sol transactions.
  buyerPurchaseAccount?: PublicKey,
  sellerPurchaseAccount?: PublicKey,
  royalties?: PublicKey[],
}

export const completeEscrowInstruction = (
  programId: PublicKey,
  reeMetaProgramId: PublicKey,
  escrowPda: PublicKey,
  payer: PublicKey,
  assetMetadata: PublicKey,
  assetHoldingAccount: PublicKey,
  seller: PublicKey,
  buyerAssetAccount: PublicKey,
  sellPrice: number,
  royalties?: PublicKey[],
  //TODO add the following for non Sol transactions.
  buyerPurchaseAccount?: PublicKey,
  sellerPurchaseAccount?: PublicKey,
): TransactionInstruction => {
  const keyList = [
    keyFormat.writable(escrowPda),
    keyFormat.full(payer),
    keyFormat.readonly(assetMetadata),
    keyFormat.writable(assetHoldingAccount),
    keyFormat.writable(seller),
    keyFormat.writable(buyerAssetAccount),
    keyFormat.readonly(SystemProgram.programId),
    keyFormat.readonly(TOKEN_PROGRAM_ID),
    keyFormat.readonly(reeMetaProgramId),
  ]

  if (buyerPurchaseAccount && sellerPurchaseAccount) {
    keyList.push(keyFormat.writable(buyerPurchaseAccount))
    keyList.push(keyFormat.writable(sellerPurchaseAccount))
  }

  if (royalties) {
    for (let i = 0; i < royalties.length; i++) {
      keyList.push(keyFormat.writable(royalties[i]));
    }
  }

  return new TransactionInstruction({
    programId: programId,
    keys: keyList,
    data: Buffer.concat([
      Serializer.number(1, Ux.U8),
      Serializer.number(sellPrice, Ux.U64),
    ])
  })
}