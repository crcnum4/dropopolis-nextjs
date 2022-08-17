import {
  PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, TransactionInstruction
} from '@solana/web3.js';
import { keyFormat } from './utils';
import { Serializer, Ux } from '../tools/serializer';
import exp from 'constants';
import { AddPropertiesData } from './addItemToCollectionInstruction';

export type AddPropertiesKeys = {
  programId: PublicKey,
  collectionPda: PublicKey,
  targetItem: PublicKey,
  payer: PublicKey,
  uploader: PublicKey,
}

export const addPropertiesInstruction = (
  keys: AddPropertiesKeys,
  data: AddPropertiesData
): TransactionInstruction => 
  new TransactionInstruction({
    programId: keys.programId,
    keys: [
      keyFormat.writable(keys.collectionPda),
      keyFormat.readonly(keys.targetItem),
      keyFormat.full(keys.payer),
      keyFormat.signOnly(keys.uploader),
      keyFormat.readonly(SystemProgram.programId),
      keyFormat.readonly(SYSVAR_RENT_PUBKEY),
    ],
    data: Buffer.concat([
      Serializer.number(3, Ux.U8),
      ...data.attributes.flat().map(item => Serializer.string(item))
    ])
  })
