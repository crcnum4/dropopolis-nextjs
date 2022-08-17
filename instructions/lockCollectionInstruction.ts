import {
  PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, TransactionInstruction
} from '@solana/web3.js';
import { keyFormat } from './utils';
import { Serializer, Ux } from '../tools/serializer';
import { type } from 'os';

export type LockCollectionKeys = {
  programId: PublicKey,
  collectionPda: PublicKey,
  payer: PublicKey,
  publisher: PublicKey,
  rentRecipient: PublicKey,
}

export const lockCollectionInstruction = (
  keys: LockCollectionKeys
): TransactionInstruction => {
  return new TransactionInstruction({
    programId: keys.programId,
    keys: [
      keyFormat.writable(keys.collectionPda),
      keyFormat.full(keys.payer),
      keyFormat.signOnly(keys.publisher),
      keyFormat.writable(keys.rentRecipient),
      keyFormat.readonly(SystemProgram.programId),
      keyFormat.readonly(SYSVAR_RENT_PUBKEY),
    ],
    data: Serializer.number(2, Ux.U8)
  })
}