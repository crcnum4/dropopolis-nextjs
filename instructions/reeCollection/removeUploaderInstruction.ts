import {
  PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, TransactionInstruction
} from '@solana/web3.js';
import { keyFormat } from '../utils';
import { Serializer, Ux } from '../../tools/serializer';

export type RemoveUploaderKeys = {
  programId: PublicKey,
  collectionPda: PublicKey,
  payer: PublicKey,
  publisher: PublicKey,
  uploaderTarget: PublicKey,
  rentRecipient: PublicKey,
}

export const removeUploaderInstruction = (
  keys: RemoveUploaderKeys
): TransactionInstruction => {
  return new TransactionInstruction({
    programId: keys.programId,
    keys: [
      keyFormat.writable(keys.collectionPda),
      keyFormat.full(keys.payer),
      keyFormat.signOnly(keys.publisher),
      keyFormat.readonly(keys.uploaderTarget),
      keyFormat.writable(keys.rentRecipient),
      keyFormat.readonly(SystemProgram.programId),
      keyFormat.readonly(SYSVAR_RENT_PUBKEY)
    ],
    data: Serializer.number(5, Ux.U8)
  })
}