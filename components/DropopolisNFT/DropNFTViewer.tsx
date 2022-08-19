import React, { FC, useState } from "react";
import BorderCard from "../common/BorderCard";

import Image from "next/image";
import Spinner from "../common/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";

const nftPlaceholder = "/assets/nft-placeholder.png";

interface NftCardProps {
    hoverable: boolean;
    className?: string;
    style?: {};
    onClick: () => void;
    token: DropNFTViewerTokenData;
}

interface DropNFTViewerTokenData {
  name: string
  symbol: string
  description: string
  externalUrl: string
  imgURL: string
}

const nftCardBottomRowStyle = {
  display: "flex",
  flexDirection: "row",
  position: "absolute",
  justifyContent: "center",
  alignItems: "bottom",
  width: "90%",
  transform: "translate(0%,200%)",
  height: 'fit-content',
} as React.CSSProperties;

const DropNFTViewer : FC<NftCardProps> = (props) => {
    const [hover, setHover] = useState(false)
    
    const onMouseEnter = () => {
        if (hoverable) setHover(!hover)
    };

    const onMouseLeave = () => {
        if (hoverable) setHover(!hover)
    };
    
    const { token, hoverable, onClick } = props;
    
    const {name, symbol, imgURL, description, externalUrl} = token

    const [width, height] = [300, 300]

    if (!token) return (
      <BorderCard
        hoverable={hoverable}
        hover={hover}
        selected={false}
        style={{
            width: width,
            padding: 0,
            marginTop: 10,
            border:  "1px solid",
            borderColor:  "#d4d4d4",
            height: "auto",
            backgroundColor:  "#f7f7f7",
            ...props.style,
            textAlign: 'center',
        }}
      >
       <Spinner/>
      </BorderCard>
    )
    return (
      <BorderCard
        hoverable={hoverable}
        hover={hover}
        selected={false}
        style={{
          width: width,
          padding: 0,
          marginTop: 10,
          border:  "1px solid",
          borderColor: "#d4d4d4",
          height: "auto",
          backgroundColor: "#f7f7f7",
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
             <img
                src={imgURL || nftPlaceholder}
                style={{ objectFit: "contain", height:"auto" }}
                alt={""}
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
                    {symbol}
                  </p>
                </div>
              </div>
              {externalUrl ? (
                  <a href={externalUrl} target="_blank" rel="noreferrer" >
                    <FontAwesomeIcon icon={faGlobeAmericas} size="1x" color="black"/>
                  </a>
                ) : null
              }
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
                  {name}
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
                        description && description.length < 121 
                            ? description 
                            : description.substring(0, 120)+'...'
                    }
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

export default DropNFTViewer;
