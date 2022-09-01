import { PublicKey, SOLANA_SCHEMA } from "@solana/web3.js";
import {deserialize} from 'borsh';
import {Buffer} from 'buffer';
import { Deserializer } from "../tools/deserializer";

export interface RoyaltyArtData {
  name: string;
  symbol: string;
  uri: string;
  resaleFee: number;
  initialSale: number;
  buffer: Buffer;
}

export class RoyaltyArt {
  name: string;
  symbol: string;
  uri: string;
  resaleFee: number;
  initialSale: boolean;
  collection?: PublicKey;
  royaltiesBuffer?: Buffer;

  constructor(data: RoyaltyArtData) {
    this.name = data.name;
    this.symbol = data.symbol;
    this.uri = data.uri;
    this.resaleFee = data.resaleFee;
    this.initialSale = data.initialSale != 0;
  }

  static decode(data: Buffer): RoyaltyArt {
    const art = deserialize(SOLANA_SCHEMA, this, data);
    let offset = 
      4 + art.name.length +
      4 + art.symbol.length +
      4 + art.uri.length +
      2 + 
      1;
    
    let rest = data.subarray(offset);
    if (rest[0] === 1) {
      // its part of a collection
      art.collection = new PublicKey(rest.subarray(1,33))
      art.royaltiesBuffer = rest.subarray(33);
    } else {
      art.royaltiesBuffer = rest.subarray(1);
    }

    return art;
  }
}

SOLANA_SCHEMA.set(RoyaltyArt, {
  kind: 'struct',
  fields: [
    ['name', 'string'],
    ['symbol', 'string'],
    ['uri', 'string'],
    ['resaleFee', 'u16'],
    ['initialSale', 'u8'],
    ['buffer', 'buffer']
  ]
})