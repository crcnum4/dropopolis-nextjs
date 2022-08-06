import { PublicKey, Connection } from "@solana/web3.js";


export const getMetadataPda = async (mint: PublicKey, programId: PublicKey): Promise<PublicKey> => {
  const seeds: Buffer[] = [
    Buffer.from("ree-metadata"),
    programId.toBuffer(),
    mint.toBuffer(),
  ];

  const [metadataPda, _bumpSeed] = await PublicKey.findProgramAddress(seeds, programId);

  return metadataPda;

}