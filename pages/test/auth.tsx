import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import b58 from 'bs58'
import { AuthContext } from "../../components/providers/AuthProvider";
import Button from "../../components/common/Button";
import { getWalletNftCollection } from "../../scripts/getWalletNftCollection";

const AuthTest: NextPage = () => {
  // const [nonce, setNonce] = useState("");
  const wallet = useWallet();
  const {connection} = useConnection();
  // const {publicKey} = wallet;
  const {publicKey, nonce, signMessage} = useContext(AuthContext);

  const authenticate = async () => {
    const timestamp = new Date().getTime()
    const userText = "Authenticate to get wallet detalis"
    
    const sig = await signMessage("GET", "/api/accounts/myDetails", userText, timestamp);
    
    if (!sig) {
      alert("Failed to sign authentication message");
      return;
    }

    if (!publicKey) {
      return;
    }
    const url = `http://localhost:5000/api/accounts/myDetails`
    const res = await axios.get(url, {headers: {
      "drop-pubkey": publicKey.toBase58(),
      "drop-nonce": nonce,
      "drop-signature": b58.encode(sig),
      "drop-timestamp": timestamp,
      "drop-usertext": userText,
    }})

    console.log(res.data);
  }

  const getTokenAcconts = async () => {
    if (!wallet.publicKey) {
      console.error("Login");
      return
    }
    await getWalletNftCollection(wallet.publicKey, connection)
  }

  return (
    <div className="container mx-auto flex-col">
      {!wallet ? (
        <p>Connect the wallet</p>
      ) : (
        <>
          <p>nonce: {nonce}</p>
          <button onClick={authenticate}>get wallet data</button>
          <Button onClick={getTokenAcconts}>get Token Accounts</Button>
        </>
      )}
    </div>
  )
}

export default AuthTest;