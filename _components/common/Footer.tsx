import React from 'react'
import Copyright from './Copyright'
import styles from '../../styles/Home.module.css'

type Props = {
  link: string,
  companyName: string,
  style: React.CSSProperties
}

export default function Footer(props: Props) {
  return (
      <footer className={styles.footer} style={{...props.style}}>
        <Copyright style={{...props.style}} link={props.link} companyName={props.companyName}/>
      </footer>
  )
}