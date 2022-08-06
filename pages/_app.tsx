import '../styles/globals.css'
import type { AppProps } from 'next/app'
import SolanaProvider from '../components/providers/SolanaProvider';
import Layout from '../components/Layout';

require('@solana/wallet-adapter-react-ui/styles.css');

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <SolanaProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SolanaProvider>
  )
}

export default MyApp
