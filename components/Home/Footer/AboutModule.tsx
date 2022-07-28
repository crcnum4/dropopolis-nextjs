import React, { FC } from 'react'
import Image from "next/image";
import logoLg from '../../../public/assets/logoLg.png'

type AboutModuleProps = {
  style?: React.CSSProperties
  className?: string
}
const AboutModule: FC<AboutModuleProps> = (props) => {
  return (
    <div style={{...props.style}} className={props.className || "max-w-screen-sm text-left mb-8"}>
        <Image src={logoLg} alt='Dropopolir' className='h-10 w-fit mb-6' />
        <p>A real city in the Metaverse, built by & for YOU!</p>
    </div>
  )
}
export default AboutModule;