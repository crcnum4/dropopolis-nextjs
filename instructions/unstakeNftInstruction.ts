import {
  PublicKey,
  TransactionInstruction,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { keyFormat } from './utils';
import { Serializer, Ux } from '../tools/serializer';

export type UnstakeNftKeys = {
  programId: PublicKey;
  stakeVaultPDA: PublicKey;
  configPDA: PublicKey;
  nftMint: PublicKey;
  ownerNftAccount: PublicKey;
  holdingAccount: PublicKey;
  ownerAccount: PublicKey;
}

export const unstakeNftInstruction = (data: UnstakeNftKeys): TransactionInstruction => {
  return new TransactionInstruction({
    programId: data.programId,
    keys: [
      keyFormat.writable(data.stakeVaultPDA),
      keyFormat.readonly(data.configPDA),
      keyFormat.readonly(data.nftMint),
      keyFormat.writable(data.ownerNftAccount),
      keyFormat.writable(data.holdingAccount),
      keyFormat.full(data.ownerAccount),
      keyFormat.readonly(SystemProgram.programId),
      keyFormat.readonly(SYSVAR_RENT_PUBKEY),
      keyFormat.readonly(TOKEN_PROGRAM_ID),
    ],
    data: Serializer.number(3, Ux.U8),
  })
}