import { NextPage } from "next";
import Link from "next/link";
import {useState} from 'react';

const FullService: NextPage = () => {
  
  return (
    <div className="container mx-auto mt-20">
      <div className="text-lg text-gray-900 font-medium leading-6">
          Create an NFT with Dropopolis
      </div>
      <div className="mt-2 px-7 pt-3">
        <p className="text-sm text-gray-900">
          Dropopolis offers multiple ways to create and serve your NFTs currently we only provide
          full service creation for individual Artistic NFTs. If you have multiple NFTs or 
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          would like to create a collection of NFTs contact Dropopolis' service email to 
          create a featured NFT collection. Full service creation tools are free to create Nfts
          Dropopolis adds a royalty depending on the hosting service selected.
        </p>
      </div>
      <div className="mt-2 px-7 pt-2">
        <p className="text-base text-gray-900 font-medium">
          NFT hosting options
        </p>
        <p className="text-sm text-gray-900">
          Choose how you want your NFT data hosted we provide both decentralized and centralized
          hosting locations at different service rates. For more in-depth details on each host
          refer to documentation
        </p>
      </div>
      <div className="max-w-1/2 mx-auto">
        <div className="flex flex-row py-1 px-7 items-center">
          <Link href="/new/full/ipfs">
            <a className='bg-blue-500 hover:bg-blue-700 text-white py-3 px-6 rounded-md w-fit my-5'>IPFS</a>
          </Link>
          <div className="flex-1 px-2">
            Upload offchain NFT data to decentralized service ipfs.io our resale rate for maintaining an RPC node is 7%
          </div>
        </div>
        <div className="flex flex-row py-1 px-7 items-center">
          <Link href="/new/full/aws">
            <a className='bg-blue-500 w-fit hover:bg-blue-700 text-white py-3 px-6 rounded-md my-5'>AWS</a>
          </Link>
          <div className="flex-1 px-2">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Upload offchain NFT to Dropopolis' managed AWS storage. Our resale rate to maintain the storage is 15%
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullService;