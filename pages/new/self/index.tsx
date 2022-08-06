import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { NextPage } from "next";
import { FormEventHandler, useState } from "react";
import SelfDocumentation from "../../../components/SelfService/Documentation";
import SelfDropForm from "../../../components/SelfService/SelfDropForm";
import { createAndMintArtnNftTransaction } from "../../../scripts/createAndMintNftTransaction";

export interface SelfDropFormQuery {
  name: string,
  symbol: string,
  uri: string,
  resaleFee: string,
}

export interface SelfDrpoFormErrors extends SelfDropFormQuery {
  form: string
}

const SelfService: NextPage = () => {
  const {connection} = useConnection();
  const {publicKey, sendTransaction, signTransaction, signAllTransactions} = useWallet();

  const [query, setQuery] = useState<SelfDropFormQuery>({
    name: "",
    symbol: "",
    uri: "",
    resaleFee: ""
  })
  const [error, setError] = useState<SelfDrpoFormErrors>({
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
      return;
    }
    if (!publicKey) {
      alert("You've been logged out. reconnect wallet");
      return;
    }
    const {mintKeys, tokenAccount, tx} = await createAndMintArtnNftTransaction(
      connection,
      publicKey,
      new PublicKey(programId),
      {
        name: query.name,
        symbol: query.symbol,
        uri: query.uri,
        resaleFee: parseInt(query.resaleFee)
      }
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
    <div className="container mx-auto mt-8">
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
      <SelfDocumentation />
    </div>

  )
}

export default SelfService;