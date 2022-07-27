
import {
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

export default function WalletButtons () {
      
  
  const { publicKey } = useWallet();
    return (
        <>
        {publicKey ? 
            <WalletDisconnectButton style={{backgroundColor: 'green'}}/> : 
            <WalletMultiButton />
        }     
        </>
    )
}
