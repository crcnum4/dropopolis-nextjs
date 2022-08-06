import { ArtNftOffChainMeta, ArtNftUploadQuery } from "../types/ArtNft"

export const createMetadataJson = (query: ArtNftUploadQuery): string => {

   const metadataJson: ArtNftOffChainMeta = {
        name: query.name,
        symbol: query.symbol,
        description: query.description,
        externalUrl: query.externalUrl,
        properties: {
            files: [
                {
                type: "IMAGE",
                uri: query.img.url
                }
            ],
            creators: query.creators
        },
        attributes: query.attributes
   }


   return JSON.stringify(metadataJson, null, 2)
}