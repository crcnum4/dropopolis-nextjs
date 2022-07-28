import React, { FC } from 'react'
import AboutModule from './AboutModule'
import Copyright from './Copyright'
import LinkModule from './LinkModule'
import SocialModule from './SocialModule'

type FooterProps = {
  style?: React.CSSProperties
}
const Footer: FC<FooterProps> = (props) => {
  // what does .bt-black do?
  return (
      <div className="flex-1 py-7 .bt-black justify-center items-center flex-grow text-center" style={{...props.style}}>
        <div 
          style={{
            width: '85vw',
            display: 'flex', flexDirection: 'row',
            flexWrap: 'wrap', justifyContent: 'space-between'
          }}
        >
            <AboutModule />
            <LinkModule />
            <SocialModule />
        </div>
        <hr className='my-5 w-full' />
        <Copyright />
      </div>
  )
}
export default Footer;