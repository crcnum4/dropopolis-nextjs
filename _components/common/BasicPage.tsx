import React from 'react'
import Copyright from './Copyright'
import styles from '../../styles/Home.module.css'

type Props = {
    style: React.CSSProperties,
    children: any
}

export default function BasicPage(props: Props) {
  return (
    <div style={{textAlign: 'center', paddingTop: '10vh', ...props.style}}>
        {props.children}
    </div>
  )
}