import { NextPage } from "next";
import { ChangeEventHandler, useState } from "react";
import { FileQuery } from "../../components/common/ImageInput";
import ImageUpload from "../../components/ImageUploader/ImageUploadForm";

export interface ImageUploadQuery {
  img: FileQuery
  name: string
  symbol: string
}

export interface ImageUploadErrors extends ImageUploadQuery {
  form: string
}

const Arweave: NextPage = () => {

  const [query, setQuery] = useState<ImageUploadQuery>({
    img: {url: ''},
    name: "Test NFT 1",
    symbol: "TEST",
  })
  const [error, setError] = useState<ImageUploadErrors>({
    img: {url: ''},
    name: "",
    symbol: "",
    form: "",
  })
  const [loading, setLoading] = useState(false);
  
  const onSubmit = () => {
    alert("submitted");
  }

  const onUpdate = (field: string, value: string|FileQuery): void => {
    setQuery({
      ...query,
      [field]: value
    })
  }


  const uploadToServer:ChangeEventHandler<HTMLInputElement> = async (event) => {
    if (!query.img.file) return
    const body = new FormData();
    body.append("file", query.img.file);
    const response = await fetch("/api/file", {
      method: "POST",
      body
    });
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold">
      Upload Images To IPFS
      </h1>
      <ImageUpload 
        query={query} 
        error={error}
        loading={loading} 
        onSubmit={onSubmit} 
        onUpdate={onUpdate}
      />
      
    </div>

  )
}

export default Arweave;