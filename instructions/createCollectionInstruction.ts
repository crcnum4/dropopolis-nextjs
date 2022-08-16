import {
  PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, TransactionInstruction
} from '@solana/web3.js';
import { keyFormat } from './utils';
import { Serializer, Ux } from '../tools/serializer';

export type CreateCollectionKeys = {
  programId: PublicKey,
  collectionPda: PublicKey,
  payer: PublicKey,
  publisher: PublicKey,
  uploaders: PublicKey[],
}

export type CreateCollectionData = {
  name: string,
  uri: string,
}

export const createCollectionInstruction = (
  keyList: CreateCollectionKeys, data: CreateCollectionData
): TransactionInstruction => {
  const keys = [
    keyFormat.writable(keyList.collectionPda),
    keyFormat.full(keyList.payer),
    keyFormat.readonly(keyList.publisher),
    keyFormat.readonly(SystemProgram.programId),
    keyFormat.readonly(SYSVAR_RENT_PUBKEY),
  ]
  for (let i = 0; i < keyList.uploaders.length; i++) {
    keys.push(
      keyFormat.readonly(keyList.uploaders[i])
    )
  }

  return new TransactionInstruction({
    programId: keyList.programId,
    keys,
    data: Buffer.concat([
      Serializer.number(0, Ux.U8),
      Serializer.string(data.name),
      Serializer.string(data.uri),
      Serializer.number(keyList.uploaders.length, Ux.U32),
    ])
  })
}