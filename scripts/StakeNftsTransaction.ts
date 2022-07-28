import { Connection, PublicKey, Transaction } from "@solana/web3.js"
import { createStakeVaultInstruction, getStakeVaultKey, stakeNftInstruction, getNftStakeHoldingKey } from "../instructions";
import { getUserVault } from "./getUserVault";
import { getProgramIds } from "./utils";
import { 
  createAssociatedTokenAccountInstruction, 
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Account,
  getAccount
} from '@solana/spl-token2'
import { StakerData } from "../types/StakerClientData";

export type TargetNft = {
  accountPubkey: PublicKey,
  mintKey: PublicKey,
}

export const stakeNftTransaction = async (
  connection: Connection, 
  userWallet: PublicKey, 
  targetNftKeys: TargetNft[],
  stakerData: StakerData
): Promise<[Transaction, PublicKey[]]> => {

  const tx = new Transaction();

  const {payoutMint, configKey} = stakerData;

  const userStakeVault = await getUserVault(connection, userWallet, configKey);

  const [_dispenserProgram, vaultProgram] = getProgramIds();

  const vaultKey = await getStakeVaultKey(
    vaultProgram,
    userWallet,
    configKey
  );

  const tokenAccounts = []

  const ownerPayoutKey = await getAssociatedTokenAddress(
    payoutMint,
    userWallet,
    false,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID
  );

  let ownerPayoutAccount: Account;
  try {
    ownerPayoutAccount = await getAccount(connection, ownerPayoutKey, "confirmed", TOKEN_PROGRAM_ID);
  } catch (error: unknown) {
    tx.add(createAssociatedTokenAccountInstruction(
      userWallet,
      ownerPayoutKey,
      userWallet,
      payoutMint,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    ))
  }

  if (userStakeVault == null) {
    // no stake vault add create stakevault ix
    tx.add(createStakeVaultInstruction(
      {
        programId: vaultProgram,
        stakeVaultPDA: vaultKey,
        configPDA: configKey,
        ownerPayout: ownerPayoutKey,
        ownerAccount: userWallet,
      }
    ))
  }

  // get or createIX for payout token address, createdIx or got vault.
  for (let i = 0; i < targetNftKeys.length; i++) {
    let vaultHoldingKey = await getNftStakeHoldingKey(
      vaultProgram, userWallet, targetNftKeys[i].mintKey
    );
    tokenAccounts.push(vaultHoldingKey)
    tx.add(stakeNftInstruction({
      programId: vaultProgram,
      stakeVaultPDA: vaultKey,
      configPDA: configKey,
      ownerNftAccount: targetNftKeys[i].accountPubkey,
      nftMint: targetNftKeys[i].mintKey,
      vaultHoldingAccount: vaultHoldingKey,
      ownerAccount: userWallet
    }))
  }

  return [tx, tokenAccounts];
}