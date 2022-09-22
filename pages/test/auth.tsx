import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import b58 from 'bs58'
import { AuthContext } from "../../components/providers/AuthProvider";
import Button from "../../components/common/Button";
import { getWalletNftCollection } from "../../scripts/getWalletNftCollection";
import { Keypair } from "@solana/web3.js";

const AuthTest: NextPage = () => {
  // const [nonce, setNonce] = useState("");
  const wallet = useWallet();
  const {connection} = useConnection();
  // const {publicKey} = wallet;
  const { nonce, authenticateWallet, token} = useContext(AuthContext);

  console.log(token);
  const authenticate = async () => {
    if (!wallet || !wallet.publicKey) {
      alert("Wallet not connected");

    }
    const activeToken = authenticateWallet();
    console.log('activetoken', activeToken);
  }

  const getTokenAcconts = async () => {
    // if (!wallet.publicKey) {
    //   console.error("Login");
    //   return
    // }
    // await getWalletNftCollection(wallet.publicKey, connection)

    const keys = Keypair.generate();
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