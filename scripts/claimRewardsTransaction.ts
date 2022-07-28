import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { getStakeVaultKey } from "../instructions";
import { claimEarningsInstruction } from "../instructions/claimEarningsInstruction";
import { getProgramIds } from "./utils";
import {getAssociatedTokenAddress, ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID} from "@solana/spl-token2"
import { StakerData } from "../types/StakerClientData";

export const claimRewardsTransaction = async (
  connection: Connection, userWallet: PublicKey, stakerData: StakerData
): Promise<Transaction> =>{
  const tx = new Transaction();

  const [dispenserProgram, vaultProgram] = getProgramIds();

  const vaultKey = await getStakeVaultKey(
    vaultProgram,
    userWallet,
    stakerData.configKey,
  )
  
  const userTokenAccount = await getAssociatedTokenAddress(
    stakerData.payoutMint,
    userWallet,
    false,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID,
  );

  const claimIx = claimEarningsInstruction({
    programId: vaultProgram,
    stakeVaultPDA: vaultKey,
    configPDA: stakerData.configKey,
    destinationTokenAccount: userTokenAccount,
    vaultOwner: userWallet,
    dispenserAccount: stakerData.dispenserKey,
    dispenserTokenAccount: stakerData.payoutAccountKey,
    dispenserProgramId: dispenserProgram,
  })

  tx.add(claimIx);

  return tx;
}