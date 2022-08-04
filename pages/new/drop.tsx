import { NextPage } from 'next';
import Link from 'next/link';

// drop system will involve 2 create NFT systems to start:
  // 1. centralized storage through Dropopolis via Amazon S3. (theoretically could increase 
    // our royalty share for this service)
  // 2. self uploaded files. User is allowed to upload their image and offchain metadata json file
    // wherever they want and post the public link to our NFT system. Our system simply verifies
    // the image is an image and the metadata is a json file with the required keys.
    // this means the user can store the image on their own servers, IPFS or ARWEAVE
  // as we learn how to implement other storage solutions we can provide tools on dropopolis to 
    // handle these services. This is what Metaplex and solsea do ->
      /*  sol is sent to an address defined by the service provider 
       *    6FKvsq4ydWFci6nGq9ckbjYMtnmaqAoatz5c9XWjiDuS for metaplex
       *  a web request is sent to the service providers api with any files and data to upload
       *  the service checks for a sol transfer to their address in the amount needed for the upload
       *  from the pubkey provided in the api call.
       *  Once confirmed the service provider uses their own alt coin for the service (ex AR) 
       *  to upload the data and return the links.
       *  the standard NFT process is then performed.
       */

const NewDrop: NextPage = () => {
    return (
      <div className="container mx-auto">
        <h1>
          Create Your Own Drop
        </h1>
          <h2>Dropopolis uses ReeMeta NFTs. </h2>
        <p> 
          To create your Drops you can use one of our provided uploading tools for full service NFT creation. Or you can upload your Image and OffChain JSON files to any centralized or decentralized hosting service and provide the public URI for the two files using our self service system.
        </p>
        <p>
          Not sure which to use? If your NFT drop is still sitting on your computer then full service
          is the fastest way to get your drops online as soon as possible. It requires no knowledge 
          of any hosting service. Just pick the one that sounds the best to you and follow the instructions.
        </p>
        <Link href={'/new/full'}>
          <a className='bg-blue-500 hover:bg-blue-700 text-white py-3 px-5 rounded-md w-fit my-5'>Full Service Creation</a>
        </Link>
        <p>
          If you are looking for a fully decentralized solution or want to maintain the files on your own centralized hosting service and you know how to make a file publicly available on the internet then self service is the choice for you. Make sure to refer to our JSON format guide to ensure the minimum data is present on the JSON file.
        </p>
        <Link href='/hew/self'>
          <a className="bg-blue-500 hover:bg-blue-700 text-white py-3 px-5 rounded-md w-fit my-5">Self Service Creation</a>
        </Link>
      </div>
    )
}

export default NewDrop;