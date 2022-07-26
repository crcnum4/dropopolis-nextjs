import React, { FC } from 'react'
import AboutModule from './AboutModule'
import Copyright from './Copyright'
import LinkModule from './LinkModule'
import SocialModule from './SocialModule'

type FooterProps = {
  style?: React.CSSProperties
}
const Footer: FC<FooterProps> = (props) => {
  return (
      <footer className="flex-1 py-7 .bt-black justify-center items-center flex-grow text-center" style={{...props.style}}>
        <div className='flex-row flex-wrap'>
            <AboutModule />
            <LinkModule />
            <SocialModule />
        </div>
        <hr className='mb-3' />
        <Copyright style={{}}/>
      </footer>
  )
}
export default Footer;