import reactSyntaxHighlighter from "react-syntax-highlighter";
import {FC, useEffect, useState} from 'react';
import BorderCardHover from "../common/BorderCardHover";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import dynamic from 'next/dynamic';
import Button from '../common/Button'
import { DropStoreItem } from "../../types/DropStore";
import { NftMetadata } from "../../types/NftMetadata";
import { RoyaltyArt } from "../../types/RoyaltyArt";
import { ArtNftOffChainMeta } from "../../types/ArtNft";
import axios from "axios";
import { off, prependOnceListener } from "process";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const StoreItem: FC<{
  storeItem: DropStoreItem, onPurchase: (nft: DropStoreItem) => void
}> = ({storeItem, onPurchase}) => {
  const [offChainData, setOffChainData] =  useState<ArtNftOffChainMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const handleClick = () => {
    onPurchase(storeItem);
  }

  useEffect(() => {
    const fetchOffChainData = async () => {
      const res = await axios.get<ArtNftOffChainMeta>(
        `https://cors-anywhere.herokuapp.com/${storeItem.jsonUrl}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      setOffChainData(res.data);
      setLoading(false);
    }
    setLoading(true);
    fetchOffChainData();
  }, [storeItem])

  const displayImage = () => {
    if (loading) {
      return <p className="p-2">loading...</p>;
    }
    if (!offChainData) {
      return <p className="p-2">No Image Found...</p>;
    }
    if (!offChainData.properties) {
      console.log(offChainData)
      console.log(offChainData.properties)
      return <p className="p-2">Empty properties</p>
    }
    const file = offChainData.properties.files.find(item => item.type === "IMAGE")
    if (!file) {
      return <p className="p-2">loading...</p>;
    }
    return (
      <div className="bg-gray-300 rounded-xl relative" style={{minWidth: 200, maxHeight: 300, width: 'auto'}}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          alt={storeItem.name} 
          src={`${file.uri}`} 
          className="rounded-xl object-contain max-h-full min-h-full"
        />
      </div>
    )
  }

  return (
    <BorderCardHover className="m-2 p-2">
      <div 
        className="mx-2 my-2 bg-gray-300 rounded-xl relative" 
        style={({
          minWidth: 200,
          minHeight: 200,
          maxHeight: 300,
          width: 'auto',
        })}
      >
        {displayImage()}
      </div>
      <div className="flex-1 justify-center">
      <h2 className="text-xl my-2">{storeItem.name}</h2>
        <h2 className="text-blue-500 text-xl font-bold my-2">{storeItem.price / LAMPORTS_PER_SOL}</h2>
      </div>
      <Button 
        className='bg-blue-500 hover:bg-blue-700 text-white py-3 px-5 rounded-md w-full my-5'
        onClick={handleClick}
      >
          Buy & Mint Token
      </Button>
    </BorderCardHover>
  )

}

export default StoreItem;