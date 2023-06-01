import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { NextPage } from "next";
import { ChangeEventHandler, useContext, useState } from "react"
import BulkSelfForm from "./BulkSelfForm";
import {FileQuery} from '../common/Input';
import OffChainMetadata from "../../types/OffChainMetadata";
import { PublicKey, Signer, Transaction, sendAndConfirmRawTransaction, Keypair } from "@solana/web3.js";
import { SelfDropFormQuery } from "./Single";
import { createAndMintArtNftTransaction } from "../../scripts/createAndMintNftTransaction";
import Backdrop from "../common/Backdrop";
import { createCollectionTx } from "../../scripts/createCollectionTx";
import { addItemToCollectionInstruction } from "../../instructions";
import { DROPOPAPIHOST, REECOLLECTION_PROGRAM_ID, REEMETA_PROGRAM_ID } from "../../statics/programIds";
import { CollectionNft } from "../../types/WalletCollection";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import base58 from "bs58";
import { DropCollection } from "../../types/DropCollection";
import { DropStore, DropStoreData, DropStoreItem, DropStoreItemData } from "../../types/DropStore";
import { addUploaderInstruction } from "../../instructions/reeCollection/addUploaderInstruction";

export interface BulkDropFormQuery {
  file: FileQuery,
  resaleFee: string,
  mintOption: "creatorIndividual" | "creatorCollection" | "buyer" | "buyerStore" | "TCG",
  collection: boolean,
  collectionName: string,
  collectionUrl: string,
  priceOption: "flat" | "file" | "dynamic",
  salePrice: string
  imageUrl: String
}

export interface BulkDropFormErrors extends Omit<BulkDropFormQuery, "file" | "mintOption" | 'collection' | 'priceOption'> {
  file: string,
  form: string,
}

export interface StoreQuery extends SelfDropFormQuery {
  price: number;
}

const stepMaps = {creatorIndividual: 4, creatorCollection: 5, buyer: 8, buyerStore: 9, TCG: 8}

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
    priceOption: "flat",
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
  const {token, authenticateWallet } = useContext(AuthContext)

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
          processStoreCreation(data);
          return;
        case "TCG":
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
      const {mintKeys, tx} = await createAndMintArtNftTransaction(
        connection,
        publicKey,
        publicKey,
        REEMETA_PROGRAM_ID,
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
    let programId = REEMETA_PROGRAM_ID;
    let collectionProgramId = REECOLLECTION_PROGRAM_ID;
    if (!publicKey) {
      alert("You've been logged out. reconnect wallet");
      setLoading(false)
      return;
    }

    updateSubmit(`2/${stepMaps[query.mintOption]} creating collection transaction`)
    
    const {blockhash, lastValidBlockHeight} = await connection.getLatestBlockhash('finalized');
    const txs: Transaction[] = [];
    const [createColTx, collectionPda] = await createCollectionTx(
      collectionProgramId,
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
      const {mintKeys, tx} = await createAndMintArtNftTransaction(
        connection,
        publicKey,
        publicKey,
        REEMETA_PROGRAM_ID,
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

  const processStoreCreation = async (data: SelfDropFormQuery[]) => {
    let collectionProgramId = REECOLLECTION_PROGRAM_ID;

    if (!publicKey) {
      alert("You've been loggd out. reconnect wallet");
      setLoading(false);
      return;
    }

    updateSubmit(`2/${stepMaps[query.mintOption]} creating collection transaction`);

    const collectionUrlFriendlyName = query.collectionName.trim().replace(/\W/g, "_").toLowerCase();

    const [createColTx, collectionPda] = await createCollectionTx(
      collectionProgramId,
      collectionUrlFriendlyName,
      query.collectionUrl,
      publicKey,
    )
    // TODO: add another instruction to add the server authority as uploader and publisher.

    // create server side collection 


    const serverCollectionData = {
      pda: collectionPda.toString(),
      urlName: collectionUrlFriendlyName,
      owner: publicKey.toString(),
      name: query.collectionName,
      shortDescription: "Placeholder data",
      detailedDescription: "Placeholder Text",
      headerImage: query.imageUrl,
      needAuth: true,
    }

    updateSubmit(`3/${stepMaps[query.mintOption]} Getting Server Authentication Token`);
    let activeToken = token;
    if (!token) {
      activeToken = await authenticateWallet();
      if (activeToken === "") {
        alert("Failed to authenticate wallet")
        setLoading(false);
        return;
      }
      console.log(activeToken);
    }

    updateSubmit(`4/${stepMaps[query.mintOption]} Creating Collection`);

    const res = await axios.post<{_id: string, authPubkey: string}>(
      `${DROPOPAPIHOST}/collections`, 
      serverCollectionData,
      {
        headers: {
          "drop-token": activeToken,
        }
      }
    )

    // create the store
    const storeData: DropStoreData = {
      collect: res.data._id,
      kind: 0,
    }

    if (query.priceOption === 'flat') {
      storeData.price = parseInt(query.salePrice);
    }

    updateSubmit(`5/${stepMaps[query.mintOption]} Creating Buyer Minting Store`);

    const storeRes = await axios.post<DropStore>(
      `${DROPOPAPIHOST}/stores/id/${res.data._id}`,
      storeData,
      {
        headers: {
          "drop-token": activeToken
        }
      }
    )

    // upload nfts;

    updateSubmit(`6/${stepMaps[query.mintOption]} Processing Nft Data for Store`);

    const itemsList: DropStoreItemData[] = data.map(item => {
      const itemData: DropStoreItemData = {
        store: storeRes.data._id,
        price: 0,
        style: "Self",
        name: item.name,
        symbol: item.symbol,
        resaleFee: parseInt(item.resaleFee),
        jsonUrl: item.uri,
      }
      switch (query.priceOption) {
        case "dynamic" :
          break;
        case "flat":
          itemData.price = parseInt(query.salePrice);
          break;
        case "file":
          if (!item.price) {
            alert("Import file missing price. add price or change to Flat pricing");
            throw new Error("Import File error");
          }
          itemData.price = item.price;
      }
      return itemData;
    })

    // upload items
    updateSubmit(`7/${stepMaps[query.mintOption]} submitting Nfts to Server`);

    const finalRes = await axios.post(
      `${DROPOPAPIHOST}/items/${storeRes.data._id}`,
      itemsList,
      {
        headers: {
          "drop-token": activeToken,
        }
      }
    )

    const addUploader = addUploaderInstruction(
      {
        programId: REECOLLECTION_PROGRAM_ID,
        collectionPda: collectionPda,
        payer: publicKey,
        publisher: publicKey,
        newUploader: new PublicKey(res.data.authPubkey)
      }
    )
    
    const {blockhash, lastValidBlockHeight} = await connection.getLatestBlockhash('finalized');

    createColTx.add(addUploader);
    createColTx.feePayer = publicKey;
    createColTx.lastValidBlockHeight = lastValidBlockHeight;
    createColTx.recentBlockhash = blockhash;

    updateSubmit(`8/${stepMaps[query.mintOption]} Requesting collecion transaction signature`);

    const sig = await sendTransaction(
      createColTx,
      connection,
      {skipPreflight: true}
    )

    updateSubmit(`9/${stepMaps[query.mintOption]} Submitting Transaction`);

    await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature: sig
    })

    console.log(sig);

    updateSubmit(`Completed`);
    setLoading(false);
    // setQuery(defalutQ)
  }

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