import { useRouter } from "next/router";
import { NextPage } from "next";
import Error from 'next/error';
import { useState, useEffect } from "react";
import { DROPOPAPIHOST } from "../../statics/programIds";
import axios from 'axios';
import { DropCollection } from "../../types/DropCollection";
import Collection from "../../components/Collection/Collection";

const Collections: NextPage = () => {
  const [collections, setCollections] = useState<DropCollection[]>([])
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCollections = async () => {
      const res = await axios.get<DropCollection[]>(`${DROPOPAPIHOST}/collections`)
      setCollections(res.data);
      setLoading(false);
    }
    fetchCollections();
  }, [])

  const displayCollections = () => {
    return collections.map(collection => <Collection collection={collection} key={collection._id}/>)
  }

  return (
    <div className="container mx-auto flex-row flex-wrap" >
      {displayCollections()}
    </div>
  )
}

export default Collections