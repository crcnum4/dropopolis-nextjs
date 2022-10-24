import { Connection, ParsedAccountData, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, ACCOUNT_SIZE } from '@solana/spl-token2';
import base58 from "bs58";
import { Serializer, Ux } from "../tools/serializer";
import { REE_ESCROW_PROGRAM_ID } from "../statics/programIds";
import { Escrow } from "../types/Escrow";

export const getAllReeEscrowContracts = async (
  connection: Connection,
): Promise<{pubkey: PublicKey, data: Escrow}[]> => {
  const accounts = await connection.getProgramAccounts(
    REE_ESCROW_PROGRAM_ID,
    {
      filters: [
        {
          memcmp: {
            offset: 0,
            bytes: base58.encode(Serializer.number(1, Ux.U8))
          }
        }
      ]
    }
  )

  return accounts.map(account => { 
    return {pubkey: account.pubkey, data: Escrow.decode(account.account.data)}
  })
}

export const getEscrowContractsBySeller = async (
  connection: Connection,
  seller: PublicKey,
) : Promise<{pubkey: PublicKey, data: Escrow}[]> => {

  const accounts = await connection.getProgramAccounts(
    REE_ESCROW_PROGRAM_ID,
    {
      filters: [
        {
          memcmp: {
            offset: 1,
            bytes: seller.toString(),
          }
        }
      ]
    }
  )

  return accounts.map(account => {
    return {pubkey: account.pubkey, data: Escrow.decode(account.account.data)}
  })
}

export const getEscrowContractsByIdentifier = async (
  connection: Connection,
  identifier: PublicKey,
): Promise<{pubkey: PublicKey, data: Escrow}[]> => {
  const accounts = await connection.getProgramAccounts(
    REE_ESCROW_PROGRAM_ID,
    {
      filters: [
        {
          memcmp: {
            offset: 201,
            bytes: identifier.toString()
          }
        }
      ]
    }
  )

  return accounts.map(account => {
    return {pubkey: account.pubkey, data: Escrow.decode(account.account.data)}
  })
}