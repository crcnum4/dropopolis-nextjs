import React, {FC, useState} from 'react';
import InfoCard from '../../common/InfoCard';
import NewsletterForm from './NewsletterForm';

const Newsletter: FC = () => {
  const [query, setQuery] = useState({email: ''});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({message: ''});
  
  const updateForm = (value: string) => {
    setQuery({email: value})
  }

  const onSubmint = () => {
    alert("thanks for registering.");
  }

  return (
    <div className='flex-row my-8'>
      <InfoCard className='bg-blue-400/20 p-8 md:p-20'>
        <div className='flex-row'>
          <div className="flex-1 w-full">
            <h1 className="text-4xl font-bold">
              Signup for our newsletter to get the latest information in your inbox
            </h1>
            <p className="my-8 text-gray-400 text-xl">No spam message, your email is safe with us</p>
            <NewsletterForm 
              query={query} 
              loading={loading} 
              onSubmit={onSubmint} 
              onUpdate={updateForm}
            />
          </div>
          <div className="flex-1 w-full"></div>
        </div>
      </InfoCard>
    </div>
  )
}

export default Newsletter