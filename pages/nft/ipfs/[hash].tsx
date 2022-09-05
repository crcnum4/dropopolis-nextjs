import type { NextPage } from 'next'
import Link from 'next/link'
import DropNftIpfsWrapper from '../../../components/DropopolisNFT/DropNftPageWrapper'

const IpfsHashSearchPage: NextPage = () => {

    return (
        <div className="container mx-auto mt-8 flex-col items-center">
            <h1 className="text-4xl font-bold text-center mt-6">
                Search For An NFT By IPFS Metadata Hash
            </h1>
            <DropNftIpfsWrapper
                className='mx-auto my-10 flex-row justify-between'
            />
            <Link href='/nft/upload'>
                <a className="bg-blue-500 hover:bg-blue-700 text-white py-3 px-5 rounded-md w-fit my-5">
                    Upload A New NFT
                </a>
            </Link>

        </div>
    )
}

export default IpfsHashSearchPage