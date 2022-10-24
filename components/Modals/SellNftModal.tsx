import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import {ChangeEventHandler, FC, useState} from 'react';
import { NftMetadata } from '../../types/NftMetadata';
import { RoyaltyArt } from '../../types/RoyaltyArt';
import Button from '../common/Button';
import Form from '../common/Form';
import InlineInputContainer from '../common/InlineInputContainer';
import Input from '../common/Input';

interface SellModalProps {
  nft: NftMetadata<RoyaltyArt>,
  onSubmit: (amount: number) => void,
  onCancel: () => void,
}

const SellNftModal: FC<SellModalProps> = (props) => {
  const [amount, setAmount] = useState("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setAmount(e.target.value);
  }

  const handleSubmit = () => {
    props.onSubmit(parseInt(amount));
  }

  return (
    <div
      className="relative top-20 mx-auto my-32 p-5 border w-96 shadow-lg rounded-md bg-white"
    >
      <div className="mt-3 text-center">
        <div className="text-lg leading-6 font-medium text-gray-900">
          Sell {props.nft.data?.name}
        </div>
        <div className="mt-2 px-7 py-3">
          <p className="text-sm text-gray-900">Putting up nft for sale, enter price in Lamports</p>
          <p className="text-xs text-gray-900">{LAMPORTS_PER_SOL.toLocaleString()} = 1 Sol</p>
        </div>
        <div className="mt-2 px-7">
          <Form onSubmit={handleSubmit}>
            <InlineInputContainer>
              <Input 
                placeholder='Sell price in lamports'
                id="amount"
                value={amount}
                required
                onChange={handleChange}
                style={{margin: 0}}
              />
            </InlineInputContainer>
            <InlineInputContainer style={{justifyContent: 'space-between'}}>
              <Button style={{marginTop: '0.6rem'}}>Submit</Button>
              <Button 
                style={{marginTop: '0.5rem'}} 
                type="button"
                onClick={props.onCancel}
              >Cancel</Button>
            </InlineInputContainer>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default SellNftModal;