import { useWallet } from '@solana/wallet-adapter-react';
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';
import {FC} from 'react';

const NavMenu: FC = () => {
  const wallet = useWallet();

  return (

    <div 
      className="lg:hidden absolute top-[80px] right-[50px] md:right-[175px] bg-gray-300 border shadow-lg z-20 flex flex-col justify-evenly items-center rounded-b-xl"
    >
      <ul className="flex flex-col items-center justify-between min-h-[250px] text-lg">
        <li className="border-b border-gray-400 m-3 uppercase">
          <Link href="/">
            <a>
              Drops
            </a>
          </Link>
        </li>
        <li className="border-b border-gray-400 m-3 uppercase">
          <Link href="/">
            <a>
              StakeHOUSE
            </a>
          </Link>
        </li>
        <li className="border-b border-gray-400 m-3 uppercase">
          <Link href="/">
            <a>
              About
            </a>
          </Link>
        </li>
        <li className="border-b border-gray-400 m-3 uppercase">
          {wallet ? 
            <WalletMultiButton /> :
            <WalletDisconnectButton />
          } 
        </li>
      </ul>

    </div>
  )
}

export default NavMenu