import {ChangeEventHandler, FC, FormEventHandler} from 'react';
import { ImageUploadQuery, ImageUploadErrors } from '../../pages/upload/ipfs';
import Button from '../common/Button';
import Form from '../common/Form';
import ImageInput, { FileQuery } from '../common/ImageInput';
import InlineInputContainer from '../common/InlineInputContainer';
import Input from '../common/Input';

interface formProps {
  query: ImageUploadQuery,
  error?: ImageUploadErrors,
  loading: boolean,
  onSubmit: FormEventHandler,
  onUpdate: (field: string, value: string | FileQuery) => void
}

const ImageUploadForm: FC<formProps> = (props) => {
  
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
      <ImageInput 
        id='img'
        className='my-1'
        value={query.img}
        required
        onUpdate={props.onUpdate}
      />
        
      <Button>Upload Image</Button>
    </Form>
  )

}

export default ImageUploadForm;