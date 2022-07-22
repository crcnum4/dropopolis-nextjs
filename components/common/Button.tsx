import React, { ButtonHTMLAttributes, MouseEventHandler } from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset" | undefined,
  style?: React.CSSProperties | undefined,
  className?: string | undefined,
  onClick: MouseEventHandler,
  disabled?: boolean | undefined,
  children: React.ReactNode
}

const Button = (props: ButtonProps) => {
  return (
    <button
      type={props.type || "submit"}
      style={{...props.style}}
      className={props.className}
      onClick={props.onClick}
      disabled={props.disabled}  
    >
      {props.disabled ? (<p>Loading</p>) : props.children}
    </button>
  )
}

export default Button;