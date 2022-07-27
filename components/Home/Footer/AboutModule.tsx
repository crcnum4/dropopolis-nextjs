import React, { FC } from 'react'
import Copyright from './Copyright'
import Image from "next/image";

type AboutModuleProps = {
  style?: React.CSSProperties
  className?: string
}
const AboutModule: FC<AboutModuleProps> = (props) => {
  return (
    <div style={{...props.style}} className={props.className || "max-w-screen-sm text-left mb-8"}>
        <img src='/assets/dropopolis-logo.png' alt='' className='h-10 w-fit mb-6' />
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
    </div>
  )
}
export default AboutModule;