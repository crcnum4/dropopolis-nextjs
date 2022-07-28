import { createMint, TOKEN_PROGRAM_ID, getMint, Mint } from "@solana/spl-token2";
import { PublicKey, Keypair, Connection, AccountMeta, Signer } from "@solana/web3.js";

export const keyFormat = {
  readonly: (pubkey: PublicKey) => {return {pubkey, isSigner: false, isWritable: false} as AccountMeta},
  writable: (pubkey: PublicKey) => {return {pubkey, isSigner: false, isWritable: true} as AccountMeta},
  signOnly: (pubkey: PublicKey) => {return {pubkey, isSigner: true, isWritable: true} as AccountMeta},
  full: (pubkey: PublicKey) => {return {pubkey, isSigner: true, isWritable: true} as AccountMeta}, 
};

export const createTokenMint = async (
  connection: Connection,
  {publicKey, secretKey}: Signer,
  decimals: number
) => {
  let address = await createMint(
      connection,
      {
          publicKey,
          secretKey
      },
      publicKey,
      null,
      decimals,
      undefined,
      undefined,
      TOKEN_PROGRAM_ID
  )
  let mint = await getMint(connection, address);
  return mint;
}

export const setupMint = async (
  connection: Connection,
  name: string,
  owner: Signer, 
  decimal: number
  ): Promise<Mint> => {
  console.log(`Creating Mint ${name}...`)
  const mint = await createTokenMint(connection, owner, decimal);
  return mint;
}