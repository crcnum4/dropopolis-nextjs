import { CircularProgress } from '@mui/material'
import Button from '@mui/material/Button'
import React, { Dispatch, FC, SetStateAction } from 'react'
import { useStakeEarningsContext } from '../../providers/StakeEarningsProvider'
import { useWalletCollectionContext } from '../../providers/WalletCollectionProvider'
// import styles from '../../styles/Home.module.css'
import {nftContainerStyle, nftViewerStyle, selectBtnsDiv} from '../../styles/staticStyles'
import { StakeEarningsState } from '../../types/StakeEarnings'
import MetaPlexNftCard from './MetaPlexNftCard'

type StakeCollectionViewerProps = {
  style: React.CSSProperties
  maxNftPerTransaction : number 
  mobileView: boolean
}

const StakeCollectionViewer : FC<StakeCollectionViewerProps> = (props) => {

  const {maxNftPerTransaction, mobileView} = props;

  // const {displayName, displayImg, logoImg, theme, tokenSymbol, urlIdentifier} = stakerData;
  const {
    walletCollection,
    toggleIsStaking, toggleSelectNft, setAllSelections
  } = useWalletCollectionContext();


  const {refreshEstimate} = useStakeEarningsContext()
    
  if (!walletCollection || !setAllSelections || !toggleSelectNft || !toggleIsStaking || !refreshEstimate) return (
    <div>
      Error: NFT Collection Failed To Load
    </div>
  );

  const {isLoading, isStaking} = walletCollection
  const arrInUse = isStaking ? 'unstaked' : 'staked';
  const arrNotInUse = !isStaking ? 'unstaked' : 'staked';
  const selectedArr = walletCollection[arrInUse];
  const unselectedArr = walletCollection[arrNotInUse];
  const selectedNfts = selectedArr.filter(nftData=> {return nftData.selected});
  const allNfts = [...walletCollection[arrInUse], ...walletCollection[arrNotInUse]];
  
  return (
    <div 
    className='nft-container'
    style={{...nftContainerStyle}}>
      {/* NFT Selection and Filter Controls*/}
      { !isLoading ? 
      
        (<div style={{textAlign: 'center', marginTop: '1vh',  minHeight: mobileView ? 'none' : '10rem'}}>
            <h3>{isStaking ? 'Unstaked' : 'Staked'}  NFTs</h3>
          <strong><p>
            {isStaking 
                ? 'Select NFTs to Stake NFTs and Earn Rewards' 
                : 'Select NFTs to Unstake and transfer back to your wallet'} - {selectedNfts.length}/{selectedArr.length} Selected
          </p></strong>
          
          <div style={{...selectBtnsDiv}}>
            <Button 
              variant='contained' 
              size='medium' 
              onClick={()=>{
                // refreshEstimate();
                setAllSelections(false);
                toggleIsStaking();
              }}
              disabled={unselectedArr.length == 0}
            >
                {isStaking ? 'View Staked NFTs': 'View Unstaked NFTs'} {unselectedArr.length != 0 ? `(${unselectedArr.length})`: ''}
            </Button>
            <Button 
              variant='contained' 
              size='medium' 
              onClick={()=>{setAllSelections(true)}}
              disabled={selectedNfts.length >= maxNftPerTransaction || selectedNfts.length == selectedArr.length}
            >
                Select All ({selectedArr.length})
            </Button>
            <Button 
              variant='contained' 
              size='medium' 
              onClick={()=>{setAllSelections(false)}} 
              disabled={selectedNfts.length == 0}
            >
                Unselect All
            </Button>
          </div>

        </div>) : (
          <div style={{textAlign: 'center', marginTop: '3%'}}>
            <h3>Loading NFTs</h3>
          </div>
        )
      }
      
      <hr style={{width: '100%', margin: 0}}/>
      {/* Display NFTs */}
      <div 
        style={{...nftViewerStyle, ...props.style}}
      >

        {walletCollection && selectedArr && (
           !isLoading ? allNfts.map((token,i) => {
            return (
              <MetaPlexNftCard 
                token={token}
                hoverable={true}
                className='nft' 
                style={{
                  ...props.style,
                  margin: '40px 40px', 
                  display: selectedArr.includes(token) ? "inherit" : 'none'
                }}
                onClick={()=>{toggleSelectNft(token)}}
                disabledSelection={false}
                width={355}

                ratioWidth={3}
                ratioHeight={4}
                isStaking={isStaking}
                key={i}
              />
            )}) 
            : (
                <CircularProgress />
            )
          )
        }

      </div>
    </div>
  )
}

export default StakeCollectionViewer