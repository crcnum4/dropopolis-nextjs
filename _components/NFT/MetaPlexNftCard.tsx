import React, { Component, FC, useEffect, useState } from "react";
import BorderCard from "../common/BorderCard";
import Button from "@mui/material/Button";

import OffChainMetadata from "../../types/OffChainMetadata";
import { CollectionNft } from "../../types/WalletCollection";
import axios from "axios";
import {nftCardBottomRow} from '../../styles/staticStyles'
import { PublicKey } from "@solana/web3.js";
import Image from "next/image";
import { CircularProgress } from "@mui/material";

interface NftCardProps {
    hoverable: boolean;
    className: string;
    style: {};
    onClick: () => void;
    token: CollectionNft;
    width: number;
    ratioWidth: number;
    ratioHeight: number;
    isStaking: boolean;
    disabledSelection: boolean;
}

const MetaPlexNftCard : FC<NftCardProps> = (props) => {
    const [hover, setHover] = useState(false)
    
    const onMouseEnter = () => {
        if (hoverable) setHover(!hover)
    };

    const onMouseLeave = () => {
        if (hoverable) setHover(!hover)
    };
    
    const { width, token, disabledSelection, hoverable, onClick } = props;
    
    const metadata = token.offChainMeta
    const {name, symbol, mint} = metadata
    
    let height = (width / props.ratioWidth) * props.ratioHeight;

    if (!metadata) return (
      <BorderCard
      hoverable={hoverable}
      hover={hover}
      selected={token.selected}
      style={{
        width: width,
        padding: 0,
        marginTop: 10,
        border:  "1px solid",
        borderColor: token.selected ? "#ab02ff" : "#d4d4d4",
        height: "auto",
        backgroundColor: token.selected ? "#f3dfff" : "#f7f7f7",
        ...props.style,
        textAlign: 'center',
      }}
      >
       <CircularProgress color="inherit" />
      </BorderCard>
      )


    const networkType = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet'

    const solScanURL = `https://solscan.io/token/${metadata.mint}?cluster=${networkType}`

    const selectBtnMsg =  
        props.isStaking && !token.selected 
        ? 'Click To Select This NFT' 
        : !props.isStaking && !token.selected 
        ? 'Click To Select This NFT' : 'Undo Selection';
    
    return (
      <BorderCard
        hoverable={hoverable}
        hover={hover}
        selected={token.selected}
        style={{
          width: width,
          padding: 0,
          marginTop: 10,
          border:  "1px solid",
          borderColor: token.selected ? "#ab02ff" : "#d4d4d4",
          height: "auto",
          backgroundColor: token.selected ? "#f3dfff" : "#f7f7f7",
          ...props.style,
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            position: "relative",
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
            {/*
            <img
                width={width}
                height={height}
                src={metadata.image}
                style={{ objectFit: "contain", height:"auto" }}
                alt={metadata.name}
            /> */}

            <Image
                priority={true}
                width={width}
                height={height}
                src={metadata.image}
                layout='fixed'
                alt={metadata.name}
            />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "8px 15px 8px 15px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ flex: 1 }}>
                <div style={{ width: "70%" }}>
                  <p
                    className={"font-primary"}
                    style={{ flex: 1, textAlign: "left", fontWeight: 700, minHeight: height*.045 }}
                  >
                    {metadata.symbol}
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                  <Button size='small' variant='contained' href={solScanURL} rel="noreferrer" target='_blank'>
                    View On SolScan
                  </Button>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    cursor: "default",
                    marginBottom: "0.2em",
                    marginTop: "0.25em",
                  }}
                >
                  {metadata.name}
                </p>
              </div>
            </div>
            <div
              style={{
                height: 1,
                backgroundColor: "#d9d9d9",
                width: "100%",
              }}
            />
              <div style={{ height: height/3.5 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      height: height/3.5,
                      display: "flex",
                      flexDirection: "column",
                      marginTop: '15px'
                    }}
                  >
                    {
                        metadata.description && metadata.description.length < 121 
                            ? metadata.description 
                            : metadata.description.substring(0, 120)+'...'
                    }
                  </div>

                  <div style={{...nftCardBottomRow}}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "bottom",
                      }}
                    >
                      <Button 
                        size="large" 
                        variant='contained' 
                        disabled={disabledSelection && !token.selected}
                        onClick={onClick}>
                            {selectBtnMsg}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            <div
              style={{
                height: 1,
                backgroundColor: "#d9d9d9",
                width: "100%",
              }}
            />
          </div>
        </div>
        <div className={"animated-card-border"} />
      </BorderCard>
    );
  
}

export default MetaPlexNftCard;
