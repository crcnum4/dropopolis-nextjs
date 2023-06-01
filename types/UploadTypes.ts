import { FileQuery } from "../components/common";

export interface URoyaltyArtQuery {
  img: FileQuery,
  name: string,
  symbol: string,
  description: string,
  externalUrl: string, 
  resaleFee: string,
  creators: URoyaltyArtCreator[],
  attributes: URoyaltyArtAttribute[]
}

export const initialURoyaltyArtQuery: URoyaltyArtQuery = {
  img: {url: ''},
  name: "",
  symbol: '',
  description: '',
  externalUrl: '',
  resaleFee: '',
  creators: [],
  attributes: [],
}

export interface URoyaltyArtCreator {
  address: string,
  share: number,
}

export interface URoyaltyArtAttribute {
  name: string,
  value: string
}

export interface URoyaltyArtProperites {
  files: {
    type: string,
    uri: string,
  }[],
  creators: URoyaltyArtCreator[]
}

export interface URoyaltyArtFormErrors extends Omit<URoyaltyArtQuery, "img" | "creators" | "attributes"> {
  img: string,
  creators: string[],
  attributes: string[],
} 