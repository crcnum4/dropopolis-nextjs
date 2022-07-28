import { PublicKey } from "@solana/web3.js";

export const getStakeVaultKey = async(
  programId: PublicKey, owner: PublicKey, configKey: PublicKey
): Promise<PublicKey> => {
  const seeds: Buffer[] = [
    Buffer.from(process.env.NEXT_PUBLIC_STAKE_VAULT_PREFIX || "ree-staking"),
    programId.toBuffer(),
    configKey.toBuffer(),
    owner.toBuffer(),
  ];
  const [vaultKey, _bumpSeed] = await PublicKey.findProgramAddress(seeds, programId);

  return vaultKey;
}

export const getNftStakeHoldingKey = async (
  programId: PublicKey,
  owner: PublicKey,
  stakedNftMint: PublicKey,
): Promise<PublicKey> => {
  const seeds: Buffer[] = [
    Buffer.from(process.env.NEXT_PUBLIC_STAKE_VAULT_PREFIX || "ree-staking"),
    programId.toBuffer(),
    owner.toBuffer(),
    stakedNftMint.toBuffer(),
  ]
  
  const [holdingKey, _bumpSeed] = await PublicKey.findProgramAddress(seeds, programId);

  return holdingKey;

}