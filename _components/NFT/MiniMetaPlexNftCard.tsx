import React, { FC, useEffect, useState } from "react";

import OffChainMetadata from "../../types/OffChainMetadata";
import { CollectionNft } from "../../types/WalletCollection";
import axios from "axios";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";

interface NftCardProps {
    token: CollectionNft;
    selectionNumber: number
    style: React.CSSProperties
    key: any
}

const MiniMetaPlexNftCard : FC<NftCardProps> = (props) => {

    const { token, selectionNumber } = props;
    const metadata = token.offChainMeta
    const {name, symbol} = metadata
    
    const simpleNftData = (
      <div style={{ textAlign: 'left', paddingLeft: 10}}>
        <p>{selectionNumber+1}: {symbol}</p>
        <p>{name}</p>
      </div>
    );

    if (!metadata) return (
      <div style={{display: props.style.display}}>
        <CircularProgress color="inherit" />
      </div>)

    const networkType = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet'

    const solScanURL = `https://solscan.io/token/${metadata.mint}?cluster=${networkType}`
    
    return (
      <div style={{
        ...props.style,
        textAlign: 'center', 
        margin: '2px auto', 
        borderRadius: 3,
        display: props.style.display, 
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <div
          style={{flex: .5, width: 50, height: 'auto', borderRadius: 20, margin: 10}}
        >
          <Image 
              // style={{flex: .5, width: 50, height: 'auto', borderRadius: 10}}
              priority={true}
              src={metadata.image}
              width={120}
              height={160}
              layout='responsive'
              alt="Loading NFT"
          />
        </div>
        <h5 style={{flex: 1, userSelect: 'none'}}>{simpleNftData}</h5>
      </div>
    );
  
}

export default MiniMetaPlexNftCard;
