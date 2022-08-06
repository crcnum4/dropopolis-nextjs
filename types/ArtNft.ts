import { FileQuery } from "../components/common/ImageInput"

export interface ArtNftOffChainMeta {
    name: string
    symbol: string
    description: string
    externalUrl: string
    attributes: ArtNftAttributes[]
    properties: ArtNftProperties
}

export interface ArtNftUploadQuery {
    img: FileQuery
    name: string
    symbol: string
    description: string
    externalUrl: string
    royalty: number
    creators: ArtNftCreator[]
    attributes: ArtNftAttributes[]
}

export interface ArtNftCreator {
    address: string
    share: string
}

export interface ArtNftAttributes {
    name: string
    value: string
}

export interface ArtNftProperties {
    files: {
        type: string
        uri: string
    }[]
    creators: ArtNftCreator[]
}

export interface ArtNftUploadErrors extends ArtNftUploadQuery {
    form: string
}