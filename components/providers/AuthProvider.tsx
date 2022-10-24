import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import axios, { AxiosError } from 'axios';
import { Context, createContext, FC, PropsWithChildren, Provider, useEffect, useState } from 'react';
import b58 from 'bs58'

interface TAuthContext {
  publicKey: PublicKey | null,
  nonce: string,
  signMessage: (
    method: "GET" | "POST" | "DELETE" | "PUT", 
    endpoint: string, 
    userText: string,
    timestamp: number,
  ) => Promise<Uint8Array | null>,
  authenticateWallet: () => Promise<string>,
  token: string,
}

const defaultContext: TAuthContext = {
  publicKey: null,
  nonce: "",
  signMessage: async () => {return null},
  authenticateWallet: async () => {return ""},
  token: "",
}

export const AuthContext = createContext<TAuthContext>(defaultContext);

export const AuthProvider: FC<PropsWithChildren> = (props) => {
  const wallet = useWallet();
  const [publicKey, setPublicKey] = useState(wallet.publicKey);
  const [nonce, setNonce] = useState("");
  const [token, setToken] = useState("");

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
        console.log(error.response?.data.message)
        return
      }
      console.log(err);
    }
  }

  const authenticateWallet = async () => {
    const timestamp = new Date().getTime()
    const userText = "Authenticate wallet for secure actions";
    const sig = await signMessage("POST", "/api/accounts/authenticate", userText, timestamp);
    if (!sig) {
      alert("Failed to sign authentication message");
      return "";
    }

    if (!publicKey) {
      alert("Connect Wallet");
      return "";
    }

    const url = `http://localhost:5000/api/accounts/authenticate`
    const res = await axios.post(url, {}, {headers: {
      "drop-pubkey": publicKey.toBase58(),
      "drop-nonce": nonce,
      "drop-signature": b58.encode(sig),
      "drop-timestamp": timestamp,
      "drop-usertext": userText,
    }})

    setToken(res.data.token);
    return res.data.token;
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
    timestamp: number,
  ) => {
    // const timestamp = new Date().getTime();
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
    <AuthContext.Provider value={{publicKey, nonce, signMessage, authenticateWallet, token}}>
      {props.children}
    </AuthContext.Provider>
  )

}