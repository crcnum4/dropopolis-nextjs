import React, { FC } from 'react'
import Copyright from './Copyright'

type AboutModuleProps = {
  style?: React.CSSProperties
  className?: string
}
const AboutModule: FC<AboutModuleProps> = (props) => {
  return (
    <div style={{...props.style}} className={props.className || ""}>
        <img></img>
        <p></p>
    </div>
  )
}
export default AboutModule;