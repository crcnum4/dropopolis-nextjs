import {
  PublicKey,
  TransactionInstruction,
  SystemProgram,
  SYSVAR_RENT_PUBKEY
} from '@solana/web3.js'
import { keyFormat } from './utils';
import { Serializer, Ux } from '../tools/serializer';

export type AddRoyaltyKeys = {
  metadataPda: PublicKey,
  payer: PublicKey,
  updateAuthority: PublicKey,
  newRoyalty: PublicKey,
  programId: PublicKey,
}

export const addRoyaltyInstruction = (keys: AddRoyaltyKeys, share: number): TransactionInstruction => {
  return new TransactionInstruction({
    programId: keys.programId,
    keys: [
      keyFormat.writable(keys.metadataPda),
      keyFormat.full(keys.payer),
      keyFormat.signOnly(keys.updateAuthority),
      keyFormat.readonly(keys.newRoyalty),
      keyFormat.readonly(SystemProgram.programId),
      keyFormat.readonly(SYSVAR_RENT_PUBKEY),
    ],
    data: Buffer.concat([
      Serializer.number(3, Ux.U8),
      Serializer.number(share, Ux.U16),
    ])
  })
}