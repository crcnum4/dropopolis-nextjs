import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import DropNFTCardWrapper from "../../components/DropopolisNFT/DropNftCardWrapper";
import { getWalletNftCollection } from "../../scripts/getWalletNftCollection";
import { NftKind, NftMetadata } from "../../types/NftMetadata";
import { RoyaltyArt } from "../../types/RoyaltyArt";

const CollectionViewer: NextPage = () => {



    const wallet = useWallet();
    const {connection} = useConnection();

    const [collection, setCollection] = useState<NftMetadata[]>()
    const [loadingState, setLoadingState] = useState<String>('Waiting For Wallet To Connect')

    useEffect( () => {

        if (!wallet.publicKey) return;

        setLoadingState("Reading Wallet Collection")

        getWalletNftCollection(wallet.publicKey, connection)
        .then( nftData => {

            setCollection(nftData)
            setLoadingState("") //empty string means it is done loading
            // console.log(nftData);
            
        })
        .catch( error => {
            setLoadingState("An Error Occurred")
            console.log(error);
            
        })


    }, [wallet, connection])

    return (
        <div className="container mx-auto">

            <h1>{loadingState}</h1>

            {collection ? collection.map((nft, i) => {
                console.log(nft);

                
                if (!nft.data || !(nft.data instanceof RoyaltyArt) ) return null
                
                

            
                return (
                    <div key={nft.mint.toString()}>
                        <DropNFTCardWrapper 
                            metaDataUri={nft.data.uri}
                        />    
                    </div>
                )
            }) : null}

        </div>
    )
}

export default CollectionViewer;