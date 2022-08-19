import type { NextPage } from 'next'
import DropNFTWrapper from '../../../components/DropopolisNFT/DropNFTWrapper'

const IpfsHashSearchPage: NextPage = () => {

    return (
        <div className="container mx-auto mt-8 flex-col items-center">
            <h1 className="text-4xl font-bold text-center mt-6">
                Search For An NFT By IPFS Metadata Hash
            </h1>
            <DropNFTWrapper
                className='mx-auto my-10 flex-row justify-between'
            />

        </div>
    )
}

export default IpfsHashSearchPage