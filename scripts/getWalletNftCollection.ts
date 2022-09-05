import { Connection, ParsedAccountData, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, ACCOUNT_SIZE, Account } from '@solana/spl-token2';
import { NftMetadata } from "../types/NftMetadata";
import base58 from "bs58";
import { Serializer, Ux } from "../tools/serializer";
import { AccountLayout } from "@solana/spl-token";
import { deserialize } from "borsh";
import { getMetadataPda } from "./getMetadataPda";
import { REEMETA_PROGRAM_ID } from "../statics/programIds";

export const getWalletNftCollection = async (
  wallet: PublicKey,
  connection: Connection,
): Promise<NftMetadata[]> => {

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
  
  const mints: PublicKey[] = []
  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i].account.data as ParsedAccountData;
    console.log(`${account.parsed['info']['mint']}`);
    const mint:string = account.parsed['info']['mint'];
    mints.push(await getMetadataPda(new PublicKey(mint), REEMETA_PROGRAM_ID))
  }

  const nftAccounts = await connection.getMultipleAccountsInfo(mints, 'confirmed');

  const nfts: NftMetadata[] = [];

  for (let i = 0; i < nftAccounts.length; i++) {
    let nftAccount = nftAccounts[i];
    if(!nftAccount) {
      continue;
    }
    const nftAccountInfo = nftAccount.data;
    if (!nftAccountInfo) {
      continue;
    }

    nfts.push(NftMetadata.decode(nftAccountInfo))
  }

  // console.log(nfts);

  return nfts
}
