import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faTwitter, faFacebook, faTelegram } from '@fortawesome/free-brands-svg-icons';
import React, { FC } from 'react'
import Copyright from './Copyright'

type SocialModuleProps = {
  style?: React.CSSProperties
  className?: string
}

const SocialModule: FC<SocialModuleProps> = (props) => {
  return (
    <div style={{...props.style}} className={props.className || ''}>
        <p className='font-bold text-xl text-left mb-4 text-gray-700'>Social Media</p>
        <div className='flex-row flex-wrap justify-between'>
          <a
            href='https://dropopolis.com' target="_blank" rel="noopener noreferrer" 
            className='m-1 mt-0'
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a
            href='https://dropopolis.com' target="_blank" rel="noopener noreferrer"
            className='m-1 mt-0'
          >
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
          <a
            href='https://dropopolis.com' target="_blank" rel="noopener noreferrer"
            className='m-1 mt-0'
          >
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a
            href='https://dropopolis.com' target="_blank" rel="noopener noreferrer"
            className='m-1 mt-0'
          >
            <FontAwesomeIcon icon={faTelegram} size="2x" />
          </a>
        </div>
    </div>
  )
}
export default SocialModule;