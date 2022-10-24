import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import axios, { AxiosError } from "axios";
import base58 from "bs58";
import { useEffect, useState, FC, useContext, useCallback, isValidElement } from "react";
import { addItemToCollectionInstruction, CreateArtNftData, createArtNftInstruction, createMintInstruction } from "../../instructions";
import { nftTransactionInstruction } from "../../instructions";
import { AddCollectionApiArgs, ResponseData } from "../../pages/api/addCollection";
import { DataRequest, MessageRes } from "../../pages/api/purchased";
import { createAndMintArtNftTransaction } from "../../scripts/createAndMintNftTransaction";
import { getMetadataPda } from "../../scripts/getMetadataPda";
import { DROPOPAPIHOST, REECOLLECTION_PROGRAM_ID, REEMETA_PROGRAM_ID, REE_SHARE_ADDRESS } from "../../statics/programIds";
import { DropCollection } from "../../types/DropCollection";
import { DropStoreItem } from "../../types/DropStore";
import Backdrop from "../common/Backdrop";
import { AuthContext } from "../providers/AuthProvider";
import StoreItem from "./StoreItem";

const Store: FC<{collection: DropCollection, owner: PublicKey, storeId: string}> = (
  {collection, storeId, owner}
) => {
  const [items, setItems] = useState<DropStoreItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [purchaseingDetails, setPurchasingDetails] = useState("");
  const PURCHASING_STEPS = 4;
  const wallet = useWallet();
  const {connection} = useConnection();
  const {signMessage, nonce} = useContext(AuthContext)

  const getStoreItems = useCallback(async () => {
    
    const url = `${DROPOPAPIHOST}/items/id/${storeId}`
    const res = await axios.get<DropStoreItem[]>(url);
    setItems(res.data);
    setLoading(false);
  }, [storeId])
  
  useEffect(() => {
    setLoading(true);
    getStoreItems();
  }, [getStoreItems])

  if (loading) {
    return (
      <div className="container mx-auto">
        <h1>Loading...</h1>
      </div>
    )
  }

  const timestamp = new Date().getTime();

  const canPurchase = async (nft: DropStoreItem, mint: PublicKey, pdaAddress: PublicKey): Promise<boolean> => {
    if (!wallet || !wallet.publicKey) {
      alert("Connect your wallet to purchase NFT");
      return false;
    }
    const sig = await signMessage(
      "POST",
      `/api/items/startPurchase/${nft._id}`,
      "Sign message to lock NFT for purchase",
      timestamp
    )

    if (!sig) {
      alert("Failed to sign message");
      return false;
    }

    try {
      const res = await axios.post(
        `${DROPOPAPIHOST}/items/startPurchase/${nft._id}`,
        {
          pdaAddress
        },
        {
          headers: {
            "drop-pubkey": wallet.publicKey.toBase58(),
            "drop-nonce": nonce,
            "drop-signature": base58.encode(sig),
            "drop-timestamp": timestamp,
            "drop-usertext": "Sign message to lock NFT for purchase",
          }
        }
      )
      return true;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const err = e as AxiosError<{type: "auth" | "race" | "purchased", message: string}>;
        switch (err.response?.data.type) {
          case "auth":
            alert("Signature error. You must sign the auth message in order to lock the nft to your wallet during the purchasing process.")
            return false;
          case "race":
            alert("Someone is currently attempting to purchase this NFT. It is currently locked while they attempt to mint it.\nPlease select another or try again in a few minutes.")
            return false;
          case "purchased":
            alert("This NFT was recently purchased by another. Reload the store for updated availability.")
            return false;
        }
      }
      alert("Server Error");
      return false;
    }
  }

  const purchaseNft = async (nft: DropStoreItem) => {
    console.log(collection); 
    console.log(nft.price);
    setPurchasingDetails(`1/${PURCHASING_STEPS} initializing purchase`)
    setPurchasing(true);
    if (!wallet || !wallet.publicKey) {
      alert("Connect your wallet to purchase NFT");
      setPurchasing(false);
      return;
    }

    // TODO: inform server of the attepmt to mint locking the nft.

    const nftData: CreateArtNftData = {
      name: "",
      symbol: "",
      uri: "",
      resaleFee: 5,
    }

    if (nft.style === "Self") {
      nftData.name = nft.name;
      nftData.symbol = nft.symbol;
      nftData.uri = nft.jsonUrl as string;
      nftData.resaleFee = 5
    } else {
      // TODO add full service data to the nft data and upload the data to storage
      // system.
    }

    // send alert to the server that a purchase is being attempted 
    // get nft pda
    setPurchasingDetails(`2/${PURCHASING_STEPS} creating transaction`)
    const {mintKeys, metadataPda, tx} = await createAndMintArtNftTransaction(
      connection,
      wallet.publicKey,
      owner,
      REEMETA_PROGRAM_ID,
      nftData,
      5,
      new PublicKey(collection.pda)
    )

    setPurchasingDetails(`3/${PURCHASING_STEPS} confirming NFT is available for purchase`)

    const isPurchasable = await canPurchase(nft, mintKeys.publicKey, metadataPda)
    if (!isPurchasable) {
      setPurchasing(false);
      return;
    }

    const paymentIx = nftTransactionInstruction(
      REEMETA_PROGRAM_ID,
      wallet.publicKey,
      metadataPda,
      owner,
      nft.price,
      [owner, REE_SHARE_ADDRESS]
    )

    tx.add(paymentIx)    
    
    const {blockhash, lastValidBlockHeight} = await connection.getLatestBlockhash('finalized');

    tx.recentBlockhash = blockhash;
    tx.lastValidBlockHeight = lastValidBlockHeight;
    tx.feePayer = wallet.publicKey;

    const addCollectionArgs: AddCollectionApiArgs = {
      buyer: wallet.publicKey.toString(),
      itemPda: metadataPda.toString(),
      collectionId: collection._id,
      transaction: base58.encode(tx.serialize({verifySignatures: false})),
      itemId: nft._id,
    }

    

    const result = await axios.post<ResponseData>('/api/addCollection', addCollectionArgs)

    if (!result.data.tx) {
      alert("Add do collection ix failed");
      console.log(result.data.message);
      console.log(result.data.type);
      setPurchasing(false);
      return;
    }
 
    const finalTx = Transaction.from(base58.decode(result.data.tx));

    finalTx.partialSign(mintKeys);

    // const addToColSig = finalTx.signatures[0];

    // if (!addToColSig.signature) {
    //   alert("Add to collection Signature missing");
    // }

    // tx.add(finalTx.instructions[0]);
    // tx.addSignature(finalTx.signatures[0].publicKey, finalTx.signatures[0].signature);

    console.log('lengt', finalTx.serialize.length);

    // create the add nft to collection ix.
    setPurchasingDetails(`4/${PURCHASING_STEPS} requesting signature`)
    const signature = await wallet.sendTransaction(
      finalTx, 
      connection,
      // {skipPreflight: true}
    );

    setPurchasingDetails(`5/${PURCHASING_STEPS} confirming transaction`)
    await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature
    })

    
    //TODO: remove the purchased nft from database.
    
    const nftResult = await axios.post<MessageRes>("/api/purchased", {
      buyer: wallet.publicKey,
      pda: metadataPda.toString(),
      itemId: nft._id,
      mint: mintKeys.publicKey.toString(),
      signature: signature
    });
    getStoreItems();

    setPurchasingDetails(`Purchase Complete`)
    
    // will be able to use nftResult to go to the view NFT page.
 
    setPurchasing(false);
  }

  const displayStore = () => {
    return items.map((item) => <StoreItem storeItem={item} key={item._id} onPurchase={purchaseNft} />)
  }

  return (
    <div className="container mx-auto">
      <Backdrop 
        showBackdrop={purchasing}
        showLoading
        message={purchaseingDetails}
      />
      <h1 className="text-xl">Mint a New NFT</h1>
      <h2>Be the initial owner of one of these new NFTS directly from the creator.</h2>
      <div className="flex-row flex-wrap justify-evenly">
        {displayStore()}
      </div>
    </div>
  )
}

export default Store;