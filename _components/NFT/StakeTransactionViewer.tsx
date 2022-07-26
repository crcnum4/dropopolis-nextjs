import type { NextPage } from 'next'
import Head from 'next/head'
import WalletButtons from '../solcommon/WalletButtons'
import styles from '../../styles/Home.module.css'
import {BalanceViewer} from '../solcommon/BalanceViewer'
import { useWalletCollectionContext } from '../../providers/WalletCollectionProvider'

import {transactionPreviewStyle, mainContainer} from '../../styles/staticStyles'
import { Button } from '@mui/material'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { stakeNftTransaction, TargetNft } from '../../scripts/StakeNftsTransaction'
import { PublicKey } from '@solana/web3.js'
import { unstakeNftsTransactions } from '../../scripts/unstakeNftsTransaction'
import { claimRewardsTransaction } from '../../scripts/claimRewardsTransaction'
import { EstimatedEarnings } from '../solcommon/EstimatedEarnings'
import { useStakeEarningsContext } from '../../providers/StakeEarningsProvider'
import MiniMetaPlexNftCard from './MiniMetaPlexNftCard'
import { StakeEarningsState } from '../../types/StakeEarnings'
import { Dispatch, SetStateAction } from 'react'

type StakeTransactionViewerProps = {
  style: React.CSSProperties
  stakeEarnings: StakeEarningsState
  setStakeEarnings: Dispatch<SetStateAction<number>>
  mobileView: boolean
  processingTransaction: {processing: boolean, message: string}
  setProcessingTransaction: Dispatch<SetStateAction<{processing: boolean, message: string}>>
  maxNftPerTransaction : number 
}

