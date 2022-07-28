import {PublicKey, Connection, Transaction} from '@solana/web3.js'
import { TargetNft } from './StakeNftsTransaction'
import {
  unstakeNftInstruction, 
  getStakeVaultKey, 
  getNftStakeHoldingKey} from '../instructions';
import {getProgramIds} from './utils'
import { 
  getAssociatedTokenAddress, 
  ASSOCIATED_TOKEN_PROGRAM_ID, 
  TOKEN_PROGRAM_ID, 
  Account,
  getAccount,
  createAssociatedTokenAccountInstruction 
} from '@solana/spl-token2';
import { StakerData } from '../types/StakerClientData';

export const unstakeNftsTransactions = async(
  connection: Connection,
  userWallet: PublicKey,
  targetNfts: TargetNft[],
  stakerData: StakerData
): Promise<[Transaction, PublicKey[]]> => {
  const tx = new Transaction();
  const [_dispenserProgram, vaultProgram] = getProgramIds();
  const {configKey} = stakerData;
  
  const vaultKey = await getStakeVaultKey(
    vaultProgram,
    userWallet,
    configKey
  );

  const tokenAccounts = []

  for (let i = 0; i < targetNfts.length; i++) {
    let holdingKey = await getNftStakeHoldingKey(vaultProgram, userWallet, targetNfts[i].mintKey)

    let userTokenKey = await getAssociatedTokenAddress(
      targetNfts[i].mintKey,
      userWallet,
      false,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    )

    let userTokenAccount: Account;
    try {
      userTokenAccount = await getAccount(connection, userTokenKey, 'confirmed', TOKEN_PROGRAM_ID);
    } catch (error: unknown) {
      tx.add(createAssociatedTokenAccountInstruction(
        userWallet,
        userTokenKey,
        userWallet,
        targetNfts[i].mintKey,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID,
      ))
    }
    tokenAccounts.push(userTokenKey)

    tx.add(unstakeNftInstruction({
      programId: vaultProgram,
      stakeVaultPDA: vaultKey,
      configPDA: configKey,
      nftMint: targetNfts[i].mintKey,
      ownerNftAccount: userTokenKey,
      holdingAccount: holdingKey,
      ownerAccount: userWallet,
    }))
  }

  return [tx, tokenAccounts];
}