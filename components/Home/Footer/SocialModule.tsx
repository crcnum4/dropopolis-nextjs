import React, { FC } from 'react'
import Copyright from './Copyright'

type SocialModuleProps = {
  style?: React.CSSProperties
  className?: string
}
const SocialModule: FC<SocialModuleProps> = (props) => {
  return (
    <div style={{...props.style}} className={props.className || ""}>
        <h4>Social Media</h4>
        {/* clickable icons */}
    </div>
  )
}
export default SocialModule;