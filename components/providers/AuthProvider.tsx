import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import axios, { AxiosError } from 'axios';
import { Context, createContext, FC, PropsWithChildren, Provider, useEffect, useState } from 'react';

interface TAuthContext {
  publicKey: PublicKey | null,
  nonce: string,
  signMessage: (
    method: "GET" | "POST" | "DELETE" | "PUT", endpoint: string, userText: string
  ) => Promise<Uint8Array | null>,
}

const defaultContext: TAuthContext = {
  publicKey: null,
  nonce: "",
  signMessage: async () => {return null}
}

export const AuthContext = createContext<TAuthContext>(defaultContext);

export const AuthProvider: FC<PropsWithChildren> = (props) => {
  const wallet = useWallet();
  const [publicKey, setPublicKey] = useState(wallet.publicKey);
  const [nonce, setNonce] = useState("");

  // set publickey
  useEffect(() => {
    if (!wallet || !wallet.publicKey) {
      console.log('something missing')
      return;
    }
    if (wallet.publicKey === publicKey) {
      console.log("no pubkey change")
      return;
    }
    setPublicKey(wallet.publicKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);

  const getNonce = async () => {
    console.log('get nonce')
    if (!publicKey) {
      console.log('no pubkey');
      return;
    }
    const url = `${process.env.NEXT_PUBLIC_API_HOST || ""}/api/accounts/`;
    try { 
      const res = await axios.post(url, {wallet: publicKey})
        setNonce(res.data.nonce)
    } catch (err: Error | AxiosError<{message: string}> | any) {
      if(axios.isAxiosError(err)) {
        const error = err as AxiosError<{message: string}> ;
        console.log(error.response?.data?.message)
        return
      }
      console.log(err);
    }
  }

  //update nonce if pubkey changes
  useEffect(() => {
    getNonce();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey])

  const signMessage = async (
    method: "GET" | "POST" | "DELETE" | "PUT",
    endpoint: string,
    userText: string,
  ) => {
    const timestamp = new Date().getTime();
    const message = `${userText}\n${method}${endpoint}${timestamp}${nonce}`

    if (!publicKey) {
      return null;
    }

    if (!wallet.signMessage) {
      return null;
    }

    const sig = await wallet.signMessage(new TextEncoder().encode(message))

    return sig;
  }

  return (
    <AuthContext.Provider value={{publicKey, nonce, signMessage}}>
      {props.children}
    </AuthContext.Provider>
  )

}