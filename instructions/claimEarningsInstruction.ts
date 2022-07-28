import {
  PublicKey,
  TransactionInstruction,
} from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { keyFormat } from './utils';
import { Serializer, Ux } from '../tools/serializer';

export type ClaimEarningsKeys = {
  programId: PublicKey;
  stakeVaultPDA: PublicKey;
  configPDA: PublicKey;
  destinationTokenAccount: PublicKey;
  vaultOwner: PublicKey;
  dispenserAccount: PublicKey;
  dispenserTokenAccount: PublicKey;
  dispenserProgramId: PublicKey; // To be removed in future program update.
};

export const claimEarningsInstruction = (
  keys: ClaimEarningsKeys
): TransactionInstruction => {
  return new TransactionInstruction({
    programId: keys.programId,
    keys: [
      keyFormat.writable(keys.stakeVaultPDA),
      keyFormat.readonly(keys.configPDA),
      keyFormat.writable(keys.destinationTokenAccount),
      keyFormat.full(keys.vaultOwner),
      keyFormat.readonly(keys.dispenserAccount),
      keyFormat.writable(keys.dispenserTokenAccount),
      keyFormat.readonly(keys.dispenserProgramId),
      keyFormat.readonly(TOKEN_PROGRAM_ID),
    ],
    data: Serializer.number(6, Ux.U8)
  })
}