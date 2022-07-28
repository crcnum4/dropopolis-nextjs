import {
  PublicKey,
  TransactionInstruction,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { keyFormat } from './utils';
import { Serializer, Ux } from '../tools/serializer';

export type CreateStakeVaultKeys = {
  programId: PublicKey;
  stakeVaultPDA: PublicKey;
  configPDA: PublicKey,
  ownerPayout: PublicKey;
  ownerAccount: PublicKey;
}

export const createStakeVaultInstruction = (data: CreateStakeVaultKeys): TransactionInstruction => {
  return new TransactionInstruction({
    programId: data.programId,
    keys: [
      keyFormat.writable(data.stakeVaultPDA),
      keyFormat.readonly(data.configPDA),
      keyFormat.readonly(data.ownerPayout),
      keyFormat.full(data.ownerAccount),
      keyFormat.readonly(SystemProgram.programId),
      keyFormat.readonly(SYSVAR_RENT_PUBKEY),
      keyFormat.readonly(TOKEN_PROGRAM_ID),
    ],
    data: Serializer.number(0, Ux.U8),
  })
}