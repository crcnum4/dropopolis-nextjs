import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { ArtNftOffChainMeta } from "../../types/ArtNftForm";
import DropNFTViewer from "./DropNFTViewer";

interface DropNFTCardWrapperProps {
    className?: string;
    style?: {};
    metaDataUri: string
}

const DropNFTCardWrapper : FC<DropNFTCardWrapperProps> = (props) => {

    let [ nftData, setNftData ] = useState<ArtNftOffChainMeta>()

    const {metaDataUri} = props

    useEffect(() => {
        const getMetadata = async () => {

            const url = `${metaDataUri}`
            // console.log("URL\n" + url);
            const res = await axios(url);
            console.log(res.data);
            
            setNftData(res.data)
        }
        getMetadata()
    },[metaDataUri])

    if (!nftData) return <div>Loading...</div>

    return (
        <div className={props.className} style={props.style}>
            <DropNFTViewer 
                token={{
                    ...nftData,
                    imgURL: nftData.properties.files[0].uri
                }} 
                hoverable={true}
                onClick={() => {}}
            />
        </div>
    )
}

export default DropNFTCardWrapper;
