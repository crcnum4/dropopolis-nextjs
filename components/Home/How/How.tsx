import React, {FC} from "react";
import InfoCard from "../../common/InfoCard";
import IconHolder from "./IconHolder";
import Image from "next/image";

const How: FC = () => {
  return (
    <div className="flex-row content-between flex-wrap">
      <InfoCard className="bg-blue-200/30" >
        <div className="flex-row justify-between mb-5">
          <IconHolder>
            <img src="/assets/Solana.png" alt="solana" height={45} width={45} />
          </IconHolder>
          <p className="text-blue-300/40 font-bold text-4xl">
            01
          </p>
        </div>
        <p className="font-bold text-3xl">Connect your wallet</p>
        <p className='space-x-2 text-1xl'>Decide which Solana wallet you want to use</p>
      </InfoCard>
      <InfoCard className="bg-blue-200/30">
        <div className="flex-row justify-between mb-5">
          <IconHolder>
            <Image src="/assets/Solana.png" alt="solana" height={45} width={45} />
          </IconHolder>
          <p className="text-blue-300/40 font-bold text-4xl">
            02
          </p>
        </div>
        <p className="font-bold text-3xl">Submit Your NFT Drop</p>
        <p className='space-x-2 text-1xl'>Creators, submit your Nft drop for consideration</p>
      </InfoCard>
      <InfoCard className="bg-blue-200/30">
        <div className="flex-row justify-between mb-5">
          <IconHolder>
            <Image src="/assets/Solana.png" alt="solana" height={45} width={45} />
          </IconHolder>
          <p className="text-blue-300/40 font-bold text-4xl">
            03
          </p>
        </div>
        <p className="font-bold text-3xl">Buy/Sell NFT Drops</p>
        <p className='space-x-2 text-1xl'>Buy and sell NFT drops</p>
      </InfoCard>
    </div>
  )
}

export default How;