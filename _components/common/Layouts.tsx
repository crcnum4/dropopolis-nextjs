import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Head from 'next/head'
import { useRouter } from 'next/router'

type Props = {children: any}

export default function Layout({children}: Props) {
  // this could be put into a utility methods or or simplified/cleaned up in some way
  // const {pathname} = useRouter()
  // const pageName = pathname == '/' ? 'NFT Staking Center' : pathname.substring(1).replace(/\//g, ' - ').replace(/\b\w/g, c => c. toUpperCase());

  return (
    <>
      <Head>
        <title>DropOpolis - NFT Staking</title>
        <meta name="description" content="NFT Staking" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <main>{children}</main>
      {/* <Footer/> */}
    </>
  )
}