import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { NextPage } from "next";
import { ChangeEventHandler, useState } from "react"
import BulkSelfForm from "./BulkSelfForm";
import {FileQuery} from '../common/Input';
import OffChainMetadata from "../../types/OffChainMetadata";
import { PublicKey, Signer, Transaction, sendAndConfirmRawTransaction } from "@solana/web3.js";
import { SelfDropFormQuery } from "./Single";
import { createAndMintArtnNftTransaction } from "../../scripts/createAndMintNftTransaction";
import Backdrop from "../common/Backdrop";
import { createCollectionTx } from "../../scripts/createCollectionTx";
import { addItemToCollectionInstruction } from "../../instructions";

export interface BulkDropFormQuery {
  file: FileQuery,
  resaleFee: string,
  mintOption: "creatorIndividual" | "creatorCollection" | "buyer" | "buyerStore",
  collection: boolean,
  collectionName: string,
  collectionUrl: string,
  salePrice: string
  imageUrl: String
}

export interface BulkDropFormErrors extends Omit<BulkDropFormQuery, "file" | "mintOption" | 'collection'> {
  file: string,
  form: string,
}

export interface StoreQuery extends SelfDropFormQuery {
  price: number;
}

const stepMaps = {creatorIndividual: 4, creatorCollection: 5, buyer: 8, buyerStore: 8}

