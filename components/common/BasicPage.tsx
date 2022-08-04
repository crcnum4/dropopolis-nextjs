import React, { ReactNode } from 'react'

type Props = {
    style?: React.CSSProperties,
    children: ReactNode
}

export default function BasicPage(props: Props) {
  return (
    <div className="mx-auto my-auto" style={props.style} >
        {props.children}
    </div>
  )
}