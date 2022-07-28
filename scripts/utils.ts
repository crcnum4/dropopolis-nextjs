import { PublicKey, Signer } from "@solana/web3.js";

export const getGenesisKey = (): PublicKey | null => {
  const genesisPubkey = process.env.NEXT_PUBLIC_GENESIS_PUBLIC_KEY || ""
  const genesisSecret = process.env.NEXT_PUBLIC_GENESIS_PRIVATE_KEY || ""

  if (
    genesisPubkey=== "" || 
    genesisSecret === ""
  ) {
    console.error("Empty program id");
    return null;
  }

  return new PublicKey(genesisPubkey);
}

export const getProgramIds = (): [PublicKey, PublicKey] => {
  const dispProgram = process.env.NEXT_PUBLIC_DISPENSER_PROGRAM_KEY || "";
  const stakePoolProgram = process.env.NEXT_PUBLIC_STAKE_PROGRAM_KEY || "";

  console.log(`env:\n${dispProgram}\n${stakePoolProgram}`);
  
  if (
    dispProgram === "" || 
    stakePoolProgram === ""
  ) {
    console.error("Empty program id");
    process.exit(1);
  }
  const dispProgramId = new PublicKey(dispProgram);
  const stakePoolProgramId = new PublicKey(stakePoolProgram);
  return [dispProgramId, stakePoolProgramId]

}