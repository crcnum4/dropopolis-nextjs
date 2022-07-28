import { Connection, PublicKey } from "@solana/web3.js";
import { StakeConfig } from "../types/StakeConfig";

export const getStakeConfig = 
  async (connection: Connection, configKey: PublicKey): Promise<StakeConfig | null> => 
{

  let configAccountInfo = await connection.getAccountInfo(configKey);
  if (configAccountInfo === null || configAccountInfo.data.length === 0) {
    console.log("invalid config account");
    return null;
  }

  return StakeConfig.decode(configAccountInfo.data);
}