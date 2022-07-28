
import { Connection, PublicKey } from "@solana/web3.js";
import { getStakeVaultKey } from "../instructions";
import { StakeVault } from "../types/StakeVault";

export const getUserVault = 
  async(connection: Connection, wallet: PublicKey, configKey: PublicKey): Promise<StakeVault | null> => 
{
  let vaultKey = await getStakeVaultKey(
    new PublicKey(process.env.NEXT_PUBLIC_STAKE_PROGRAM_KEY || ""),
    wallet,
    configKey
  )

  const vaultAccountInfo = await connection.getAccountInfo(vaultKey);
  if (vaultAccountInfo === null || vaultAccountInfo.data.length === 0) {
    console.log("no stake vault yet");
    return null;
  }
  
  const vault = StakeVault.decode(vaultAccountInfo.data);


  return vault

}