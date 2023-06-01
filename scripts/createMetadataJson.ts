import { ArtNftOffChainMeta, ArtNftUploadQuery } from "../types/ArtNft"
import { RoyaltyArtOffChainMeta } from "../types/RoyaltyArt"
import { URoyaltyArtQuery } from "../types/UploadTypes"

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
            creators: query.creators.map(creator => {
                return {
                    "address": creator.fields[0].value,
                    "share": creator.fields[1].value as number,
                }
            })
        },
        attributes: query.attributes.map(attribute => {
            return {
                "name": attribute.fields[0].value,
                "value": attribute.fields[1].value,
            }
        })
   }


   return JSON.stringify(metadataJson, null, 2)
}

export const createMetadataJsonFile = (query: URoyaltyArtQuery): string => {
    const metadataJson: RoyaltyArtOffChainMeta = {
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
            creators: query.creators,
        },
        attributes: query.attributes
    }

    return JSON.stringify(metadataJson, null, 2)
}