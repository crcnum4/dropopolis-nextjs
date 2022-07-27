import React from 'react'
import {stakingLogoImg, stakingDisplayImg, stakingHeader} from '../../styles/staticStyles'

type Props = {
    style: React.CSSProperties,
    logoImg: string,
    displayImg: string,
    displayName: string,
    link: string
}

export default function StakeHouseHeader(props: Props) {

    const {logoImg, displayImg, displayName, style, link} = props
    return (
        <div style={{...style}}>
            {/* <div style={stakingHeader}>
                <img src={logoImg} style={stakingLogoImg} alt={displayName} />
                <img src={'/dropopolislogo.png'} style={{...stakingDisplayImg, height: 50}} alt="Dropopolis" />
            </div>
            <div style={stakingHeader}>
                <img src={displayImg} style={stakingDisplayImg} alt="NFT Staking" />
                <img src={'/stakehouselogo.png'} style={{...stakingLogoImg, height: 75}} alt="Stakehouse" />
            </div> */}
            <div style={stakingHeader}>
                <a target='_blank' rel="noreferrer" href={link} style={stakingLogoImg}>
                    <img src={logoImg} style={stakingLogoImg} alt={displayName} />
                </a>
                <a target='_blank' rel="noreferrer" href={link} style={stakingDisplayImg}>
                    <img src={displayImg} style={stakingDisplayImg} alt="NFT Staking" />
                </a>
            </div>
        </div>
    )
}