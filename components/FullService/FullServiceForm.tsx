import { createExternalPriceAccount } from '@metaplex/js/lib/actions';
import { NATIVE_MINT } from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react';
import {ChangeEventHandler, FC, useEffect, useState} from 'react';
import { NftKind, NftMetadata, UpdateType } from '../../types/NftMetadata';
import { RoyaltyArt } from '../../types/RoyaltyArt';
import { initialURoyaltyArtQuery, URoyaltyArtQuery } from '../../types/UploadTypes';
import Button from '../common/Button';
import Form from '../common/Form';
import InlineInputContainer from '../common/InlineInputContainer';
import Input from '../common/Input';
import ArtNftCard from '../Gallery/ArtNftCard';
import LocalArtNftCard, { LocalNftData } from '../Gallery/LocalArtNftCard';

interface FormProps {
  submit: (nft: URoyaltyArtQuery) => Promise<boolean>
  existingNftData?: URoyaltyArtQuery,
}

const FullServiceForm: FC<FormProps> = (props) => {
  const {existingNftData} = props;
  const [query, setQuery] = useState<URoyaltyArtQuery>(existingNftData ? existingNftData : initialURoyaltyArtQuery)

  useEffect(() => {
    if (existingNftData) {
      setQuery(existingNftData);
    }
  }, [existingNftData])

  const onFieldChange:ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery({
      ...query,
      [e.target.id]: e.target.value 
    })
  }

  const onFileSelect:ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files || e.target.files.length <1) {
      return setQuery({
        ...query,
        [e.target.id]: {url: ''}
      })
    }
    setQuery({
      ...query,
      [e.target.id]: {file: e.target.files[0], url: URL.createObjectURL(e.target.files[0])}
    })
  }

  // On multiInputFieldChange

  const onSubmit = async () => {
    const result = await props.submit(query)
    if(result) {
      setQuery(initialURoyaltyArtQuery);
    }
  }

  const displaySampleNft = () => {

    const data: LocalNftData = {
      imgUrl: query.img.url,
      name: query.name,
      symbol: query.symbol,
      description: query.description,
      externalUrl: query.externalUrl,
    }

    return (
      <LocalArtNftCard nft={data} />
    )
  }

  return (
    <div className="container mx-auto mt-8 items-center flex-row">
      <div className="flex flex-1 flex-col px-2">
        <Form onSubmit={onSubmit}>
          {/* <InlineInputContainer>
            <p className="text-lg leading-6 px-4">Base Nft Data</p>
          </InlineInputContainer> */}
          <InlineInputContainer>
            <Input 
              style={{color: 'black'}}
              label="NFT Image"
              placeholder='NFT Image'
              type='file'
              onChange={onFileSelect}
              id="img"
              accept='image/png image/git image/jpeg'     
            />
          </InlineInputContainer>
          <InlineInputContainer>
            <Input 
              placeholder='Name'
              id="name"
              value={query.name}
              onChange={onFieldChange}
              required
            />
          </InlineInputContainer>
          <InlineInputContainer>
            <Input 
              placeholder='Symbol'
              id="symbol"
              value={query.symbol}
              onChange={onFieldChange}
              required
            />
          </InlineInputContainer>
          <InlineInputContainer>
            <Input 
              placeholder='Description'
              id="description"
              value={query.description}
              onChange={onFieldChange}
              required
            />
          </InlineInputContainer>
          <InlineInputContainer>
            <Input 
              label='Resale Fee Percentage'
              placeholder='0 - 100'
              id="resaleFee"
              value={query.resaleFee}
              onChange={onFieldChange}
              required
            />
          </InlineInputContainer>
          <InlineInputContainer>
            <Input 
              placeholder='Project Url'
              id="externalUrl"
              value={query.externalUrl}
              onChange={onFieldChange}
              required
            />
          </InlineInputContainer>
          <Button style={{marginLeft: '0.75rem', marginTop: '1rem'}}>Submit</Button>
        </Form>
      </div>
      <div>
        {displaySampleNft()}
      </div>
    </div>
  )
}

export default FullServiceForm;