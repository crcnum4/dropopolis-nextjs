import { useRouter } from "next/router";
import { NextPage } from "next";
import Error from 'next/error'
import { useEffect, useState } from "react";
import { DROPOPAPIHOST } from "../../../statics/programIds";
import axios from "axios";
import { DropCollection } from "../../../types/DropCollection";
import { DropStore } from "../../../types/DropStore";
import Store from "../../../components/Store/Store";
import { PublicKey } from "@solana/web3.js";

const CollectionPage: NextPage = () => {
  const router = useRouter();
  const method = router.query.method as string;
  const key = router.query.key as string;

  const [collection, setCollection] = useState<{collection: DropCollection, owner: string}>();
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState<null | DropStore>(null);

  useEffect(() => {
    const fetchCollection = async(method: "key" | "name" | "id", key: string) => {
      const url = `${DROPOPAPIHOST}/collections/${method}/${key}`
      
      const res = await axios.get<{collection: DropCollection, owner: string}>(url);
      setCollection(res.data);
      setLoading(false);
    }
    if (!key || !method) {
      return;
    }

    setLoading(true);
    switch (method) {
      case "id":
      case "name":
        fetchCollection(method, key);
        break;
      case "addr":
        // TODO if fetchCollection fails we should attempt pulling from chain
        // and mark it as a non Dropopolis confirmed collection.
        fetchCollection("key", key);
        break;
      default: 
        return;
    }
    return;
  }, [method, key])

  useEffect(() => {
    const hasStore = async() => {
      const url = `${DROPOPAPIHOST}/stores/collection/${collection?.collection._id}`
      try {
        const res = await axios.get<DropStore>(url);
        setStore(res.data);
      } catch (e) {
        setStore(null);
        return;
      }
    }
    if (!collection) {
      return;
    }
    hasStore();
  }, [collection])

  // TODO: add the check for escrow useEffect
  // only add this if we want to check for escrows before user clicks tab. I think this should be hidden to save the rpc call

  if ( !['name', 'id', 'addr', undefined].includes(method)) {
    return <Error statusCode={404} title={"Collection Query Method Not Found"}/>
  }

  if (loading) {
    return (
      <div className="container mx-auto">
        <h1>loading...</h1>
      </div>
    )
  }

  if (!collection) {
    return (
      <div className="container mx-auto">
        <h1>Collection Not Found</h1>
      </div>
    )
  }
  return (
    <div className="container mx-auto">
      <div 
        className="bg-cover w-full h-80" 
        style={{
          backgroundImage: `url(${collection.collection.headerImage})` 
        }}
      />
      <h1 className="text-2xl self-center my-4">{collection.collection.name}</h1>
      <p className="text-lg my-4">{collection.collection.detailedDescription}</p>
      {
        store ? (
          <Store collection={collection.collection} owner={new PublicKey(collection.owner)} storeId={store._id} />
        ) : null
      }
    </div>
  )
}

export default CollectionPage