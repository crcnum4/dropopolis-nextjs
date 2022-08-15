
import { FC, MouseEventHandler, useContext } from "react";
import axios from "axios";
import b58 from 'bs58'
import { AuthContext } from "../../components/providers/AuthProvider";
import Button from "./Button";


type AuthButtonProps = {
    type?: "button" | "submit" | "reset" | undefined,
    style?: React.CSSProperties | undefined,
    className?: string | undefined,
    onClick?: MouseEventHandler,
    disabled?: boolean | undefined,
    children: React.ReactNode
  }

const AuthButton: FC<AuthButtonProps> = (props) => {
  const {publicKey, nonce, signMessage} = useContext(AuthContext);

  const authenticate = async () => {
    const timestamp = new Date().getTime()
    const userText = "Authenticate to get wallet detalis"
    
    const sig = await signMessage("GET", "/api/accounts/myDetails", userText);
    
    if (!sig) {
      alert("Failed to sign authentication message");
      return;
    }

    if (!publicKey) {
      return;
    }

    const apiHost = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:5000";

    const url = `${apiHost}/api/accounts/myDetails`
    const res = await axios.get(url, {headers: {
      "drop-pubkey": publicKey.toBase58(),
      "drop-nonce": nonce,
      "drop-signature": b58.encode(sig),
      "drop-timestamp": timestamp,
      "drop-usertext": userText,
    }})

  }

  return (
    <Button onClick={authenticate}>Authenticate Your Wallet</Button>
  )
}

export default AuthButton;