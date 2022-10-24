import { NextPage } from "next";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useState } from "react";
import SelfDropForm from "../../components/SelfService/SelfDropForm";
import { createAndMintArtNftTransaction } from "../../scripts/createAndMintNftTransaction";
import { REEMETA_PROGRAM_ID } from "../../statics/programIds";

export interface SelfDropFormQuery {
  name: string,
  symbol: string,
  uri: string,
  resaleFee: string,
  price?: number,
}

export interface SelfDropFormErrors extends SelfDropFormQuery {
  form: string
}

const SingleSelfService: NextPage = () => {
  const {connection} = useConnection();
  const {publicKey, sendTransaction, signTransaction, signAllTransactions} = useWallet();

  const [query, setQuery] = useState<SelfDropFormQuery>({
    name: "",
    symbol: "",
    uri: "",
    resaleFee: ""
  })
  const [error, setError] = useState<SelfDropFormErrors>({
    name: "",
    symbol: "",
    uri: "",
    resaleFee: "",
    form: "",
  })
  const [loading, setLoading] = useState(false);
  
  const onSubmit = async () => {
    setLoading(true);
    const programId = process.env.NEXT_PUBLIC_REEMETA_PROGRAM_ID;
    if (!programId) {
      alert("Program ID error contact support.");
      setLoading(false)
      return;
    }
    if (!publicKey) {
      alert("You've been logged out. reconnect wallet");
      setLoading(false)
      return;
    }
    const {mintKeys, tx} = await createAndMintArtNftTransaction(
      connection,
      publicKey,
      publicKey,
      REEMETA_PROGRAM_ID,
      {
        name: query.name,
        symbol: query.symbol,
        uri: query.uri,
        resaleFee: parseInt(query.resaleFee)
      },
      5
    )
    
    const {blockhash, lastValidBlockHeight} = await connection.getLatestBlockhash('finalized');
    // tx.recentBlockhash = blockhash;
    // tx.partialSign(mintKeys);
    
    const signature = await sendTransaction(
      tx, 
      connection, 
      {
        // skipPreflight: true,
        signers: [mintKeys]
      }
    )


    await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature
    });

    console.log(signature);
    alert("NFT minted");
    setQuery({
      name: "",
      symbol: "",
      uri:"",
      resaleFee: "",
    })
    setLoading(false);

  }

  const onUpdate = (field: string, value: string): void => {
    setQuery({
      ...query,
      [field]: value
    })
  }

  return (
    <div className="container mx-auto mt-8 items-center">
      <h1 className="text-4xl font-bold">
        Self Service Drop Creation
      </h1>
      <SelfDropForm 
        query={query} 
        error={error}
        loading={loading} 
        onSubmit={onSubmit} 
        onUpdate={onUpdate}
      />
      
    </div>

  )
}

export default SingleSelfService;