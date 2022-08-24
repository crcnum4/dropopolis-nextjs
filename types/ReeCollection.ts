import { PublicKey, SOLANA_SCHEMA } from "@solana/web3.js";
import { deserialize } from "borsh";
import { Buffer } from "buffer";
import { Deserializer } from "../tools/deserializer";

export type ReeCollectionData = {
  isInitialized: number,
  publisher: Uint8Array,
  name: string,
  uri: string,
  locked: number,
  buffer: Buffer,
}

export interface CollectionProperty {
  name: string,
  qty: number,
}

export class ReeCollection {
  isInitialized: boolean;
  publisher: PublicKey;
  name: string;
  uri: string;
  locked: boolean;
  uploaders: PublicKey[] | null = [];
  attributes: {[attribute: string]: {[property: string]: CollectionProperty}} | null = {};
  items: {[itemKey: string]: boolean} | null = {};

  constructor(data: ReeCollectionData) {
    this.isInitialized = data.isInitialized != 0;
    this.publisher = new PublicKey(data.publisher);
    this.name = data.name;
    this.uri = data.uri;
    this.locked = data.locked != 0;
    this.uploaders = [];
    this.attributes = {};
    this.items = {};
  }

  static decode(data: Buffer): ReeCollection {
    const collection = deserialize(SOLANA_SCHEMA, this, data);
    collection.uploaders = [];
    collection.attributes = {};
    collection.items = {};

    let offset = 
      1 + // initialized
      32 + //publisher
      4 + (collection.name.length) + // name
      4 + (collection.uri.length) + // uri
      1; // locked

    let rest = data.subarray(offset);
    if (rest[0] == 1) {
      // there are uploaders:
      const uploadersCount = rest.subarray(1, 5).readUint32LE();
      rest = rest.subarray(5);
      for (let i = 0; i < uploadersCount; i++) {
        collection.uploaders?.push(new PublicKey(rest.subarray(0, 32)));
        rest = rest.subarray(32);
      }
    } else {
      collection.uploaders = null;
      rest = rest.subarray(1);
    }

    // are there attributes?
    if (rest[0] == 1) {
      const attributesCount = rest.subarray(1, 5).readUint32LE();
      rest = rest.subarray(5);
      for (let i = 0; i < attributesCount; i++) {
        let attribute = Deserializer.string(rest);
        rest = rest.subarray(0, 4+attribute.length);
        let attrMap: {[property: string]: CollectionProperty} = {}

        const propertyCount = rest.subarray(0,4).readUint32LE();
        rest = rest.subarray(4);
        for (let j = 0; j < propertyCount; j++) {
          const property = Deserializer.string(rest);
          rest.subarray(0, 8 + property.length * 2) // property key and property name are the same skip both
          const prop: CollectionProperty = {name: property, qty: rest.subarray(0,4).readUint32LE()}
          attrMap[property] = prop;
          rest = rest.subarray(4);
        }
        collection.attributes[attribute] = attrMap;
      }
    } else {
      collection.attributes = null;
      rest = rest.subarray(1);
    }

    // are there items?
    if (rest[0] == 1 ) {
      const itemsCount = rest.subarray(1,5).readUint32LE();
      rest = rest.subarray(5);
      for (let i = 0; i < itemsCount; i++) {
        let key = new PublicKey(rest.subarray(0, 32));
        collection.items[key.toString()] = rest.subarray(32, 33).readUint8() != 0;
        rest = rest.subarray(0, 33)
      }
    } else {
      collection.items = null;
    }

    return collection;
  }
}

SOLANA_SCHEMA.set(ReeCollection, {
  kind: 'struct',
  fields: [
    ["isInitialized", "u8"],
    ["publisher", [32]],
    ['name', 'string'],
    ['uri', 'string'],
    ['locked', 'u8'],
    ['buffer', 'buffer']
  ]
})