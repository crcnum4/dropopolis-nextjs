import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { NftMetadata } from "../../types/NftMetadata";
import { RoyaltyArt } from "../../types/RoyaltyArt";
import BorderCardHover from "../common/BorderCardHover";

export interface LocalNftData {
  imgUrl: string,
  name: string,
  symbol: string,
  description: string,
  externalUrl: string,
}

const LocalArtNftCard: FC<{nft: LocalNftData, onClick?: Function}>= ({nft, onClick}) => {
  return (
    <BorderCardHover 
      className="m-2 p-2" 
      onClick={onClick ? () => onClick() : undefined }
    >
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
          !nft.imgUrl ? (<p className="p-2">Select Image...</p>) :
          (
            <div 
              className="bg-gray-300 rounded-xl relative" 
              style={{minWidth: 200, maxHeight: 300, width: 'auto'}}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                alt={nft.name} 
                src={`${nft.imgUrl}`} 
                className="rounded-xl object-contain max-h-full min-h-full"
              />
            </div>
          )
        }
      </div>
      <div className="flex-row">
        <h2 className="text-xl my-2 flex-1 items-center">{nft.name}</h2>
        { nft.externalUrl ? (
          <a href={nft.externalUrl} target="_blank" rel="noreferrer" className="no-underline my-2 mx-1">
            <FontAwesomeIcon icon={faGlobeAmericas} size="1x" color="black" />
          </a>
        ) : null}
      </div>
      { nft.description ? (
        <p className="text-lg my-2 flex-1">
          {nft.description.substring(0,200)}
          {nft.description.length > 201 ? '...' : null}
        </p>
      ): null}
    </BorderCardHover>
  )

}

export default LocalArtNftCard