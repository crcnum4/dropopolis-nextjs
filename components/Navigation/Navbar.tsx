import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {FC, useState} from 'react';
import Button from '../common/Button';
import {faBars, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import NavMenu from './NavMenu';
import Link from 'next/link';
import NavLinks from './NavLinks';
import logo from '../../public/assets/logo.png';

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
          <NavLinks/>
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