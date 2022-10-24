import { Connection, ParsedAccountData, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, ACCOUNT_SIZE } from '@solana/spl-token2';
import { NftMetadata } from "../types/NftMetadata";
import base58 from "bs58";
import { Serializer, Ux } from "../tools/serializer";
import { getMetadataPda } from "./getMetadataPda";
import { REEMETA_PROGRAM_ID } from "../statics/programIds";

export const getWalletNftCollection = async (
  wallet: PublicKey,
  connection: Connection,
): Promise<{data: NftMetadata, tokenAccount:PublicKey}[]> => {

  const accounts = await connection.getParsedProgramAccounts(
    TOKEN_PROGRAM_ID,
    {
      filters: [
        {
          dataSize: ACCOUNT_SIZE
        },
        // will get all token accounts owned by the wallet
        {
          memcmp: {
            offset: 32,
            bytes: wallet.toString()
          }
        },
        // below should take only grab token accounts with 1 token
        {
          memcmp: {
            offset: 64,
            bytes: base58.encode(Serializer.number(1, Ux.U64))
          }
        }
      ]
    }
  )
  
  const mints: {pda: PublicKey, tokenAccount: PublicKey}[] = []
  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i].account.data as ParsedAccountData;
    console.log(`${account.parsed['info']['mint']}`);
    const mint:string = account.parsed['info']['mint'];
    mints.push({
      pda: await getMetadataPda(new PublicKey(mint), REEMETA_PROGRAM_ID),
      tokenAccount: accounts[i].pubkey
    })
  }

  const nftAccounts = await connection.getMultipleAccountsInfo(mints.map(item => item.pda), 'confirmed');

  const nfts: {data: NftMetadata, tokenAccount: PublicKey}[] = [];

  for (let i = 0; i < nftAccounts.length; i++) {
    let nftAccount = nftAccounts[i];
    if(!nftAccount) {
      continue;
    }
    // TODO check that owner is === REE_META_PROGRAM_ID
    const nftAccountInfo = nftAccount.data;
    if (!nftAccountInfo) {
      continue;
    }

    nfts.push({
      data: NftMetadata.decode(nftAccountInfo),
      tokenAccount: mints[i].tokenAccount,
    })
  }

  console.log(nfts);

  return nfts
}