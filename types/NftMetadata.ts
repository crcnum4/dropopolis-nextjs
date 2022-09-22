import { PublicKey, SOLANA_SCHEMA } from "@solana/web3.js";
import { deserialize } from "borsh";
import {Buffer} from 'buffer';
import { off } from "process";
import { RoyaltyArt } from "./RoyaltyArt";

export enum NftKind {
  Uninitialized,
  RoyaltyArt,
}

export enum UpdateType {
  None,
  WalletSigner,
  NftToken
}

export interface NftMetadataData {
  kind: number,
  mint: PublicKey,
  isModifiable: number,
  updateType: number,
  buffer: Buffer,
}

export type MetaTypes = RoyaltyArt | Buffer ;

export class NftMetadata<T = MetaTypes>{
  kind: NftKind;
  mint: PublicKey;
  isModifiable: boolean;
  updateType: UpdateType;
  collection?: PublicKey;
  updateAuthority?: PublicKey;
  data?: T

  constructor(data: NftMetadataData) {
    this.kind = data.kind;
    this.mint = data.mint;
    this.isModifiable = data.isModifiable != 0;
    this.updateType = data.updateType;
  }

  static decode(data: Buffer): NftMetadata {
    const nft = deserialize(SOLANA_SCHEMA, this, data);

    let offset = 
      1 +
      32 +
      1 +
      1;

    let rest = data.subarray(offset);
    if (rest[0] === 1) {
      // collection
      nft.collection = new PublicKey(rest.subarray(1,33));
      rest = rest.subarray(33);
    } else {
      rest = rest.subarray(1);
    }

    if (rest[0] === 1) {
      // update authority
      nft.updateAuthority = new PublicKey(rest.subarray(1, 33));
      rest = rest.subarray(33);
    } else {
      rest = rest.subarray(1);
    }

    // data
    switch (nft.kind) {
      case NftKind.Uninitialized:
        nft.data = rest;
        break;
      case NftKind.RoyaltyArt:
        nft.data = RoyaltyArt.decode(rest);
        break;
    }

    return nft;

  }
}

SOLANA_SCHEMA.set(NftMetadata, {
  kind: 'struct',
  fields: [
    ['kind', 'u8'],
    ['mint', [32]],
    ['isModifiable', 'u8'],
    ['updateType', 'u8'],
    ['buffer', 'buffer']
  ]
})

const metadata: RoyaltyArt | Buffer = Buffer.alloc(1); // blank data without null