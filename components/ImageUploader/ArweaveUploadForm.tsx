import {ChangeEventHandler, FC, FormEventHandler} from 'react';
import { ArweaveFormQuery, ArweaveFormErrors } from '../../pages/upload/arweave';
import Button from '../common/Button';
import Form from '../common/Form';
import ImageInput from '../common/ImageInput';
import InlineInputContainer from '../common/InlineInputContainer';
import Input from '../common/Input';

interface formProps {
  query: ArweaveFormQuery,
  error?: ArweaveFormErrors,
  loading: boolean,
  onSubmit: FormEventHandler,
  onUpdate: (field: string, value: string) => void
}

const ArweaveForm: FC<formProps> = (props) => {
  
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
          onChange={handleChange}
        />
      </InlineInputContainer>
      <ImageInput 
        id='img'
        value={query.img}
        onUpdate={props.onUpdate}
        className='my-1'
      />
        
      <Button>Upload to Arweave</Button>
    </Form>
  )

}

export default ArweaveForm;