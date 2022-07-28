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
import { clusterApiUrl } from '@solana/web3.js';

export const SolanaProvider: FC<{children: React.ReactNode}> = (props) => {
  const network = process.env.CLUSTER === "devnet" ?
    WalletAdapterNetwork.Devnet : WalletAdapterNetwork.Mainnet;

  const endpoint = useMemo(() => {
    switch (network) {
      case WalletAdapterNetwork.Devnet:
        return process.env.NEXT_PUBLIC_SOLANA_RPC_DEVNET || clusterApiUrl(network)
      case WalletAdapterNetwork.Mainnet:
        return process.env.NEXT_PUBLIC_SOLANA_RPC_MAINNET || clusterApiUrl(network)
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