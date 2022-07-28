import { PublicKey } from "@solana/web3.js";

export const getStakeConfigKey = async(
  programId: PublicKey, owner: PublicKey, identifier: String, dispenser: PublicKey,
): Promise<PublicKey> => {
  const seeds: Buffer[] = [
    Buffer.from(process.env.NEXT_PUBLIC_STAKE_VAULT_PREFIX || "ree-staking"),
    Buffer.from(identifier),
    programId.toBuffer(),
    owner.toBuffer(),
    dispenser.toBuffer(),
  ];
  const [configKey, _bumpSeed] = await PublicKey.findProgramAddress(seeds, programId);

  return configKey;
}