import { NextPage } from "next";
import { FormEventHandler, useState } from "react";
import { FileQuery } from "../../components/common/ImageInput";
import ImageUploadForm from "../../components/ImageUploader/ImageUploadForm";

import Backdrop from "../../components/common/Backdrop";

import { create } from 'ipfs-http-client'
import { createMetadataJson } from "../../scripts/createMetadataJson";

const IPFS_GATEWAY_POST = process.env.NEXT_PUBLIC_IPFS_GATEWAY_POST
const IPFS_GATEWAY_GET = process.env.NEXT_PUBLIC_IPFS_GATEWAY_GET

export interface NftUploadQuery {
  img: FileQuery
  name: string
  symbol: string
}

export interface NftUploadErrors extends NftUploadQuery {
  form: string
}

const ImageUploadPage : NextPage = () => {
const ipfsClient = create({url: IPFS_GATEWAY_POST})

  const [query, setQuery] = useState<NftUploadQuery>({
    img: {url: ''},
    name: "Test NFT 1",
    symbol: "TEST",
  })
  const [error, setError] = useState<NftUploadErrors>({
    img: {url: ''},
    name: "",
    symbol: "",
    form: "",
  })
  const [loading, setLoading] = useState(false);
  
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
    if (!query.img.file || loading) return

    try {
        console.log('uploading ipfs');
        setLoading(true)
        const imgFileIpfs = await ipfsClient.add(query.img.file)
        alert('IPFS Image Upload Complete (1/2)')
        const metaDataJSON = createMetadataJson(query)
        const metaDataIpfs = await ipfsClient.add(metaDataJSON)
        alert(`Metadata Upload Complete (2/2)`)
        setQuery({
            img: {url: ''},
            name: "",
            symbol: "",
        })

        setLoading(false)
        const imageIpfsUrl = `${IPFS_GATEWAY_GET}/${imgFileIpfs.path}`
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

  return (
    <div className="container mx-auto mt-8">
      <Backdrop 
        showBackdrop={loading}
        showLoading
        message="Uploading Image"
      />
      <h1 className="text-4xl font-bold">
      Upload Images To IPFS
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

export default ImageUploadPage;