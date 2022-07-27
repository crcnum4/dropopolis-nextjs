import type { NextPage } from 'next'
import WalletButtons from './WalletButtons'
import { useWalletCollectionContext } from '../../providers/WalletCollectionProvider'
import { useWallet } from '@solana/wallet-adapter-react'
import StakeCollectionViewer from '../NFT/StakeCollectionViewer'
import StakeTransactionViewer from '../NFT/StakeTransactionViewer'
import { FC, useEffect, useState } from 'react'
import Head from 'next/head'
import {stakingLogoImg, stakingDisplayImg, stakingHeader, mainContainer} from '../../styles/staticStyles'
import styles from '../../styles/Home.module.css'
import { useStakeEarningsContext } from '../../providers/StakeEarningsProvider'
import { useRouter } from 'next/router'
import {clientThemes} from '../../styles/clientThemes'
import BasicPage from '../common/BasicPage'
import Image from 'next/image'
import StakeHouseHeader from './StakeHouseHeader'
import Footer from '../common/Footer'
import { useWindowSize } from '../../providers/WindowSizeHook'
import { Backdrop, CircularProgress } from '@mui/material'

const MAX_STAKING_NFTS = 7; 

interface StakingProps {
    style: React.CSSProperties;
}

const Staking : FC<StakingProps> = (props) => {

    const {publicKey} = useWallet();

    const {stakeEarnings, setStakeEarnings} = useStakeEarningsContext()

    const [processingTransaction, setProcessingTransaction] = useState({processing: false, message: ""})

    const windowWidth = useWindowSize().width || 1000;
    const mobileView = windowWidth < 825;

    // console.log("Staker Data:");
    // console.log(stakeEarnings.stakerData);
    // console.log("Staker Earning Obj:");
    // console.log(stakeEarnings);
    
    const {
        walletCollection,
        toggleIsStaking, toggleSelectNft, setAllSelections, setWalletCollection
      } = useWalletCollectionContext();
      
    // console.log("Wallet Collection:");
    // console.log(walletCollection);

    const {stakerData, isLoading} = stakeEarnings

    if (!isLoading && !stakerData) {
        return (
            <BasicPage style={{}}>
                <h1>404: No Staking Interface Found</h1>
            </BasicPage>
        )
    } else if (!stakerData) {
        return (
            <BasicPage style={{}}>
                <StakeHouseHeader 
                    style={{ paddingBottom: '3vh'}}
                    link='https://dropopolis.io'
                    logoImg="/dropopolislogo.png"
                    displayName="DropOpolis"
                    displayImg="/stakehouselogo-lightmode.png"
                />
                <hr></hr>
                <CircularProgress color="inherit" />
            </BasicPage>
        )
    }

    const {displayName, displayImg, logoImg, theme, urlIdentifier} = stakerData;

    const themeData = clientThemes[theme] || clientThemes.light

    const faviconUrl = 
        urlIdentifier == 'blockbotz' || urlIdentifier == 'smallsols' 
        ? '/rmfavicon.ico' : '/favicon.ico'

    // console.log(faviconUrl);
    
    

    if (!publicKey) return (
        <BasicPage style={{...themeData.style, paddingTop: '1vh'}}>
            <StakeHouseHeader 
                style={{...themeData.style, paddingTop: '1vh'}}
                link='https://dropopolis.io'
                logoImg={logoImg}
                displayName={displayName}
                displayImg={displayImg}
            />
            <div style={{textAlign: 'center'}}>
                <h2>NFT Staking</h2>
                <h6>You must connect to a Solana wallet to stake your NFTs. Connect by clicking the button below</h6>
            </div>
            <div style={{...mainContainer}}>
                <WalletButtons/>
            </div>
        </BasicPage>
    )
      
    if (!walletCollection || !setAllSelections || !toggleSelectNft || !toggleIsStaking || !setWalletCollection || !stakerData || !setStakeEarnings ) return (
        <BasicPage style={{}}>
            <div style={{textAlign: 'center', marginTop: '10vh'}}>
                <h2>NFT Staking</h2>
            </div>
            <div style={{...mainContainer}}>
                Error: NFT Collection Failed To Load
            </div>
        </BasicPage>
    );

    const collectionLink = displayName == 'BlockBotz' ? 'https://blockbotz.io/' : "https://DropOpolis.io"

    return (
        <>
            <Head>
                <title>{displayName} - NFT Staking</title>
                <meta name="description" content={displayName + " - NFT Staking"} />
                <link rel="icon" href={faviconUrl} />
            </Head>
        
            <div style={themeData.style}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={processingTransaction.processing}
                >
                <div style={{textAlign:'center'}}>
                    <h1>{processingTransaction.message}</h1>
                    <CircularProgress color="inherit" />
                </div>
            </Backdrop>
                <StakeHouseHeader 
                    style={{...themeData.style, paddingTop: '1vh'}}
                    logoImg={logoImg}
                    displayName={displayName}
                    displayImg={displayImg}
                    link={collectionLink}
                />
                <div style={{
                        ...themeData.style, 
                        textAlign: 'left', 
                        paddingLeft: '3rem', 
                        // borderTop: 'solid '
                    }}>
                    <a target='_blank' rel="noreferrer" href={collectionLink}>
                        <h3 style={{color: 'rgb(93 174 255)',  textDecoration: 'underline'}}>
                            {displayName} NFT Website
                        </h3>
                    </a>
                </div>
                <div style={{...mainContainer, flexDirection: mobileView ? 'column-reverse' : 'row'}}>
                    {/* NFT Viewer / Staking controls */}
                    <StakeCollectionViewer 
                        mobileView={mobileView}
                        style={themeData.style}
                        maxNftPerTransaction={MAX_STAKING_NFTS}
                    />
                    {/* Transaction Preview */}
                    <StakeTransactionViewer 
                        mobileView={mobileView}
                        maxNftPerTransaction={MAX_STAKING_NFTS}
                        style={themeData.style}
                        stakeEarnings={stakeEarnings}
                        setStakeEarnings={setStakeEarnings}
                        processingTransaction={processingTransaction}
                        setProcessingTransaction={setProcessingTransaction}
                    />
                </div>
                <Footer  
                    style={themeData.style} 
                    companyName={displayName} 
                    link={collectionLink}
                />
            </div>
        </>
    )
}

export default Staking