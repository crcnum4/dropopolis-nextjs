import {
  PublicKey, TransactionInstruction, Keypair,
  SystemProgram,
  Connection,
  Signer
} from '@solana/web3.js'
import {createInitializeMintInstruction, TOKEN_PROGRAM_ID, MINT_SIZE, getMinimumBalanceForRentExemptMint} from '@solana/spl-token2'

export const createMintInstruction = async (
  authority: PublicKey, 
  connection: Connection
): Promise<{mintKeys: Signer, createMintIx: TransactionInstruction, createAccountIx: TransactionInstruction}> => {
  const keyPair = Keypair.generate();
  const mintRent = await getMinimumBalanceForRentExemptMint(connection);

  const createAccountIx = SystemProgram.createAccount({
    fromPubkey: authority,
    lamports: mintRent,
    newAccountPubkey: keyPair.publicKey,
    programId: TOKEN_PROGRAM_ID,
    space: MINT_SIZE
  })

  const createMintIx = createInitializeMintInstruction(
    keyPair.publicKey,
    0,
    authority,
    null,
    TOKEN_PROGRAM_ID,
  )
  
  return {mintKeys: keyPair, createMintIx, createAccountIx};
}