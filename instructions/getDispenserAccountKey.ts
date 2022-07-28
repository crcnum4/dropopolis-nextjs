import { PublicKey } from "@solana/web3.js";

export const getDispenserPDAKeys = async(
  identifier: string, programId: PublicKey, owner: PublicKey, payoutMint: PublicKey  
): Promise<[PublicKey, PublicKey]> => {
  const dispenserKey = await getDispenserAccountKey(identifier, programId, owner);

  const payoutKey = await getDispenserPayoutKey(identifier, programId, owner, payoutMint);

  return [dispenserKey, payoutKey];
}

export const getDispenserAccountKey = async (
  identifier: string, programId: PublicKey, owner: PublicKey
): Promise<PublicKey> => {
  const dispenserSeeds: Buffer[] = [
    Buffer.from(process.env.NEXT_PUBLIC_DISPENSER_PREFIX || "ree-dispenser"),
    Buffer.from(identifier),
    programId.toBuffer(),
    owner.toBuffer(),
  ];
  const [dispenserKey, _dispenserBumpSeed] = await PublicKey.findProgramAddress(
    dispenserSeeds,
    programId
  );

  return dispenserKey;
}

export const getDispenserPayoutKey = async ( 
  identifier: string, programId: PublicKey, owner: PublicKey, payoutMint: PublicKey
): Promise<PublicKey> => {
  const payoutSeeds: Buffer[] = [
    Buffer.from(process.env.NEXT_PUBLIC_DISPENSER_PREFIX || "ree-dispenser"),
    Buffer.from(identifier),
    programId.toBuffer(),
    owner.toBuffer(),
    payoutMint.toBuffer(),
  ]

  const [payoutKey, _payoutBumpSeed] = await PublicKey.findProgramAddress(
    payoutSeeds,
    programId
  );

  return payoutKey;
}