const BulkSelfService: NextPage = () => {
  const {connection} = useConnection()
  const {publicKey, sendTransaction, signAllTransactions} = useWallet();
  const [query, setQuery] = useState<BulkDropFormQuery>({
    file: {url: ""},
    resaleFee: "",
    mintOption: "creatorIndividual",
    collection: false,
    collectionName: "",
    collectionUrl: '',
    salePrice: '',
    imageUrl: '',
  })
  const [errors, setError] = useState<BulkDropFormErrors>({
    file: "",
    resaleFee: "",
    form: "",
    collectionName: '',
    collectionUrl: '',
    salePrice: '',
    imageUrl: '',
  })
  const [loading, setLoading] = useState(false);
  const [submitDetails, setSubmitDetails] = useState({description: ""})

  const updateSubmit = (description: string) => {
    setSubmitDetails({
      description
    })
  }

  const onSubmit = async() => {
    
    setSubmitDetails({
      description: `(1/${stepMaps[query.mintOption]}) Processing Json File`,
    })
    setLoading(true);

    const reader = new FileReader();
    let data: SelfDropFormQuery[] = []
    reader.addEventListener("load", e => {
      data = JSON.parse(reader.result as string);
      console.log(data);

      switch (query.mintOption) {
        case 'creatorIndividual':
          processIndividualMints(data);
          return;
        case 'creatorCollection':
          processCollectionMints(data);
          return;
        case 'buyer':
          return;
        case 'buyerStore' :
          return;
        default: 
          alert("error: bad mint option")
          return;
      }
    })

    if (!query.file.file) {
      alert("file missing");
      return;
    }

    reader.readAsText(query.file.file);

  }

  const processIndividualMints = async (data: SelfDropFormQuery[]) => {
     // step 2: create a transaction for each NFT creating the mint nft token account and minting
    updateSubmit(`(2/${stepMaps[query.mintOption]}) processing NFT (0/${data.length})`)

    const txs: Transaction[] = []
    const mintSigners: Signer[] = []

    const programId = process.env.NEXT_PUBLIC_REEMETA_PROGRAM_ID;
    if (!programId) {
      alert("Program ID error contact support.");
      setLoading(false);
      return;
    }
    if (!publicKey) {
      alert("You've been logged out. reconnect wallet");
      setLoading(false)
      return;
    }
    const {blockhash, lastValidBlockHeight} = await connection.getLatestBlockhash('finalized');
    for (let i = 0; i < data.length; i++) {
      const nft = data[i];
      updateSubmit(`(2/${stepMaps[query.mintOption]}) processing NFT (${i+1}/${data.length})`)
      const {mintKeys, tokenAccount, tx} = await createAndMintArtnNftTransaction(
        connection,
        publicKey,
        new PublicKey(programId),
        {
          name: nft.name,
          symbol: nft.symbol,
          uri: nft.uri,
          resaleFee: parseInt(query.resaleFee)
        },
        5
      )
      console.log(`tx ${i} created`)
      tx.recentBlockhash = blockhash;
      tx.lastValidBlockHeight = lastValidBlockHeight;
      tx.feePayer = publicKey;
      tx.partialSign(mintKeys);
      txs.push(tx);
    }

    // step 3: have the user sign all the transactions.
    updateSubmit(`(3/${stepMaps[query.mintOption]}) requesting signature`)
    if(!signAllTransactions) {
      alert("unsupported wallet")
      setLoading(false);
      return;
    }

    
    const signedTxs = await signAllTransactions(txs);
    console.log('test');

    // step 5: send and confirm each transaction
    const sigs = []
    for (let i = 0; i < signedTxs.length; i++) {
      updateSubmit(`4/${stepMaps[query.mintOption]} Sending and confirming transaction ${i+1}/${signedTxs.length}`)
      const sig = await connection.sendRawTransaction(signedTxs[i].serialize())
      // do we have to wait for each transaction to confirm? or can we submit them 
      // all one by one and due to the correct access rights they should be confirmed in order?
      // otherwise this could cause a large rpc hit...
      await connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature: sig
      })
      sigs.push(sig)
    }
    updateSubmit("complete!");
    setLoading(false);
    console.log(sigs)
  }

  const processCollectionMints = async (data: SelfDropFormQuery[]) => {
    let programId = process.env.NEXT_PUBLIC_REEMETA_PROGRAM_ID;
    let collectionProgramId = process.env.NEXT_PUBLIC_REECOLLECTION_PROGRAM_ID
    if (!programId || !collectionProgramId) {
      alert("Program ID error contact support.");
      setLoading(false);
      return;
    }
    if (!publicKey) {
      alert("You've been logged out. reconnect wallet");
      setLoading(false)
      return;
    }

    updateSubmit(`2/${stepMaps[query.mintOption]} creating collection transaction`)
    
    const {blockhash, lastValidBlockHeight} = await connection.getLatestBlockhash('finalized');
    const txs: Transaction[] = [];
    const [createColTx, collectionPda] = await createCollectionTx(
      new PublicKey(collectionProgramId),
      query.collectionName,
      query.collectionUrl,
      publicKey,
    )
    createColTx.feePayer = publicKey;
    createColTx.recentBlockhash = blockhash;
    createColTx.lastValidBlockHeight = lastValidBlockHeight;

    txs.push(createColTx);

    for (let i = 0; i < data.length; i++){
      updateSubmit(`3/${stepMaps[query.mintOption]} processing NFT (${i+1}/${data.length})`)
      const nft = data[i]
      const {mintKeys, tokenAccount, tx} = await createAndMintArtnNftTransaction(
        connection,
        publicKey,
        new PublicKey(programId),
        {
          name: nft.name,
          symbol: nft.symbol,
          uri: nft.uri,
          resaleFee: parseInt(query.resaleFee)
        },
        5,
        collectionPda,
      )

      tx.add(addItemToCollectionInstruction(
        {
          programId: new PublicKey(collectionProgramId),
          collectionPda,
          payer: publicKey,
          uploader: publicKey,
          toAdd: mintKeys.publicKey,
        },
        // TODO allow self service user to add attributes or pull from the json file.
        {
          attributes: []
        }
      ))

      tx.recentBlockhash = blockhash;
      tx.lastValidBlockHeight = lastValidBlockHeight;
      tx.feePayer = publicKey;
      tx.partialSign(mintKeys);
      txs.push(tx);
    }

    console.log('transactions', txs.length)
    updateSubmit(`4/${stepMaps[query.mintOption]} requesting signature`)
    if (!signAllTransactions) {
      alert("Unsupported wallet");
      setLoading(false);
      return;
    }

    const signedTxs = await signAllTransactions(txs);
    console.log(signedTxs.length);

    // for (let i = 0; i < signedTxs.length; i++) {
    //   const res = await connection.simulateTransaction(signedTxs[i])
    //   if (res.value.err) {
    //     console.log(res.value);
    //     continue;
    //   }
    //   console.log(i);
    //   console.log(res.value);
    // }

    const sigs = []
    for (let i = 0; i < signedTxs.length; i++) {
      updateSubmit(`5/${stepMaps[query.mintOption]} sending and confirming transactions ${i+1}/${signedTxs.length}`)
      const sig = await connection.sendRawTransaction(signedTxs[i].serialize())
      await connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature: sig
      })
      sigs.push(sig);
    }
    updateSubmit("Complete")
    setLoading(false);
    console.log(sigs);    

  }

    // buyer minting
    // step 2: create an authority keypair
    // step 3: create the ReeCollection account
    // step 4: create an NFT deposit transaction.
    // step 5: sign the transactions
    // step 6: submit the transaction
    // step 7: upload collection data to server.
    // step 8: upload the nfts to the server. 

  const onUpdate = (field: string, value: string): void => {
    setQuery({
      ...query,
      [field]: value
    })
  }

  const onFileChange:ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files || e.target.files.length < 1) {
      return setQuery({
        ...query,
        file: {url: ''}
      })
    }
    setQuery({
      ...query,
      file: {file: e.target.files[0], url: URL.createObjectURL(e.target.files[0])}
    })
  }

  return (
    <div className="container mx-auto mt-8 items-center">
      <Backdrop 
        showBackdrop={loading}
        showLoading
        message={submitDetails.description}
      />
      <h1 className="text-4xl font-bold">
        Self Service Bulk Creation
      </h1>
      <BulkSelfForm 
        query={query} 
        error={errors} 
        loading={loading} 
        onSubmit={onSubmit}
        onUpdate={onUpdate}
        onFileChange={onFileChange}
      />
    </div>
  )


}

export default BulkSelfService;