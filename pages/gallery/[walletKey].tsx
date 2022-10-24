import { useRouter } from "next/router";
import { NextPage } from "next";
import Error from 'next/error';
import {useCallback, useEffect, useMemo, useState} from 'react';
import { PublicKey, Transaction } from "@solana/web3.js";
import { NftMetadata } from "../../types/NftMetadata";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { getWalletNftCollection } from '../../scripts/getWalletNftCollection';
import ArtNftCard from "../../components/Gallery/ArtNftCard";
import { RoyaltyArt } from "../../types/RoyaltyArt";
import { getEscrowAndHoldingKeys } from "../../types/Escrow";
import { REEMETA_PROGRAM_ID, REE_ESCROW_PROGRAM_ID } from "../../statics/programIds";
import { createEscrowInstruction } from "../../instructions";
import { getMetadataPda } from "../../scripts/getMetadataPda";
import { sendTransaction } from "@metaplex/js/lib/actions";
import { NATIVE_MINT } from "@solana/spl-token";

const WalletGallery: NextPage = () => {
  const router = useRouter();
  const walletKey = router.query.walletKey as string;
  const walletPubkey = useMemo(() => walletKey ? new PublicKey(walletKey) : null, [walletKey]);

  const [gallery, setGallery] = useState<{data: NftMetadata, tokenAccount: PublicKey}[]>([]);
  //TODO add walletkey accountdata state in case the wallet has an alias.
  const [loading, setLoading] = useState(true);
  const wallet = useWallet();
  const {connection} = useConnection();

  // useEffect(() => {
  //   if (!wallet || !wallet.publicKey) {
  //     setUserPubkey(null)
  //     return;
  //   }
  //   setUserPubkey(wallet.publicKey)
  // }, [wallet])

  const fetchGallery = useCallback(async() => {
    if (!walletPubkey) {
      return;
    }
    const collection = await getWalletNftCollection(walletPubkey, connection)
    setGallery(collection);
    setLoading(false);
  }, [walletPubkey, connection])

  useEffect(() => {
    setLoading(true);
    fetchGallery();
  }, [walletPubkey, connection, fetchGallery])

  const sellNft = async (nft: NftMetadata<RoyaltyArt>, tokenAccount: PublicKey, amount: number) => {
    // create an escrow.
    if (!wallet || !wallet.publicKey) {
      alert("Connect Wallet");
      return;
    }
    console.log(nft);
    console.log(nft.mint);
    const [escrowPda, holdingAccount] = await getEscrowAndHoldingKeys(
      REE_ESCROW_PROGRAM_ID,
      nft.mint,
      wallet.publicKey
    )


    const escrowIx = createEscrowInstruction(
      {
        programId: REE_ESCROW_PROGRAM_ID,
        reeMetaProgramId: REEMETA_PROGRAM_ID,
        escrowPda,
        assetMint: nft.mint,
        assetMetadata: await getMetadataPda(nft.mint, REEMETA_PROGRAM_ID),
        assetHoldingAccount: holdingAccount,
        seller: wallet.publicKey,
        payer: wallet.publicKey,
        sellerAssetAccount: tokenAccount,
        identifier: nft.collection ? nft.collection : NATIVE_MINT,
      },
      amount
    )

    const tx = new Transaction().add(escrowIx);
    
    const {blockhash, lastValidBlockHeight} = await connection.getLatestBlockhash('finalized');
    tx.feePayer = wallet.publicKey;
    tx.lastValidBlockHeight = lastValidBlockHeight;
    tx.recentBlockhash = blockhash;

    const sig = await wallet.sendTransaction(
      tx,
      connection,
      {skipPreflight: true}
    )

    await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature: sig,
    })

    console.log(sig);
    fetchGallery();
  }

  const displayGallery = () => {
    if (!gallery) {
      return (<p>This wallet does not own any REE NFTs.</p>)
    }

    return gallery.map(nft => 
      <ArtNftCard 
        nft={nft.data as NftMetadata<RoyaltyArt>} 
        tokenAccount={nft.tokenAccount}
        isOwner={walletPubkey ? wallet.publicKey?.equals(walletPubkey) : false} 
        sellNft={sellNft}
        key={nft.data.mint.toString()} 
      />
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto">
        <h1>loading...</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl self-center my-4">{walletKey} Owned NFTS Collection</h1>
      <div className="flex-row flex-wrap justify-evenly">
        {displayGallery()}
      </div>
    </div>
  )
}

export default WalletGallery;