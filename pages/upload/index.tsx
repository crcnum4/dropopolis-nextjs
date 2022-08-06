import { NextPage } from "next";
import { FormEventHandler, useState } from "react";
import { FileQuery } from "../../components/common/ImageInput";
import ImageUploadForm from "../../components/NftUploader/NftUploadForm";

import Backdrop from "../../components/common/Backdrop";

import { create } from 'ipfs-http-client'
import { createMetadataJson } from "../../scripts/createMetadataJson";
import { ArtNftUploadErrors, ArtNftUploadQuery } from "../../types/ArtNft";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const IPFS_GATEWAY_POST = process.env.NEXT_PUBLIC_IPFS_GATEWAY_POST
const IPFS_GATEWAY_GET = process.env.NEXT_PUBLIC_IPFS_GATEWAY_GET

const UploadPage : NextPage = () => {
const ipfsClient = create({url: IPFS_GATEWAY_POST})

  const [query, setQuery] = useState<ArtNftUploadQuery>({
    img: {url: ''},
    name: "Test NFT 1",
    symbol: "TEST",
    description: "desc",
    externalUrl: "dropopolis.com",
    royalty: 5,
    creators: [],
    attributes: [],
  })
  const [error, setError] = useState<ArtNftUploadErrors>({
    img: {url: ''},
    name: "",
    symbol: "",
    description: "",
    externalUrl: "",
    royalty: 5,
    creators: [],
    attributes: [],
    form: "",
  })
  const [loading, setLoading] = useState(false);


  const wallet = useWallet();


  const onSubmit:FormEventHandler<Element> = (e) => {
    e.preventDefault();
    uploadToServer()
  }

  const onUpdate = (field: string, value: string|FileQuery): void => {
    setQuery({
      ...query,
      [field]: value
    })
  }

  const uploadToServer = async () => {
    if (!query.img.file || loading || !wallet.connected || !wallet.publicKey) return

    try {
        console.log('uploading ipfs');
        setLoading(true)
        const imgFileIpfs = await ipfsClient.add(query.img.file)
        const imageIpfsUrl = `${IPFS_GATEWAY_GET}/${imgFileIpfs.path}`
        alert('IPFS Image Upload Complete (1/2)')
        const metaDataJSON = createMetadataJson(
            {
                ...query,
                img: {...query.img, url: imageIpfsUrl},
                creators: [...query.creators, {address: wallet.publicKey.toString(), share: '100'}]
            }
        )
        const metaDataIpfs = await ipfsClient.add(metaDataJSON)
        alert(`Metadata Upload Complete (2/2)`)
        setQuery({
            img: {url: ''},
            name: "",
            symbol: "",
            description: "",
            externalUrl: "",
            royalty: 5,
            creators: [],
            attributes: [],
        })

        setLoading(false)
        const metadataIpfsUrl = `${IPFS_GATEWAY_GET}/${metaDataIpfs.path}`
        console.log(imageIpfsUrl);
        console.log(metadataIpfsUrl);
        console.log(imgFileIpfs);
        console.log(metaDataIpfs);
    
    } catch (error) {
        alert(error);
        console.log(error);
        setLoading(false)
    }


  };

  console.log("Wallet: ", wallet);
  

  if (!wallet.connected) return (
    <div className='items-center my-12'>
        <h1 className='mb-5 text-xl font-bold' >You must connect your wallet to create an NFT</h1>
        <div className="w-fit"> 
            <WalletMultiButton />
        </div>
    </div>
  )

  return (
    <div className="container mx-auto mt-8">
      <Backdrop 
        showBackdrop={loading}
        showLoading
        message="Uploading Image"
      />
      <h1 className="text-4xl font-bold">
      Create An NFT
      </h1>
      <ImageUploadForm
        query={query} 
        error={error}
        loading={loading} 
        onSubmit={onSubmit} 
        onUpdate={onUpdate}
      />
     </div>

  )
}

export default UploadPage;