import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

const AuthTest: NextPage = () => {
  const [nonce, setNonce] = useState("");

  const wallet = useWallet();
  const {connection} = useConnection();

  useEffect(() => {
    const getNonce = async () => {
      if (!wallet) {
        return;
      }

      const url = "http://localhost:5000/api/accounts/";
      try {
        const res = await axios.post(url, {wallet: wallet.publicKey})
        console.log(res.data.nonce);
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

    getNonce();
  }, [wallet]);

  const authenticate = async () => {
    const timestamp = new Date().getTime()

    const message = `GET/accounts/myDetails${timestamp}${nonce}`
    if (!wallet.signMessage) {
      return;
    }

    const sig = await (await wallet.signMessage(new TextEncoder().encode(message)))

    console.log(JSON.stringify(sig))
    console.log(sig.toString())

    if (!wallet.publicKey) {
      return;
    }
    const url = `http://localhost:5000/api/accounts/myDetails`
    const res = await axios.get(url, {headers: {
      "drop-pubkey": wallet.publicKey.toString(),
      "drop-nonce": nonce,
      "drop-signature": JSON.stringify(sig),
      "drop-timestamp": timestamp
    }})

    console.log(res.data);
  }

  return (
    <div className="container mx-auto flex-col">
      {!wallet ? (
        <p>Connect the wallet</p>
      ) : (
        <>
          <p>nonce: {nonce}</p>
          <button onClick={authenticate}>get wallet data</button>
        </>
      )}
    </div>
  )
}

export default AuthTest;