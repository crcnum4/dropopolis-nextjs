import React, { FC } from 'react'
import Image from "next/image";
import logo from '../../../public/assets/Logo.png'

type AboutModuleProps = {
  style?: React.CSSProperties
  className?: string
}
const AboutModule: FC<AboutModuleProps> = (props) => {
  return (
    <div style={{...props.style}} className={props.className || "max-w-screen-sm text-left mb-8 mx-10"}>
        <Image src={logo} alt='Dropopolis' className='h-10 w-fit' />
        <p className='mt-3'>A real city in the Metaverse, built by & for YOU!</p>
    </div>
  )
}
export default AboutModule;