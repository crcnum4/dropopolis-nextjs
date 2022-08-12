import {
  PublicKey,
  TransactionInstruction,
} from '@solana/web3.js'
import { keyFormat } from './utils'
import { Serializer, Ux } from '../tools/serializer'

export type LockNftKeys = {
  programId: PublicKey,
  metadataPda: PublicKey,
  payer: PublicKey,
  updateAuthority: PublicKey,
}

export const lockNftInstruction = (keys: LockNftKeys): TransactionInstruction => {
  return new TransactionInstruction({
    programId: keys.programId,
    keys: [
      keyFormat.writable(keys.metadataPda),
      keyFormat.full(keys.payer),
      keyFormat.signOnly(keys.updateAuthority),
    ],
    data: Serializer.number(2, Ux.U8)
  })
}