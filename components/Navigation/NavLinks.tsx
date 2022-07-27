import {FC} from 'react';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Button from '../common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

const NavLinks: FC = () => {
  const wallet = useWallet();

  return (
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
        <WalletMultiButton /> :
        <WalletDisconnectButton />
      } 
    </div>
  )
}

export default NavLinks;