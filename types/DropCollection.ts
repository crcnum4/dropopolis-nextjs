import { PublicKey } from "@solana/web3.js";

export interface DropCollection {
  _id: string,
  pda: PublicKey,
  urlName: string,
  owner: PublicKey,
  name: string,
  shortDescription: string,
  detailedDescription: string,
  headerImage: string,
}

export interface DropCollectionWithAuth extends DropCollection {
  authority: {
    publicKey: string,
    secret: string,
  }
}