import { PublicKey } from "@solana/web3.js";
import { DropCollection } from "./DropCollection";

export enum DropStoreType {
  STORE_FRONT,
  CAPSULE,
  CARD_PACK,
}

export interface DropStoreData {
  collect: string,
  kind: DropStoreType,
  price?: number,
  floor?: number,
  ceil?: number,
}

export interface DropStore {
  _id: string;
  collection: DropCollection;
  kind: DropStoreType;
  price?: number;
  floor?: number;
  ceil?: number;

}

export interface DropStoreItemData {
  store: string,
  price: number,
  style: "Self" | "Full",
  name: string,
  symbol: string,
  resaleFee: number,
  jsonUrl?: string,
  stringOffChainData?: string,
}

export interface DropStoreItem extends DropStoreItemData{
  _id: string,
}