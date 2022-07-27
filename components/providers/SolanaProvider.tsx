import React, {FC, useMemo} from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { createDefaultAuthorizationResultCache, SolanaMobileWalletAdapter } from '@solana-mobile/wallet-adapter-mobile';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

export const SolanaProvider: FC<{children: React.ReactNode}> = (props) => {
  const network = process.env.CLUSTER === "devnet" ?
    WalletAdapterNetwork.Devnet : WalletAdapterNetwork.Mainnet;

  const endpoint = useMemo(() => {
    switch (network) {
      case WalletAdapterNetwork.Devnet:
        return "https://long-twilight-glade.solana-devnet.quiknode.pro/6db5d4e8dfde1507063a5393d31dda811177a5ac/"
      case WalletAdapterNetwork.Mainnet:
        return "https://empty-misty-firefly.solana-mainnet.quiknode.pro/6d7f6bacb644285615b4a0a26ebf763d8000c1fe/"
    }
  }, [network])

  const wallets = useMemo(
    () => [
      new SolanaMobileWalletAdapter({
        appIdentity: {name: 'Dropopolis'},
        authorizationResultCache: createDefaultAuthorizationResultCache(),
        cluster: network
      }),
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
    ],
    [network]
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          {props.children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default SolanaProvider