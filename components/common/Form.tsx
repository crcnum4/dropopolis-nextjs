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
    style={{...props.style}} 
    className={props.className || "flex flex-col text-center w-full mb-6 max-w-4xl"} 
    onSubmit={(e) => {
      e.preventDefault();
      props.onSubmit(e)
    }}
    >
      {props.children}
    </form>
  )
}

export default Form;