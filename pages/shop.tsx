import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { createAssociatedTokenAccountInstruction, getAssociatedTokenAddress } from "@solana/spl-token2";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import ArtNftEscrowItem from "../components/Bazar/ArtNftEscrowItem";
import { completeEscrowInstruction } from "../instructions";
import { getAllReeEscrowContracts } from "../scripts/escrowQueries";
import { REEMETA_PROGRAM_ID, REE_ESCROW_PROGRAM_ID } from "../statics/programIds";
import { Escrow } from "../types/Escrow";
import { NftMetadata } from "../types/NftMetadata";
import { RoyaltyArt } from "../types/RoyaltyArt";

interface Item {
  escrowPda: PublicKey,
  escrow: Escrow,
  metadata: NftMetadata
}

const Shop: NextPage = () => {

  const wallet = useWallet();
  const {connection} = useConnection();

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEscrows = useCallback(async() => {
    const result = await getAllReeEscrowContracts(connection);
    const escrowMetadataAccounts = await connection.getMultipleAccountsInfo(
      result.map(item => item.data.assetMetadata)
    )
    const escrows: (Item)[] = escrowMetadataAccounts
      .map((account, index) => {
        if (!account) {
          return null;
        } 
        const metadata = NftMetadata.decode(account.data)
        return {escrowPda: result[index].pubkey, escrow: result[index].data, metadata}
      })
      .filter((item): item is Item => item != null)
    console.log(result);
    setItems(escrows);
    setLoading(false)
  }, [connection])

  useEffect(() => {
    setLoading(true);
    fetchEscrows();
  }, [fetchEscrows])

  const buyNft = async (escrow: Escrow, pubkey: PublicKey, metadata: RoyaltyArt) => {
    if (!wallet || !wallet.publicKey) {
      alert("Connect wallet")
      return 
    }

    const buyerTokenAccount = await getAssociatedTokenAddress(
      escrow.assetMint,
      wallet.publicKey,
      false,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    )

    const ataIx = createAssociatedTokenAccountInstruction(
      wallet.publicKey,
      buyerTokenAccount,
      wallet.publicKey,
      escrow.assetMint,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    )

    console.log(metadata.decodeRoyalties())
    
    const ix = completeEscrowInstruction(
      REE_ESCROW_PROGRAM_ID,
      REEMETA_PROGRAM_ID,
      pubkey,
      wallet.publicKey,
      escrow.assetMetadata,
      escrow.assetHoldingAccount,
      escrow.seller,
      buyerTokenAccount,
      escrow.expectedAmount.toNumber(),
      metadata.decodeRoyalties().map(royalty => royalty.pubkey),
    )

    const tx = new Transaction().add(ataIx).add(ix);
    const {blockhash, lastValidBlockHeight} = await connection.getLatestBlockhash('finalized');

    tx.recentBlockhash = blockhash;
    tx.lastValidBlockHeight = lastValidBlockHeight;
    tx.feePayer = wallet.publicKey;

    const sig = await wallet.sendTransaction(
      tx,
      connection,
      {skipPreflight: true}
    )

    await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature: sig
    })

    console.log(sig);

    fetchEscrows()

  }

  const displayShop = () => {
    return items.map(item => 
      <ArtNftEscrowItem 
        escrow={item.escrow} 
        nft={item.metadata as NftMetadata<RoyaltyArt>}
        pubkey={item.escrowPda}
        onBuy={buyNft}
        key={item.escrowPda.toString()}
        buyable={
          wallet.publicKey && !item.escrow.seller.equals(wallet.publicKey) ? 
           true : false
        }
      />
    )
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl self-center my-4">Shop Nfts</h1>
      <div className="flex-row flex-wrap justify-evenly">
        {displayShop()}
      </div>
    </div>
  )
}

export default Shop