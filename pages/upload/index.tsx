import { NextPage } from "next";
import { FormEventHandler, useEffect, useState } from "react";
import { FileQuery } from "../../components/common/Input";
import ImageUploadForm from "../../components/NftUploader/NftUploadForm";

import Backdrop from "../../components/common/Backdrop";

import { create } from 'ipfs-http-client'
import { createMetadataJson } from "../../scripts/createMetadataJson";
import { ArtNftUploadErrors, ArtNftUploadQuery, initialArtNftUploadQuery } from "../../types/ArtNft";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { createAndMintArtnNftTransaction } from "../../scripts/createAndMintNftTransaction";
import { PublicKey } from "@solana/web3.js";
import PreviewNft from "../../components/NftUploader/PreviewNft";
import Button from "../../components/common/Button";

const IPFS_GATEWAY_POST = process.env.NEXT_PUBLIC_IPFS_GATEWAY_POST
const IPFS_GATEWAY_GET = process.env.NEXT_PUBLIC_IPFS_GATEWAY_GET

const UploadPage : NextPage = () => {
  const ipfsClient = create({url: IPFS_GATEWAY_POST})
  const [ipfsIsOnline, setIpfsIsOnline] = useState(false)
  

  useEffect(() => {
    (async function checkIpfsStatus() {
      const isOnline = await ipfsClient.isOnline();
      console.log("IPFS Service is online: " + isOnline);
      setIpfsIsOnline(isOnline)
    })();
  }, [ipfsClient]);  
  

  const [query, setQuery] = useState<ArtNftUploadQuery>({
    ...initialArtNftUploadQuery,

    //UNCOMMENT THIS TO TEST WITH A PRE-FILLED FORM
    // name: "Test NFT 1",
    // symbol: "TEST",
    // description: "desc",
    // externalUrl: "dropopolis.com",
    // resaleFee: "5",
  })

  const [error, setError] = useState<ArtNftUploadErrors>({
    ...initialArtNftUploadQuery,
    form: "",
  })

  const [loading, setLoading] = useState(false);

  const [mintData, setMintData] = useState({
    name: '',
    symbol: '',
    uri: '',
    resaleFee: 0
  })

  const [backDropMessage, setBackDropMessage] = useState("Loading");

  const {connection} = useConnection();
  const {publicKey, sendTransaction} = useWallet();


  const onSubmit:FormEventHandler<Element> = async (e) => {
    e.preventDefault();
    const uploadSuccess = await uploadToIpfs()
    if (uploadSuccess) await mintNft()
  }

  const onUpdate = (field: string, value: string|FileQuery): void => {
    setQuery({
      ...query,
      [field]: value
    })
  }

  const mintNft = async () => {
    
    try {
        const programId = process.env.NEXT_PUBLIC_REEMETA_PROGRAM_ID;
        if (!programId) {
        alert("Program ID error contact support.");
        return;
        }
        if (!publicKey) {
        alert("You've been logged out. reconnect wallet");
        return;
        }
        setBackDropMessage("(3/5) - Building NFT Mint Transaction")
        const {mintKeys, tokenAccount, tx} = await createAndMintArtnNftTransaction(
            connection,
            publicKey,
            new PublicKey(programId),
            mintData,
            8
        )
        
        const {blockhash, lastValidBlockHeight} = await connection.getLatestBlockhash('finalized');
        // tx.recentBlockhash = blockhash;
        // tx.partialSign(mintKeys);
        
        setBackDropMessage("(4/5) - Waiting For Transaction Approval")
        const signature = await sendTransaction(
            tx, 
            connection, 
            {
                // skipPreflight: true,
                signers: [mintKeys]
            }
        )

        setBackDropMessage("(5/5) - Waiting For Transaction Completion")

        await connection.confirmTransaction({
            blockhash,
            lastValidBlockHeight,
            signature
        });

        console.log(signature);
        alert("NFT minted");

        setQuery({
            img: {url: ''},
            name: "",
            symbol: "",
            description: "",
            externalUrl: "",
            resaleFee: "",
            creators: [],
            attributes: [],
        })
        setLoading(false)

    } catch (error) {
        console.log(error);
        alert("An Error Occurred. See logs for details")
        setLoading(false)
    }
    
  }

  const uploadToIpfs = async ():Promise<boolean> => {
    if (!query.img.file || loading || !publicKey) return false;

    try {
        console.log('uploading ipfs');
        setBackDropMessage("(1/5) - Uploading NFT Image IPFS")
        setLoading(true)
        const imgFileIpfs = await ipfsClient.add(query.img.file)
        const imageIpfsUrl = `${IPFS_GATEWAY_GET}/${imgFileIpfs.path}`
        // alert('IPFS Image Upload Complete (1/2)')
        const metaDataJSON = createMetadataJson(
            {
                ...query,
                img: {...query.img, url: imageIpfsUrl},
                creators: [...query.creators, {address: publicKey.toString(), share: 100}]
            }
        )

        setBackDropMessage("(2/5) - Uploading NFT Metadata IPFS")
        const metaDataIpfs = await ipfsClient.add(metaDataJSON)
        // alert(`Metadata Upload Complete (2/2)`)
        const metadataIpfsUrl = `${IPFS_GATEWAY_GET}/${metaDataIpfs.path}`

        setMintData({
            name: query.name,
            symbol: query.symbol,
            uri: metadataIpfsUrl,
            resaleFee: parseInt(query.resaleFee)
        })
        console.log("Image IPFS URL:", imageIpfsUrl);
        console.log("Metadata IPFS URL:", metadataIpfsUrl);
        // console.log(imgFileIpfs);
        // console.log(metaDataIpfs);

        return true;
    
    } catch (error) {
        alert(error);
        console.log(error);
        setLoading(false)
        return false
    }

  };  

  if (!publicKey){ 
    return (
      <div className='items-center my-12'>
          <h1 className='mb-5 text-xl font-bold' >You must connect your wallet to create an NFT</h1>
          <div className="w-fit"> 
              <WalletMultiButton />
          </div>
      </div>
    )
  } else if (!ipfsIsOnline) {
    return (
      <div className='items-center my-12'>
          <h1 className='mb-5 text-xl font-bold' >IPFS Uploading Service Can Not Connect Or Is Waiting To Connect</h1>
          <div className="w-fit"> 
              Please check your internet connection and try again. If the problem persists, contact support.
          </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto mt-8">
      <Backdrop 
        showBackdrop={loading}
        showLoading
        message={backDropMessage}
      />
      <h1 className="text-4xl font-bold text-center mt-6">
        Create An NFT
      </h1>
      <div className="flex flex-row justify-center flex-wrap mt-6">
        
        <ImageUploadForm
          query={query} 
          error={error}
          loading={loading} 
          onSubmit={() => {}}
          onUpdate={onUpdate}
        />
        
        <div className="flex flex-col mx-10 ">
          <h1
            className="text-2xl font-bold text-center mt-0"
          >NFT Preview</h1>
          <PreviewNft 
            className=""
            hoverable={false}
            onClick={()=>{}}
            token={{
              name: query.name,
              symbol: query.symbol,
              description: query.description,
              imgURL: query.img.url,
              externalURL: query.externalUrl,
            }}
          />
        </div>
      </div>
        <Button
          style={ {margin: '0 auto', width: '100%'} }
          onClick={onSubmit}
        >Create NFT</Button>
     </div>

  )
}

export default UploadPage;