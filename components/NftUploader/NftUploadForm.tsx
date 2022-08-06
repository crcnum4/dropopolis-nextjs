import {ChangeEventHandler, FC, FormEventHandler} from 'react';
import { ArtNftUploadErrors, ArtNftUploadQuery } from '../../types/ArtNft';
import Button from '../common/Button';
import Form from '../common/Form';
import ImageInput, { FileQuery } from '../common/ImageInput';
import InlineInputContainer from '../common/InlineInputContainer';
import Input from '../common/Input';

interface formProps {
  query: ArtNftUploadQuery,
  error?: ArtNftUploadErrors,
  loading: boolean,
  onSubmit: FormEventHandler,
  onUpdate: (field: string, value: string | FileQuery) => void
}

const NftUploadForm: FC<formProps> = (props) => {
  
  const {query, error, loading, onSubmit, onUpdate} = props;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onUpdate(e.target.id, e.target.value)
  }

  return (
    <Form onSubmit={onSubmit} >
        <InlineInputContainer>
        <Input 
          placeholder='NFT Name'
          id="name"
          value={query.name}
          required
          onChange={handleChange}
        />
        <Input 
          placeholder='Symbol'
          id="symbol"
          value={query.symbol}
          required
          onChange={handleChange}
        />
      </InlineInputContainer>
      <Input 
          placeholder='Description'
          id="description"
          value={query.description}
          required
          onChange={handleChange}
        />
      <InlineInputContainer>
        <Input 
          placeholder='Resale Royalty %'
          id="royalty"
          type='number'
          value={query.royalty}
          min={0}
          max={95}
          required
          onChange={handleChange}
        />
        <Input 
          placeholder='Project URL'
          id="externalUrl"
          value={query.externalUrl}
          required
          onChange={handleChange}
        />
      </InlineInputContainer>
      <ImageInput 
        id='img'
        className='my-1'
        value={query.img}
        required
        onUpdate={props.onUpdate}
      />
        
      <Button>Create NFT</Button>
    </Form>
  )

}

export default NftUploadForm;