import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { NextPage } from "next";
import { useState } from "react"
import { FileQuery } from "../common/ImageInput";

interface BulkDropFormQuery {
  file: FileQuery,
  resaleFee: string,
  mintOption: "creator" | "buyer",
  collection: boolean,
  collectionName: string,
  collectionUrl: string,
}

interface BulkDropFormErrors extends Omit<BulkDropFormQuery, "file" | "mintOption" | 'collection'> {
  file: string,
  form: string,
}

const BulkSelfService: NextPage = () => {
  const {connection} = useConnection()
  const {publicKey, sendTransaction} = useWallet();
  const [query, setQuery] = useState<BulkDropFormQuery>({
    file: {url: ""},
    resaleFee: "",
    mintOption: "creator",
    collection: false,
    collectionName: "",
    collectionUrl: '',
  })
  const [errors, setError] = useState<BulkDropFormErrors>({
    file: "",
    resaleFee: "",
    form: "",
    collectionName: '',
    collectionUrl: '',
  })
  const [loading, setLoading] = useState(false);

  const onSubit = async() => {
    alert("submit");
  }

  const onUpdate = (field: string, value: string): void => {
    setQuery({
      ...query,
      [field]: value
    })
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold">
        Self Service Bulk Creation
      </h1>
      {/* form */}
    </div>
  )


}