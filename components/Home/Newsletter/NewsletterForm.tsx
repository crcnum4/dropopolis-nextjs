import React, {ChangeEventHandler, FC, FormEvent, FormEventHandler} from 'react';
import Button from '../../common/Button';
import Form from '../../common/Form';
import InlineInputContainer from '../../common/InlineInputContainer';
import Input from '../../common/Input';

type NewsletterFormProps = {
  query: {email: string},
  loading: boolean,
  onSubmit: FormEventHandler<HTMLFormElement>,
  onUpdate: (value: string) => void,
}

const NewsletterForm: FC<NewsletterFormProps> = (props) => {
  
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    props.onUpdate(e.target.value);
  }
  
  return (
    <Form 
      onSubmit={props.onSubmit} 
      className="mt-4" 
      style={{
        marginLeft: 0,
        marginRight: 0,
      }}
    >
      <InlineInputContainer>
        <Input 
          id="email"
          value={props.query.email}
          placeholder={"Email Address"}
          onChange={handleChange}
          required
        />
        <Button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-5 rounded-md w-fit mx-2">
          Subscribe
        </Button>
      </InlineInputContainer>
    </Form>
  )
}

export default NewsletterForm