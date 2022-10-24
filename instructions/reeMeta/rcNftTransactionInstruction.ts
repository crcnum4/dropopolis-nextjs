import { PublicKey, SystemProgram, TransactionInstruction } from "@solana/web3.js";
import { Serializer, Ux } from "../../tools/serializer";
import { keyFormat } from "../utils";

export const nftTransactionInstruction = (
  programId: PublicKey,
  userWallet: PublicKey,
  metadataPda: PublicKey,
  target: PublicKey,
  amount: number,
  royalties: PublicKey[],
): TransactionInstruction => {

  const keys = [
    keyFormat.writable(metadataPda),
    keyFormat.full(userWallet),
    keyFormat.writable(target),
    keyFormat.readonly(SystemProgram.programId),
  ]

  for (let i = 0; i < royalties.length; i++) {
    keys.push(keyFormat.writable(royalties[i]))
  }

  return new TransactionInstruction({
    programId,
    keys,
    data: Buffer.concat([
      Serializer.number(4, Ux.U8),
      Serializer.number(amount, Ux.U64)
    ])
  })
}