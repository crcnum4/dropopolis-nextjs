import {
  PublicKey,
  TransactionInstruction,
} from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { keyFormat } from "../utils";
import { Serializer, Ux } from "../../tools/serializer";

export type mintNftKeys = {
  mint: PublicKey,
  mintAuthority: PublicKey,
  recipient: PublicKey,
  programId: PublicKey,
}

export const mintNftToInstruction = (keys: mintNftKeys): TransactionInstruction => {
  return new TransactionInstruction({
    programId: keys.programId,
    keys: [
      keyFormat.writable(keys.mint),
      keyFormat.full(keys.mintAuthority),
      keyFormat.writable(keys.recipient),
      keyFormat.readonly(TOKEN_PROGRAM_ID),
    ],
    data: Serializer.number(1, Ux.U8)
  })
}