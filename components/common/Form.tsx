import React, {FC, FormEventHandler} from "react";

type FormProps = {
  children: React.ReactNode,
  style?: React.CSSProperties,
  onSubmit: FormEventHandler,
  className?: string,
}

const Form: FC<FormProps> = (props) => {
  return (
    <form 
    style={{...formStyle, ...props.style}} 
    className={props.className} 
    onSubmit={props.onSubmit}
    >
      {props.children}
    </form>
  )
}

const formStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: "center",
  alignItems: "center",
  marginRight: '20%',
  marginLeft: '20%',
  flexDirection: 'column',
}

export default Form;