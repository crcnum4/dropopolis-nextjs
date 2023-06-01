import {FC, useState} from 'react';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Button from '../common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

const NavLinks: FC = () => {
  const [hover, setHover] = useState('')
  const wallet = useWallet();

  const handleHover = (target: string) => {
    setHover(target)
  }

  return (
    <div className="hidden lg:flex items-center flex-row">
      <div onMouseEnter={() => handleHover('drops')} onMouseLeave={() => handleHover("")} className='flex-col'>
          <p className="py-3 px-5 mx-1 my-4">Drops ▼</p>
        <div
          className={
            (hover === 'drops' ? 'flex' : 'hidden') + 
            ' absolute overflow-visible flex-col bg-white top-20 z-50 border-gray-800 border border-t-0'
          }
        >
          <Link href="/new/drop">
            <a className="py-3 px-5 mx-1 my-4">New</a>
          </Link>
          <Link href="/shop">
            <a className="py-3 px-5 mx-1 my-4">Shop</a>
          </Link>
          <Link href="/collections">
            <a className="py-3 px-5 mx-1 my-4">Collections</a>
          </Link>
          {
            wallet && wallet.publicKey ? 
            (<Link href={`/gallery/${wallet.publicKey.toString()}`}><a className="py-3 px-5 mx-1 my-4">Gallery</a></Link>)
            :
            null
          }
        </div>
      </div>

      <div>
        <Link href="/">
          <a className="py-3 px-5 mx-1 my-4">StakeHOUSE</a>
        </Link>
      </div>

      <div>
        <Link href="/">
          <a className="py-3 px-5 mx-1 my-4">About</a>
        </Link>
      </div>

      <Button className="py-3 px-5 mx-2 my-4">
        <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
      </Button>
      {wallet ? 
        <WalletMultiButton /> :
        <WalletDisconnectButton />
      } 
    </div>
  )
}

export default NavLinks;