export default function StakeTransactionViewer( props: StakeTransactionViewerProps) {

  // const {displayName, displayImg, logoImg, theme, tokenSymbol, urlIdentifier} = stakerData;
    const {style, setStakeEarnings, stakeEarnings, mobileView, processingTransaction, setProcessingTransaction, maxNftPerTransaction} = props;

    const {publicKey, sendTransaction} = useWallet();
    const { connection } = useConnection();

    const {
        walletCollection,
        toggleIsStaking, toggleSelectNft, setAllSelections, setWalletCollection
      } = useWalletCollectionContext();

      const {refreshEstimate} = useStakeEarningsContext()
    if (!publicKey) return (
        <div className={styles.container}>
            <div style={{textAlign: 'center', marginTop: '10vh'}}>
                <h2>{stakeEarnings.stakerData?.displayName} - NFT Staking</h2>
                <h6>You must connect to a Solana wallet to stake your NFTs. Connect by clicking the button below</h6>
            </div>
            <div style={{...mainContainer}}>
                <WalletButtons/>
            </div>
        </div>
    )
      
    if (!walletCollection || !setAllSelections || !toggleSelectNft || !toggleIsStaking || !setWalletCollection || !setStakeEarnings || !stakeEarnings || !stakeEarnings.stakerData || !refreshEstimate) return (
        <div className={styles.container}>
            <div style={{textAlign: 'center', marginTop: '10vh'}}>
                <h2>{stakeEarnings.stakerData?.displayName} - NFT Staking</h2>
            </div>
            <div style={{...mainContainer}}>
                Error: NFT Collection Failed To Load
            </div>
        </div>
    );
  
  const {isStaking} = walletCollection
  const {earnings, stakerData} = stakeEarnings
  const arrInUse = isStaking ? 'unstaked' : 'staked';
  const arrNotInUse = !isStaking ? 'unstaked' : 'staked';
  const selectedArr = walletCollection[arrInUse];
  const selectedNfts = selectedArr.filter(nftData=> {return nftData.selected});
  const allNfts = [...walletCollection[arrInUse], ...walletCollection[arrNotInUse]];

  const handleStakingRewardClaim = async () => {
    // console.log("Claiming Rewards");
    try {
      if (processingTransaction.processing) return
      setProcessingTransaction({processing: true, message: "Starting Rewards Claim Transaction"})

      const transaction = await claimRewardsTransaction(connection, publicKey, stakerData);


      setProcessingTransaction({processing: true, message: "Waiting For Transaction Approval"})
      const signature = await sendTransaction(transaction, connection);
      
      const latestBlockHash = await connection.getLatestBlockhash();

      setProcessingTransaction({processing: true, message: "Waiting For Transaction To Complete"})
      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: signature,
      });

      setStakeEarnings(0);

      setProcessingTransaction({processing: false, message: "Transaction Completed"})
      
      
    } catch (error) {

      setProcessingTransaction({processing: false, message: "Transaction Canceled"})
      // alert(error + "\nTransaction failed: check logs for more details")
      console.log(error);
      
    }
  }

  function splitTargetNfts(arr: TargetNft[], maxSize: number) {
      const finalArr = [];
      for (let i = 0; i < arr.length; i += maxSize) {
          const chunk = arr.slice(i, i + maxSize);
          finalArr.push(chunk);
      }
      return finalArr.reverse();
  }
  const handleTokenStaking = async () => {
    console.log("Staking Tokens", );
    try {
      if (processingTransaction.processing) return
      setProcessingTransaction({processing: true, message: "Starting Staking Transaction"})

      const allTargetNfts:TargetNft[] = selectedNfts.map(nftData => {return {
        accountPubkey: nftData.tokenAccount,
        mintKey: new PublicKey(nftData.metadata.data.mint)
      }});

      const targetNftChunks = splitTargetNfts(allTargetNfts, maxNftPerTransaction).reverse();

      for (let i = 0; i < targetNftChunks.length; i++) {
        const targetNfts = targetNftChunks[i];
        
        try {
  
          const [transaction, tokenAccounts] = isStaking 
          ? await stakeNftTransaction(
            connection, 
            publicKey, 
            targetNfts,
            stakerData
          ) :
          await unstakeNftsTransactions (
            connection, 
            publicKey, 
            targetNfts,
            stakerData
          ) 
          setProcessingTransaction({processing: true, message: `Waiting For Transaction Approval (${i+1}/${targetNftChunks.length})`})
          const signature = await sendTransaction(transaction, connection);
          
          const latestBlockHash = await connection.getLatestBlockhash();
          setProcessingTransaction({processing: true, message: `Waiting For Transaction To Complete (${i+1}/${targetNftChunks.length})`})
          await connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: signature,
          });
        
  
        } catch (error) {
          // alert(error + "\nTransaction failed: check logs for more details")
          throw error
        }
      }
      
      await refreshEstimate().then( () => {
        setProcessingTransaction({processing: false, message: "Transaction Completed"})
      })
    

    } catch (error) {

      setProcessingTransaction({processing: false, message: "Transaction Canceled"})
      // alert(error + "\nTransaction failed: check logs for more details")
      console.log(error);
      
    }

  }

  // console.log(!selectedArr.find(e=>{return e.selected}), selectedArr);
  
  const transactionAvailable:boolean = !(walletCollection && selectedArr && !selectedArr.find(e=>{return e.selected}));

  return (
    <div style={{...transactionPreviewStyle, flex: mobileView ? 0 : 1}}>
          

          <div style={{display: 'flex', flexDirection: 'column', margin: '0 auto', marginTop: '1vh', minHeight: mobileView ? 'none' : '10rem'}}>
            <BalanceViewer />
            <EstimatedEarnings stakeEarnings={stakeEarnings} style={{}} />
          
            {earnings > 0 ?
              (
                <Button 
                  variant='contained' 
                  onClick={handleStakingRewardClaim}
                  >
                    Claim Staking Rewards
                  </Button>
              ) : null
            }
            
          </div>
          <hr style={{width: '100%', margin: 0}}/>
                <div style={{

                  // display: 'table',
                  minHeight: '95vh',
                  position: 'relative',
                  
                  display: 'flex', 
                  flexDirection: 'column',

                  margin: '10px 15%', 
                  paddingBottom: 50,
                }}>
                  <h3 style={{}}>
                    {selectedNfts.length} NFTs Selected To {isStaking ? 'Stake' : 'Unstake'}
                  </h3>
                  {transactionAvailable ? 
                  <Button 
                    variant='contained' 
                    style={{margin: '25px 10px', marginTop: 5, }}

                    onClick={handleTokenStaking}
                    >
                      {isStaking ? 'Stake' : 'Unstake'} NFTS
                  </Button> 
                  : null}
                  
                  <div 
                    style={{
                      // overflow: 'auto',
                      overflowY: 'scroll',
                      // scrollbarWidth: 'thin',
                      maxHeight: '60vh',
                      height: '100%',
                      borderRadius: 5,
                      border: `solid 1px white`
                      // display: 'table-row',
                      // position: 'relative',
                      // height: 'auto',
                      // minHeight: '100%' 
                      // flexGrow: 1
                    }}
                  >
                    { !transactionAvailable ?
                      (<h5 style={{padding: 5}}>Your selected NFTs will appear here</h5> )
                    : null} 
                  {
                    allNfts.map((token,i) => {
                     
                      return (
                        <MiniMetaPlexNftCard 
                          token={token} 
                          selectionNumber={i} 
                          style={{
                            ...style, 
                            marginLeft: 10,
                            display: token.selected ? "flex" : 'none'
                          }}
                          key={i}
                        />
                      )
                    })
                  }
                  </div>
                </div>
            
    </div>
  )
}