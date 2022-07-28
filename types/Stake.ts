import { PublicKey, SOLANA_SCHEMA } from "@solana/web3.js";
import { deserialize } from "borsh";
import { Buffer } from "buffer";

export type StakeData = {
  nftId: PublicKey,
  holdingAccount: PublicKey,
  ownerAccount: PublicKey,
  timestamp: Uint8Array,
}

export class Stake {
  nftId: PublicKey;
  holdingAccount: PublicKey;
  ownerAccount: PublicKey;
  timestamp: number;

  static size = 32 + 32 + 32 + 8;

  constructor(data: StakeData) {
    this.nftId = new PublicKey(data.nftId);
    this.holdingAccount = new PublicKey(data.holdingAccount);
    this.ownerAccount = new PublicKey(data.ownerAccount);
    const view = new DataView(data.timestamp.buffer);
    this.timestamp = Number(view.getBigInt64(0, true));
  }

  static decode(data: Buffer): Stake {
    return deserialize(SOLANA_SCHEMA, this, data);
  }
}

SOLANA_SCHEMA.set(Stake, {
  kind: "struct",
  fields: [
    ['nftId', [32]],
    ['holdingAccount', [32]],
    ['ownerAccount', [32]],
    ['timestamp', [8]],
  ]
})