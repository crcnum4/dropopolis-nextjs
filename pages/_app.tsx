import '../styles/globals.css'
import type { AppProps } from 'next/app'
import SolanaProvider from '../components/providers/SolanaProvider';
import { MoralisProvider } from "react-moralis";
import Layout from '../components/Layout';

require('@solana/wallet-adapter-react-ui/styles.css');

function MyApp({ Component, pageProps }: AppProps) {

  const serverUrl = process.env.NEXT_PUBLIC_IPFS_URL || ''
  const appId = process.env.NEXT_PUBLIC_IPFS_APP_ID || ''
  
  return (
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <SolanaProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SolanaProvider>
    </MoralisProvider>
  )
}

export default MyApp
