import {ChangeEventHandler, FC, FormEventHandler, MouseEventHandler} from 'react';
import { ArtNftUploadErrors, ArtNftUploadQuery } from '../../types/ArtNft';
import Button from '../common/Button';
import Form from '../common/Form';
import InlineInputContainer from '../common/InlineInputContainer';
import Input, { FileQuery } from '../common/Input';
import MultiTextInput from '../common/MultiTextInput';

interface formProps {
  style?: React.CSSProperties
  className?: string
  query: ArtNftUploadQuery,
  error?: ArtNftUploadErrors,
  loading: boolean,
  onSubmit: FormEventHandler,
  onUpdate: (field: string, value: string | FileQuery) => void
}

const NftUploadForm: FC<formProps> = (props) => {
  
  const {query, error, loading, onSubmit, onUpdate, style, className} = props;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onUpdate(e.target.id, e.target.value)
  }

  const handleFileChange:ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imgData = e.target.files[0];
      onUpdate(e.target.id, {file: imgData, url: URL.createObjectURL(imgData)});
    }
  };

  const removeImage:MouseEventHandler<HTMLButtonElement> = (event) => {
      onUpdate('img', {url: ''});
  };

  return (
    <Form 
      style={{...style}}
      className={className || ""}
      onSubmit={onSubmit} 
    >
        <InlineInputContainer>
        <Input 
          label='Name'
          placeholder='NFT Name'
          id="name"
          value={query.name}
          required
          onChange={handleChange}
        />
        <Input 
          label='Symbol'
          placeholder='Symbol'
          id="symbol"
          value={query.symbol}
          required
          onChange={handleChange}
        />
      </InlineInputContainer>
      <InlineInputContainer>
      <Input 
          label='Description'
          placeholder='Description'
          id="description"
          value={query.description}
          required
          onChange={handleChange}
      />
      </InlineInputContainer>
      <InlineInputContainer>
        <Input 
          label='Resale Fee %'
          placeholder='Resale Fee %'
          id="resaleFee"
          type='number'
          value={query.resaleFee}
          min={0}
          max={95}
          step={1}
          required
          onChange={handleChange}
        />
        <Input 
          label='Project URL'
          placeholder='Project URL'
          id="externalUrl"
          value={query.externalUrl}
          required
          onChange={handleChange}
        />
      </InlineInputContainer>
      <InlineInputContainer>
          <Input
            label='NFT Image'
            placeholder='NFT Image'
            type='file'
            id="img"
            value={''}
            required
            onChange={handleFileChange}
          />
      </InlineInputContainer>
      <MultiTextInput
        inputName='Creator'
        values={query.creators}
        addOneField={() => {}}
        removeOneField={() => {}}
        onChange={handleChange}

      
      />
      {/* <Button>Create NFT</Button> */}
    </Form>
  )

}

export default NftUploadForm;