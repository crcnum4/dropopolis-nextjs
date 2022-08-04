import { NextPage } from "next";
import { useState } from "react";
import SelfDocumentation from "../../../components/SelfService/Documentation";
import SelfDropForm from "../../../components/SelfService/SelfDropForm";

export interface SelfDropFormQuery {
  name: string,
  symbol: string,
  uri: string,
  resaleFee: string,
}

export interface SelfDropFormErrors extends SelfDropFormQuery {
  form: string
}

const SelfService: NextPage = () => {

  const [query, setQuery] = useState<SelfDropFormQuery>({
    name: "",
    symbol: "",
    uri: "",
    resaleFee: ""
  })
  const [error, setError] = useState<SelfDropFormErrors>({
    name: "",
    symbol: "",
    uri: "",
    resaleFee: "",
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

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold">
        Self Service Drop Creation
      </h1>
      <SelfDropForm 
        query={query} 
        error={error}
        loading={loading} 
        onSubmit={onSubmit} 
        onUpdate={onUpdate}
      />
      <SelfDocumentation />
    </div>

  )
}

export default SelfService;