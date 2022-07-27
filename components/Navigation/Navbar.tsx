import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {FC, useState} from 'react';
import logo from '../../public/assets/Logo.png';
import Button from '../common/Button';
import {faBars, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import NavMenu from './NavMenu';
import Link from 'next/link';

const Navbar: FC = () => {
  const [showMenu, setShowMenu] = useState(false)
  const router = useRouter();
  const wallet = useWallet();

  
  return (
    <nav className="bg-white shadow-lg flex-row">
      <div className="flex-row md:mx-28 px-4 justify-between ">
          <div className="space-x-7 cursor-pointer justify-center" onClick={() => router.push('/')}>
            <Image 
              alt="Dropopolis"
              src={logo}
            />
          </div>
          <div className="hidden lg:flex items-center flex-row">
            <Link href="/" >
              <a className="py-3 px-5 mx-1 my-4">New Drops</a>
            </Link>

            <Link href="/">
              <a className="py-3 px-5 mx-1 my-4">Featured Drops</a>
            </Link>

            <Link href="/">
              <a className="py-3 px-5 mx-1 my-4">StakeHOUSE</a>
            </Link>

            <Link href="/">
              <a className="py-3 px-5 mx-1 my-4">About</a>
            </Link>

            <Link href="/">
              <a className="py-3 px-5 mx-1 my-4">Contact</a>
            </Link>

            <Button className="py-3 px-5 mx-2 my-4">
              <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
            </Button>
            {wallet ? 
              <WalletMultiButton className='mx-2'/> :
              <WalletDisconnectButton className="mx-2"/>
            } 
          </div>
          <div className="lg:hidden items-center flex-row">
            {/* mobile menu button */}
            <Button 
              className="py-3 px-5 my-2 md:my-4" 
              onClick={() => setShowMenu(!showMenu)}
            >
              <FontAwesomeIcon icon={faBars} size="lg"/>
            </Button>
            {/* search icon */}
            <Button className="py-3 px-5 mx-4 my-4">
              <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
            </Button>
          </div>
      </div>
      {showMenu ? <NavMenu /> : null}
    </nav>
  )
}

export default Navbar