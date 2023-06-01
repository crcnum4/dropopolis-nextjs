import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PublicKey } from "@solana/web3.js";
import axios, { AxiosResponse } from "axios";
import { FC, useEffect, useState } from "react";
import { ArtNftOffChainMeta } from "../../types/ArtNft";
import { NftMetadata } from "../../types/NftMetadata";
import { RoyaltyArt } from "../../types/RoyaltyArt";
import BorderCardHover from "../common/BorderCardHover";
import Button from "../common/Button";
import Overlay from "../common/Overlay";
import SellNftModal from "../Modals/SellNftModal";

interface Props {
  nft: NftMetadata<RoyaltyArt>,
  tokenAccount: PublicKey,
  isOwner?: boolean,
  sellNft?: (nft: NftMetadata<RoyaltyArt>, tokenAccount: PublicKey, amount: number) => void
}

const ArtNftCard: FC<Props> = ({nft, tokenAccount, isOwner, sellNft}) => {
  const [overlay, setOverlay] = useState(false);
  const [offChainData, setOffChainData] = useState<ArtNftOffChainMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const handleClick = () => {
    setOverlay(true);
  }

  const submitSell = (amount: number) => {
    if (!sellNft) {
      return;
    }
    setOverlay(false);
    sellNft(nft, tokenAccount, amount);
  }

  const cancelSell = () => {
    setOverlay(false);
  }

  useEffect(() => {
    const fetchOffChainData = async() => {
      if (!nft.data || !nft.data.uri) {
        return;
      }
      let res: AxiosResponse<ArtNftOffChainMeta, any>; 
      if (nft.data.uri.includes("ipfs")) {
        res = await axios.get<ArtNftOffChainMeta>(nft.data.uri);
      } else {
        res = await axios.get<ArtNftOffChainMeta>(
          `${nft.data.uri}`,
        );
      }
      setOffChainData(res.data);
      setLoading(false);

    }
    setLoading(true);
    fetchOffChainData();
  }, [nft])

  return (
    <BorderCardHover className="m-2 p-2">
      <Overlay active={overlay}>
        <SellNftModal nft={nft} onSubmit={submitSell} onCancel={cancelSell} />
      </Overlay>
      <div 
        className="mx-2 my-2 bg-gray-300 rounded-xl relative"
        style={{
          minWidth: 200,
          minHeight: 200,
          maxHeight: 300,
          width: 'auto',
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
      <div className="flex-row">
        <h2 className="text-xl my-2 flex-1 items-center">{nft.data?.name}</h2>
        {!loading && offChainData?.externalUrl ? (
          <a href={offChainData?.externalUrl} target="_blank" rel="noreferrer" className="no-underline my-2 mx-1">
            <FontAwesomeIcon icon={faGlobeAmericas} size="1x" color="black" />
          </a>
        ) : null}
      </div>
      { offChainData?.description ? (
        <p className="text-lg my-2 flex-1">
          {offChainData.description.substring(0,200)}
          {offChainData.description.length > 201 ? '...' : null}
        </p>
      ): null}
      {isOwner ? (
        <Button
          className='bg-blue-500 hover:bg-blue-700 text-white py-3 px-5 rounded-md w-full my-5'
          onClick={handleClick}
        >
          Put up for sale
        </Button>
      ): null }
    </BorderCardHover>
  )

} 

export default ArtNftCard;