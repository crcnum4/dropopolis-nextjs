import {
  PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, TransactionInstruction
} from '@solana/web3.js';
import { keyFormat } from '../utils';
import { Serializer, Ux } from '../../tools/serializer';

export type SetPublisherKeys = {
  programId: PublicKey,
  collectionPda: PublicKey,
  payer: PublicKey,
  currentPublisher: PublicKey,
  newPublisher: PublicKey,
}

export const setPublisherInstruction = (
  keys: SetPublisherKeys
): TransactionInstruction => {
  return new TransactionInstruction({
    programId: keys.programId,
    keys: [
      keyFormat.writable(keys.collectionPda),
      keyFormat.full(keys.payer),
      keyFormat.signOnly(keys.currentPublisher),
      keyFormat.readonly(keys.newPublisher),
    ],
    data: Serializer.number(6, Ux.U8)
  })
}