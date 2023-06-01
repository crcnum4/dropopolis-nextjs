import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { getNftMetadata } from "../../scripts/getNftMetadata";
import { ArtNftOffChainMeta } from "../../types/ArtNft";
import { Escrow } from "../../types/Escrow";
import { NftMetadata } from "../../types/NftMetadata";
import { RoyaltyArt } from "../../types/RoyaltyArt";
import BorderCardHover from '../common/BorderCardHover';
import profile from '../../public/assets/profile.jpeg'
import Image from "next/image";
import BN from "bn.js";
import Button from "../common/Button";

interface Props {
  escrow: Escrow,
  nft: NftMetadata<RoyaltyArt>,
  pubkey: PublicKey,
  onBuy: (escrow: Escrow, pubkey: PublicKey, metadata: RoyaltyArt) => void,
  buyable: boolean
}

const ArtNftEscrowItem: FC<Props> = ({escrow, nft, pubkey, onBuy, buyable}) => {
  const [offChainData, setOffChainData] = useState<ArtNftOffChainMeta | null>(null);
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    if (!nft.data) {
      return;
    }
    onBuy(escrow, pubkey, nft.data);
  }

  useEffect(() => {
    const fetchOffChainData = async() => {
      if (!nft.data || !nft.data.uri) {
        return;
      }
      const res = await axios.get<ArtNftOffChainMeta>(
        `${nft.data.uri}`
      );
      setOffChainData(res.data);
      setLoading(false);
    }
    setLoading(true);
    fetchOffChainData();
  }, [nft])

  const sellerString = escrow.seller.toString();

  return (
    <BorderCardHover className="m-2 p-2"> 
      <div className="flex-row items-center">
        <Image
          alt={`seller ${escrow.seller.toString()}`}
          src={profile}
          objectFit="cover"
          height={40}
          width={40}
          className="rounded-full bg-gray-200"
        />
        <p className="text-sm">
          {
           sellerString.toString().substring(0, 5)
          }...{
            sellerString.substring(sellerString.length - 5)
          }
          </p>
      </div>
      <div 
        className="mx-2 my-2 bg-gray-300 rounded-xl relative"
        style={{
          minWidth: 200,
          minHeight: 200,
          maxHeight: 300,
          width: 'auto'
        }}
      >
        {
          loading ? (<p className="p-2">Loading...</p>) :
          (
            <div 
              className="bg-gray-300 rounded-xl relative" 
              style={{minWidth: 200, maxHeight: 300, width: 'auto'}}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={offChainData?.name}
                src={`${offChainData?.properties.files[0].uri}`}
                className="rounded-xl object-contain max-h-full min-h-full"
              />
            </div>
          )
        }
      </div>
      <h2 className="text-xl my-2">{nft.data?.name}</h2>
      <h3 className="text-blue-500 text-xl font-bold my-2">
        {(escrow.expectedAmount.toNumber() / LAMPORTS_PER_SOL)} SOL
      </h3>
      {buyable ? (
        <Button 
          className='bg-blue-500 hover:bg-blue-700 text-white py-3 px-5 rounded-md w-full my-5'
          onClick={handleClick}
        >
          Buy Now
        </Button>
      ) : null}
    </BorderCardHover>
  )
  
}

export default ArtNftEscrowItem