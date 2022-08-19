import axios from "axios";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { ArtNftOffChainMeta } from "../../types/ArtNft";
import DropNFTViewer from "./DropNFTViewer";

interface DropNFTWrapperProps {
    className?: string;
    style?: {};
}

const DropNFTWrapper : FC<DropNFTWrapperProps> = (props) => {

    let [ nftData, setNftData ] = useState<ArtNftOffChainMeta>()

    const IPFS_GATEWAY_GET = process.env.NEXT_PUBLIC_IPFS_GATEWAY_GET


    const router = useRouter();
    const { hash:metaDataIpfsHash } = router.query;
    console.log("metaDataIpfsHash: " + metaDataIpfsHash);
    
    const apiUri = IPFS_GATEWAY_GET || 'https://ipfs.io/ipfs'

    useEffect(() => {
        const getMetadata = async () => {

            const url = `${apiUri}/${metaDataIpfsHash}`
            console.log("URL\n" + url);
            const res = await axios(url);
            setNftData(res.data)
        }
        getMetadata()
    },[apiUri, metaDataIpfsHash, nftData])
    
    // console.log('off-chain metadata\n', nftData)

    if (!nftData) return <div>Loading...</div>

    return (
        <div className={props.className} style={props.style}>
            <div className="ml-6">
                <h1 
                    className="text-xl font-bold text-center mb-3"
                >
                    Off Chain Metadata
                </h1>
                <SyntaxHighlighter language="json" customStyle={{fontSize: '.9em'}}>
                    {JSON.stringify(nftData, null, 2)}
                </SyntaxHighlighter>
            </div>

            <div
                className="ml-6"
            >
                <h1 className="text-xl font-bold text-center ">
                    NFT Viewer
                </h1>
                <DropNFTViewer 
                token={{
                    ...nftData,
                    imgURL: nftData.properties.files[0].uri
                }} 
                hoverable={true}
                onClick={() => {}}
            />
            </div>
            
        </div>
    )
}

export default DropNFTWrapper;
