import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { NextPage } from "next";
import { ChangeEventHandler, useState } from "react"
import BulkSelfForm from "./BulkSelfForm";
import {FileQuery} from '../common/Input';

export interface BulkDropFormQuery {
  file: FileQuery,
  resaleFee: string,
  mintOption: "creatorIndividual" | "creatorCollection" | "buyer",
  collection: boolean,
  collectionName: string,
  collectionUrl: string,
  salePrice: string
}

export interface BulkDropFormErrors extends Omit<BulkDropFormQuery, "file" | "mintOption" | 'collection'> {
  file: string,
  form: string,
}

const BulkSelfService: NextPage = () => {
  const {connection} = useConnection()
  const {publicKey, sendTransaction} = useWallet();
  const [query, setQuery] = useState<BulkDropFormQuery>({
    file: {url: ""},
    resaleFee: "",
    mintOption: "creatorIndividual",
    collection: false,
    collectionName: "",
    collectionUrl: '',
    salePrice: '',
  })
  const [errors, setError] = useState<BulkDropFormErrors>({
    file: "",
    resaleFee: "",
    form: "",
    collectionName: '',
    collectionUrl: '',
    salePrice: '',
  })
  const [loading, setLoading] = useState(false);

  const onSubmit = async() => {
    alert("submit");
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
    <div className="container mx-auto mt-8">
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