import {
  PublicKey,
  TransactionInstruction,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { keyFormat } from './utils';
import { Serializer, Ux } from '../tools/serializer';

export type StakeNftKeys = {
  programId: PublicKey;
  stakeVaultPDA: PublicKey;
  configPDA: PublicKey;
  ownerNftAccount: PublicKey;
  nftMint: PublicKey;
  vaultHoldingAccount: PublicKey;
  ownerAccount: PublicKey;
}

export const stakeNftInstruction = (data: StakeNftKeys): TransactionInstruction => {
  return new TransactionInstruction({
    programId: data.programId,
    keys: [
      keyFormat.writable(data.stakeVaultPDA),
      keyFormat.readonly(data.configPDA),
      keyFormat.writable(data.ownerNftAccount),
      keyFormat.readonly(data.nftMint),
      keyFormat.writable(data.vaultHoldingAccount),
      keyFormat.full(data.ownerAccount),
      keyFormat.readonly(SystemProgram.programId),
      keyFormat.readonly(SYSVAR_RENT_PUBKEY),
      keyFormat.readonly(TOKEN_PROGRAM_ID),
    ],
    data: Serializer.number(1, Ux.U8),
  })
}