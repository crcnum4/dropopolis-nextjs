import { NextPage } from 'next';
import Link from 'next/link';

const UploadPage: NextPage = () => {
    return (
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mt-10">
            Upload images for NFTs
        </h1>
        <Link href={'/upload/arweave'}>
          <a className='bg-blue-500 hover:bg-blue-700 text-white py-3 px-5 rounded-md w-fit my-5'>Arweave</a>
        </Link>
        <Link href='/upload/ipfs'>
          <a className="bg-blue-500 hover:bg-blue-700 text-white py-3 px-5 rounded-md w-fit mb-5">IPFS</a>
        </Link>
      </div>
    )
}

export default UploadPage;