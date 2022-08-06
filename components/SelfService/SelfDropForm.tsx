import {ChangeEventHandler, FC, FormEventHandler} from 'react';
import { SelfDropFormQuery, SelfDrpoFormErrors } from '../../pages/new/self';
import Button from '../common/Button';
import Form from '../common/Form';
import InlineInputContainer from '../common/InlineInputContainer';
import Input from '../common/Input';

interface formProps {
  query: SelfDropFormQuery,
  error?: SelfDrpoFormErrors,
  loading: boolean,
  onSubmit: FormEventHandler,
  onUpdate: (field: string, value: string) => void
}

const SelfDropForm: FC<formProps> = (props) => {
  
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
      <InlineInputContainer>
        <Input 
          placeholder='URL for NFT Metadata JSON File'
          id="uri"
          value={query.uri}
          onChange={handleChange}
          required
          type="url"
        />
      </InlineInputContainer>
      <InlineInputContainer>
        <Input 
          placeholder='Resale Fee as a percentage'
          id="resaleFee"
          value={query.resaleFee}
          onChange={handleChange}
          required
          type="number"
          min={0}
          max={95}
        />
      </InlineInputContainer>
      <Button style={{marginLeft: '0.75rem', marginTop: '1rem'}}>Submit</Button>
    </Form>
  )

}

export default SelfDropForm;