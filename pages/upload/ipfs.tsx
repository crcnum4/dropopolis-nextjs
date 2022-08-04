import { NextPage } from "next";
import { ChangeEventHandler, FormEventHandler, Fragment, useState } from "react";
import { FileQuery } from "../../components/common/ImageInput";
import ImageUploadForm from "../../components/ImageUploader/ImageUploadForm";

import { useMoralis, useMoralisFile } from "react-moralis";
import Button from "../../components/common/Button";

export interface ImageUploadQuery {
  img: FileQuery
  name: string
  symbol: string
}

export interface ImageUploadErrors extends ImageUploadQuery {
  form: string
}

const ImageUploadPage : NextPage = () => {
  const {
      isAuthenticated,
      authenticate
  } = useMoralis()

  const { isUploading, saveFile, moralisFile, error: moralisError } = useMoralisFile();

  const authorizeWallet = () => {
    authenticate({
      type: 'sol'
    })
  }

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
    if (!query.img.file || isUploading ) return
    console.log('uploading ipfs');
    
    saveFile(query.img.file.name, query.img.file, { saveIPFS: true })
    .then ( imgRes => {
      console.log("res:", imgRes);
      if (!imgRes) throw new Error("Upload error");
      
      console.log(imgRes.ipfs(), imgRes.hash())
      console.log('upload to ipfs successful\n' + imgRes.ipfs());
      alert('IPFS Image Upload Complete (1/2)')


      saveFile("metadata.json", 
        {base64: btoa(JSON.stringify({
          name: query.name,
          symbol: query.symbol,
          url: imgRes.ipfs(),
        }))},
        { saveIPFS: true }
      )
      .then( metadataRes => {
        console.log("res:", metadataRes);
        if (!metadataRes) throw new Error("Upload error");

        alert(`Metadata Upload Complete (2/2)`)
        console.log(`Metadata Upload Complete\n${imgRes.ipfs()}\n${metadataRes.ipfs()}`);
        
        setQuery({
          img: {url: ''},
          name: "",
          symbol: "",
        })

      })
      .catch  ( err => {
        console.log("err:", err);
        console.log("MoralisError:", moralisError);
        
      })
      
    })
    .catch ( err => {
      console.log("err:", err);
      console.log("MoralisError:", moralisError);
      
    })

  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold">
      Upload Images To IPFS
      </h1>
      {isAuthenticated ? (
        <ImageUploadForm
        query={query} 
        error={error}
        loading={loading} 
        onSubmit={onSubmit} 
        onUpdate={onUpdate}
      />
      ) : (
        <Fragment>
          <h1 className="text-2xl font-bold">
          Authorize Your Wallet To Upload Images
          </h1>
          <Button onClick={authorizeWallet}>
            Authorize
          </Button>
        </Fragment>
      )}
      
      
    </div>

  )
}

export default ImageUploadPage;