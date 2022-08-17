import {
  PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, TransactionInstruction
} from '@solana/web3.js';
import { keyFormat } from './utils';
import { Serializer, Ux } from '../tools/serializer';

export type AddItemToCollectionKeys = {
  programId: PublicKey,
  collectionPda: PublicKey,
  payer: PublicKey,
  uploader: PublicKey,
  toAdd: PublicKey,
}

export type AddPropertiesData = {
  attributes: [key: string, value: string][]
}

export const addItemToCollectionInstruction = (
  keys: AddItemToCollectionKeys,
  data: AddPropertiesData,
): TransactionInstruction => {
  
  return new TransactionInstruction({
    programId: keys.programId,
    keys: [
      keyFormat.writable(keys.collectionPda),
      keyFormat.full(keys.payer),
      keyFormat.signOnly(keys.uploader),
      keyFormat.readonly(keys.toAdd),
      keyFormat.readonly(SystemProgram.programId),
      keyFormat.readonly(SYSVAR_RENT_PUBKEY)
    ],
    data: Buffer.concat([
      Serializer.number(1, Ux.U8),
      ...data.attributes.flat().map(item => Serializer.string(item))
    ])
  })
}
