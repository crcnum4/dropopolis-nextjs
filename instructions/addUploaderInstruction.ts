import {
  PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, TransactionInstruction
} from '@solana/web3.js';
import { keyFormat } from './utils';
import { Serializer, Ux } from '../tools/serializer';

export type AddUploaderKeys = {
  programId: PublicKey,
  collectionPda: PublicKey,
  payer: PublicKey,
  publisher: PublicKey,
  newUploader: PublicKey,
}

export const addUploaderInstruction = (keys: AddUploaderKeys): TransactionInstruction => {
  return new TransactionInstruction({
    programId: keys.programId,
    keys: [
      keyFormat.writable(keys.collectionPda),
      keyFormat.full(keys.payer),
      keyFormat.signOnly(keys.publisher),
      keyFormat.readonly(keys.newUploader),
      keyFormat.readonly(SystemProgram.programId),
      keyFormat.readonly(SYSVAR_RENT_PUBKEY),
    ]
  })
}