import { NextPage } from "next";
import { ChangeEventHandler, useState } from "react";
import ImageUploadForm from "../../components/ImageUploader/ImageUploadForm";

export interface ImageFormQuery {
  img: string
  name: string
  symbol: string
}

export interface ImageFormErrors extends ImageFormQuery {
  form: string
}

const Ipfs: NextPage = () => {

  const [query, setQuery] = useState<ImageFormQuery>({
    img: "",
    name: "Test NFT 1",
    symbol: "TEST",
  })
  const [error, setError] = useState<ImageFormErrors>({
    img: "",
    name: "",
    symbol: "",
    form: "",
  })
  const [loading, setLoading] = useState(false);
  
  const onSubmit = () => {
    alert("submitted");
  }

  const onUpdate = (field: string, value: string): void => {
    setQuery({
      ...query,
      [field]: value
    })
  }


  const uploadToServer:ChangeEventHandler<HTMLInputElement> = async (event) => {
    if (!query.img) return
    const body = new FormData();
    body.append("file", query.img);
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

export default Ipfs;