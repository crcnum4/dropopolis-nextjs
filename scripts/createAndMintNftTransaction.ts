import {Connection, PublicKey, Signer, Transaction, TransactionInstruction } from '@solana/web3.js';
import { getMetadataPda } from './getMetadataPda';
import { 
  createMintInstruction, 
  createArtNftInstruction, 
  mintNftToInstruction, 
  CreateArtNftData
} from '../instructions';
import { ASSOCIATED_TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction, getAccount, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token2';
import { addRoyaltyInstruction } from '../instructions/addRoyaltyInstruction';

export const createAndMintArtnNftTransaction = async (
  connection: Connection,
  userWallet: PublicKey,
  programId: PublicKey,
  nftData: CreateArtNftData,
  dropopShare: number,
  collectionKey?: PublicKey,
): Promise<{mintKeys: Signer, tokenAccount: PublicKey, tx: Transaction}> => {

  const tx = new Transaction();

  const {mintKeys, createMintIx, createAccountIx} = await createMintInstruction(userWallet, connection);
  tx.add(createAccountIx);
  tx.add(createMintIx);

  const metadataPda: PublicKey = await getMetadataPda(mintKeys.publicKey, programId);

  tx.add(createArtNftInstruction(
    {
      metadataPda,
      mint: mintKeys.publicKey,
      royaltyOwner: userWallet,
      mintAuthority: userWallet,
      newMintAuthority: userWallet,
      payer: userWallet,
      updateAuthority: userWallet,
      programId,
      collectionKey,
    },
    nftData
  ));

  const dropopPubkey = process.env.NEXT_PUBLIC_REE_SHARE_ADDRESS;


  if (dropopPubkey) {

    tx.add(addRoyaltyInstruction({
        programId,
        metadataPda,
        payer: userWallet,
        updateAuthority: userWallet,
        newRoyalty: new PublicKey(dropopPubkey),
      }, 
      dropopShare
    ))
  }
    
  const destinationTokenAccount = await getAssociatedTokenAddress(
    mintKeys.publicKey,
    userWallet,
    false,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID
  )

  tx.add(createAssociatedTokenAccountInstruction(
    userWallet,
    destinationTokenAccount,
    userWallet,
    mintKeys.publicKey,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID
  ))

  tx.add(mintNftToInstruction({
    mint: mintKeys.publicKey,
    mintAuthority: userWallet,
    recipient: destinationTokenAccount,
    programId
  }))

  return {mintKeys, tokenAccount: destinationTokenAccount, tx};

}