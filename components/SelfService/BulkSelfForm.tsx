import {ChangeEventHandler, FC, FormEventHandler} from 'react';
import {BulkDropFormErrors, BulkDropFormQuery} from './Bulk'
import Button from '../common/Button';
import Form from '../common/Form';
import InlineInputContainer from '../common/InlineInputContainer'
import Input from '../common/Input';
import ToggleFa from '../common/ToggleFa';

interface FormProps {
  query: BulkDropFormQuery,
  error?: BulkDropFormErrors,
  loading: boolean,
  onSubmit: FormEventHandler,
  onUpdate: (field: string, value: string) => void
  onFileChange: ChangeEventHandler,
}

const BulkSelfForm: FC<FormProps> = (props) => {
  const {query, error, loading, onSubmit, onUpdate, onFileChange} = props;
  
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onUpdate(e.target.id, e.target.value)
  }

  const displayMintOptionsDesc = () => {
    switch (props.query.mintOption) {
      case "creatorIndividual":
        return <p>Mint multiple NFTs into your wallet. They can be traded or sold thorugh 
                  Dropopolis at you leisure</p>
      case "creatorCollection":
        return <p>Mint multiple NFTs as part of a ReeCollection. The NFTs can be traded or
                  sold just like individual Nfts but are connected with a collection pubkey
                  for bundling and onChain recognition.
                </p>
      case "buyer":
        return <p>Let the Buyer pay for the minting of the NFT when they purchase it.
                  Dropopolis will generate a Gacha style minting page where a buyer pays a
                  flat rate to get a random NFT minted to their wallet. 
                  {/* the rest could be added or put on a more details link to show up or
                  send to a documentation page
                  The NFT data is stored on Dropopolis' servers to facilitate this process. A deposit of
                  sol is needed for the ReeCollection data + 0.0001 sol per NFT for the 
                  storage of the NFT data on our servers.  */}
                </p>

    }
  }

  return (
    <Form onSubmit={props.onSubmit}>
      <InlineInputContainer>
        <ToggleFa 
          label='Indepentent Nfts'
          active={query.mintOption === "creatorIndividual"}
          id="creatorIndividual"
          onChange={e => props.onUpdate('mintOption', "creatorIndividual")}
        />
        <ToggleFa 
          label='Mint Collection'
          active={query.mintOption === "creatorCollection"}
          id="creatorCollection"
          onChange={e => props.onUpdate('mintOption', "creatorCollection")}
        />
        <ToggleFa 
          label='Buyer Minted Gacha'
          active={query.mintOption === "buyer"}
          id="buyer"
          onChange={e => props.onUpdate('mintOption', "buyer")}
        />
      </InlineInputContainer>
      {displayMintOptionsDesc()}
      {query.mintOption === "buyer" || query.mintOption ==="creatorCollection" ?
      (<>
        <InlineInputContainer>
          <Input
            placeholder='Collection Name'
            id="collectionName"
            value={query.collectionName}
            required
            onChange={handleChange}
          />
        </InlineInputContainer>
        <InlineInputContainer>
          <Input
            placeholder='URL for Collection Metadata JSON File'
            value={query.collectionUrl}
            id={"collectionUrl"}
            required
            onChange={handleChange}
          />
        </InlineInputContainer>
        {query.mintOption === "buyer" ? (
          <InlineInputContainer>
            <Input 
              placeholder='Sale Price per NFT in SOL'
              value={query.salePrice}
              id="salePrice"
              required
              onChange={handleChange}
            />
          </InlineInputContainer>
        ): null}
      </>)
      : null}
      <InlineInputContainer>
        <Input 
          placeholder='Resale Fee as a percentage for all NFTs'
          id="resaleFee"
          value={query.resaleFee}
          onChange={handleChange}
          required
          type="number"
          min={0}
          max={95}
        />
      </InlineInputContainer>
      <InlineInputContainer>
        <Input 
          placeholder='JSON file with array of NFT data'
          type="file"
          onChange={onFileChange}
          value=''
          id="file"
          accept="application/JSON"
          required
        />
      </InlineInputContainer>
      <Button style={{marginLeft: '0.75rem', marginTop: '1rem'}}>Submit</Button>
    </Form>
  )
}

export default BulkSelfForm;