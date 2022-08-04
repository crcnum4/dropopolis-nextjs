import { PublicKey } from "@solana/web3.js"

type OffChainMetadata = {
    mint: PublicKey,
    description: string,
    externalUrl: string,
    id: number,
    image:  string,
    name:  string,
    properties: OffChainMetadataProperties,
    symbol: string,
    [key: string]: any,
}

type OffChainMetadataProperties = {
    category: string, 
    creators: PublicKey[], 
    files: OffChainMetadataFiles[]
}


type OffChainMetadataFiles = {
    type: string,
    uri: string
}

export default OffChainMetadata;