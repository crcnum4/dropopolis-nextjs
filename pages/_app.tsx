import '../styles/globals.css'
import type { AppProps } from 'next/app'
import SolanaProvider from '../components/providers/SolanaProvider';
import Layout from '../components/Layout';
import { AuthProvider } from '../components/providers/AuthProvider';

require('@solana/wallet-adapter-react-ui/styles.css');

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <SolanaProvider>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </SolanaProvider>
  )
}

export default MyApp
