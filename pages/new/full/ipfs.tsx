import { sendTransaction } from "@metaplex/js/lib/actions";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { create } from "ipfs-http-client";
import { NextPage } from "next";
import { Fragment, useState } from "react";
import Overlay from "../../../components/common/Overlay";
import FullServiceForm from "../../../components/FullService/FullServiceForm";
import { CreateArtNftData } from "../../../instructions";
import { createAndMintArtNftTransaction } from "../../../scripts/createAndMintNftTransaction";
import { createMetadataJsonFile } from "../../../scripts/createMetadataJson";
import { REEMETA_PROGRAM_ID } from "../../../statics/programIds";
import { initialURoyaltyArtQuery, URoyaltyArtQuery } from "../../../types/UploadTypes";
import { NftMintData } from "../../nft/upload";

// move this upload to nextJS api
const infuraPID = "2GZwTXjCCFKzCg7riw5RfmzibnI"
const infuraSecret = "7a97e70a8dd26715272a055448cf4d2c"

interface FailedIpfsUpload {
  result: false,
  data: {
    message: string,
  }
}

interface SuccessIpfsUpload {
  result: true,
  data: CreateArtNftData
}

const Ipfs: NextPage = () => {
  const {connection} = useConnection()
  const wallet = useWallet();
  const ipfsClient = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: `Basic ${Buffer.from(infuraPID + ":" + infuraSecret).toString('base64')}`
    }
  })
  const [uploading, setUploading] = useState(false);
  const [overlayMessage, setOverlayMessage] = useState("");

  const onSubmit = async (nft: URoyaltyArtQuery): Promise<boolean> => {
    setUploading(true);
    setOverlayMessage('1/6 Processing Form')
    if (!wallet || !wallet.publicKey) {
      alert("Reconnect your wallet");
      setUploading(false);
      return false;
    } 

    const {result, data} = await uploadToIpfs(nft);

    if (!result) {
      alert(data.message);
      setUploading(false);
      return false;
    }

    setOverlayMessage("4/6 creating NFT Mint Transaction")
    const {mintKeys, tx} = await createAndMintArtNftTransaction(
      connection,
      wallet.publicKey,
      wallet.publicKey,
      REEMETA_PROGRAM_ID,
      data,
      7
    )

    const {blockhash, lastValidBlockHeight} = await connection.getLatestBlockhash('finalized');

    setOverlayMessage("5/6 Getting Signature")
    const signature = await wallet.sendTransaction(
      tx,
      connection,
      {
        signers: [mintKeys]
      }
    )

    setOverlayMessage("6/6 Confirming Transaction")
    await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature
    })

    console.log(signature);
    setOverlayMessage("Complete");

    alert("NFT Minted");
    setUploading(false);
    return true;
  }

  const uploadToIpfs = async (nft: URoyaltyArtQuery): Promise<FailedIpfsUpload | SuccessIpfsUpload> => {
    if (!wallet || !wallet.publicKey) {
      return {result: false, data:{ message: "Log into your wallet"}}
    }
    if (!nft.img.file) {
      return {result: false, data:{ message: "No image selected"}}
    }

    try {
      setOverlayMessage("2/6 Uploading Image to IPFS")

      const imgFileIpfs = await ipfsClient.add(nft.img.file);
      const imageIpfsUrl = `https://ipfs.io/ipfs/${imgFileIpfs.path}`

      const metadataJson = createMetadataJsonFile({
        ...nft,
        img: {...nft.img, url: imageIpfsUrl},
      });

      console.log(metadataJson);

      setOverlayMessage("3/6 Uploading OffChain NFT data to IPFS")
      const metadataIpfs = await ipfsClient.add(metadataJson);
      const metadataIpfsUrl = `https://ipfs.io/ipfs/${metadataIpfs.path}`;

      return {
        result: true,
        data: {
          name: nft.name,
          symbol: nft.name,
          uri: metadataIpfsUrl,
          resaleFee: parseInt(nft.resaleFee)
        }
      }


    } catch (error: Error | any) {
      if (error instanceof Error) {
        alert(error.message);
        console.log(error.message);
        setUploading(false);
        return {result: false, data:{message: "IPFS error: " + error.message}}
      }
      return {result: false, data: {message: `${error}`}}
    }

  }

  return (
    <Fragment>
      <Overlay active={uploading}>
        <p className="text-white text-xl">{overlayMessage}</p>
      </Overlay>
      <FullServiceForm 
        submit={onSubmit} 
      />
    </Fragment>
  )
}

export default Ipfs;