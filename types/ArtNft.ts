import { FileQuery } from "../components/common/Input"
import { MultiPartInput } from "../components/common/MultiTextInput"

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
    resaleFee: string
    creators: ArtNftCreator[]
    attributes: ArtNftAttributes[]
}

export const initialArtNftUploadQuery : ArtNftUploadQuery = {
    img: {url: ''},
    name: "",
    symbol: "",
    description: "",
    externalUrl: "",
    resaleFee: "",
    creators: [],
    attributes: [],
}


export interface ArtNftCreator extends MultiPartInput {
   name: string | 'creator'
   fields: [
        {key: 'address', value: string},
        {key: 'share', value: number},
   ]
}

export interface ArtNftAttributes extends MultiPartInput {
    name: string | 'attribute'
    fields: [
            {key: 'name', value: string},
            {key: 'value', value: string | number},
    ]
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