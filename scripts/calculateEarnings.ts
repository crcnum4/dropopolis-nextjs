import { Connection, PublicKey } from "@solana/web3.js";
import { StakerData } from "../types/StakerClientData";
import { getStakeConfig } from "./getStakeConfig";
import { getUserVault } from "./getUserVault";

export const calculateEarnings = async(
  connection: Connection, userWallet: PublicKey, stakerData: StakerData
): Promise<number> => {
  const stakeVault = await getUserVault(connection, userWallet, stakerData.configKey)

  if (stakeVault === null) {
    return 0;
  }

  const unixTime = Math.floor(Date.now() / 1000);

  let rewards = 0;

  const vaultConfig = await getStakeConfig(connection, stakerData.configKey);
  if (vaultConfig === null) {
    return 0;
  }
  const {payCycle, payValue} = vaultConfig;

  // console.log(payCycle, payValue);
  

  for (let i = 0; i < stakeVault.vault.length; i++) {
    let stakedTime = unixTime - stakeVault.vault[i].timestamp;
    let cycles = Math.floor(stakedTime / payCycle);
    rewards += cycles * payValue;
  }
  
  return rewards;
}