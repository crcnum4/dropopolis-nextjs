import React, { FC } from 'react'
import Image from "next/image";
import router from 'next/router';
const logo = '/assets/logo.png'

type AboutModuleProps = {
  style?: React.CSSProperties
  className?: string
}
const AboutModule: FC<AboutModuleProps> = (props) => {
  return (
    <div style={{...props.style}} className={props.className || "max-w-screen-sm text-left mb-8 mx-10 my-6"}>
        <div className="relative w-fill h-10  cursor-pointer " onClick={() => router.push('/')}>
            <Image src={logo} alt='Dropopolis' layout='fill' objectFit='contain'></Image>
        </div>
        <p className='mt-3'>A real city in the Metaverse, built by & for YOU!</p>
    </div>
  )
}
export default AboutModule;