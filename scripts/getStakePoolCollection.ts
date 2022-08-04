import {programs} from "@metaplex/js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { getAccount, Account } from "@solana/spl-token2";
import { AccountInfo, Connection, ParsedAccountData, PublicKey } from "@solana/web3.js";
import { StakeConfig } from "../types/StakeConfig";
import {getStakeConfig} from './getStakeConfig';
import { getUserVault } from "./getUserVault";
import {CollectionNft} from '../types/WalletCollection'
import axios from "axios";
import OffChainMetadata from "../types/OffChainMetadata";
const { metadata } = programs;
const { Metadata } = metadata


export const getStakePoolCollection = async (
  userWallet: PublicKey, connection: Connection, configKey: PublicKey
): Promise<[CollectionNft[],CollectionNft[]]> => {
  
  // console.log(process.env.NEXT_PUBLIC_GENESIS_PUBLIC_KEY);
  const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
    userWallet,
    {
      programId: TOKEN_PROGRAM_ID,
    },
    "confirmed"
  )

  const stakeConfig = await getStakeConfig(connection, configKey);

  if (stakeConfig == null) {
    return [[],[]]
  }
  
  if (stakeConfig.itemList.length === 0) {
    return [[],[]]
  }

  if (tokenAccounts.value.length <= 0) {
    return [[],[]]
  }


  const unstakedNfts: CollectionNft[] = [];
  for (let i = 0; i < tokenAccounts.value.length; i++) {

    // check if mint token is in the list of allowed nfts
    const data = await getMetadata(connection, tokenAccounts.value[i].account.data.parsed.info, stakeConfig);
    if (data === null) continue;

    unstakedNfts.push({tokenAccount: tokenAccounts.value[i].pubkey, metadata: data.onChain, offChainMeta: data.offChain});
  }

  const stakedNfts: CollectionNft[] = [];

  const stakeVault = await getUserVault(connection, userWallet, configKey);
  if (stakeVault === null) {
    return [unstakedNfts, stakedNfts];
  }

  for (let i = 0; i < stakeVault.vault.length; i++) {
    let accountInfo = await getAccount(connection, stakeVault.vault[i].holdingAccount);
    if (accountInfo === null) continue;

    let data = await getMetadata(connection, accountInfo, stakeConfig);
    if (data === null) continue;

    stakedNfts.push({tokenAccount: stakeVault.vault[i].holdingAccount, metadata: data.onChain, offChainMeta: data.offChain});
  }


  return [unstakedNfts, stakedNfts];

}

const getMetadata = async (
  connection: Connection, info: any, stakeConfig: StakeConfig
) => {
  let amount = info.amount ? info.amount : BigInt(info.tokenAmount.amount);
  // info = await getAccount(connection, accountKey);
  if (amount !== BigInt(1)) {
    return null;
  }
  const mint = new PublicKey(info.mint);
  if (stakeConfig.itemList.findIndex(nft => nft.toString() === mint.toString()) === -1) {
    return null;
  }
  const metaplexPDA = await Metadata.getPDA(mint);
  const onChainData = await Metadata.load(connection, metaplexPDA); 

  const uri = onChainData.data.data.uri;
  return await axios.get<OffChainMetadata>(uri)
      .then( response => {
        return {onChain: onChainData, offChain: response.data};
      })
      .catch(err => {
        console.log("Error Fetching OffChain Metadata:");
        console.log(err );
        console.log(onChainData);
        return null
      })
}