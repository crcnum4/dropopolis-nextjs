import { PublicKey } from "@solana/web3.js"

export type StakerApiData = {
  _id: string,
  __v: number,
  configKey: string,
  dispenserKey: string,
  creatorKey: string,
  payoutAccountKey: string,
  payoutMint: string,
  urlIdentifier: string,
  displayName: string,
  theme: string,
  logoImg: string,
  displayImg: string,
  tokenSymbol: string,
  link: string,
}

export class StakerData {
  _id: string;
  configKey: PublicKey;
  dispenserKey: PublicKey;
  creatorKey: PublicKey;
  payoutAccountKey: PublicKey;
  payoutMint: PublicKey;
  urlIdentifier: string;
  displayName: string;
  theme: string;
  logoImg: string;
  displayImg: string;
  tokenSymbol: string;
  link: string;

  constructor(data: StakerApiData) {
    this._id = data._id;
    this.configKey = new PublicKey(data.configKey);
    this.dispenserKey = new PublicKey(data.dispenserKey);
    this.creatorKey = new PublicKey(data.creatorKey);
    this.payoutAccountKey = new PublicKey(data.payoutAccountKey);
    this.payoutMint = new PublicKey(data.payoutMint);
    this.urlIdentifier = data.urlIdentifier;
    this.displayName = data.displayName;
    this.theme = data.theme;
    this.logoImg = data.logoImg;
    this.displayImg = data.displayImg;
    this.tokenSymbol = data.tokenSymbol;
    this.link = data.link;
  }
}