import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { clusterApiUrl, Connection, Keypair, PublicKey, Signer, Transaction } from '@solana/web3.js'
import axios from 'axios'
import base58 from 'bs58'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import nacl from 'tweetnacl'
import { addItemToCollectionInstruction, AddPropertiesData, addPropertiesInstruction } from '../../instructions'
import { DROPOPAPIHOST, REECOLLECTION_PROGRAM_ID, REEMETA_PROGRAM_ID } from '../../statics/programIds'
import { CustomRequestBody } from '../../types/customApiRequest'
import { DropCollection, DropCollectionWithAuth } from '../../types/DropCollection'

export type AddCollectionApiArgs = {
  buyer: string,
  itemPda: string,
  collectionId: string,
  transaction: string,
  itemId: string,
}

export type ResponseData = {
  type: string,
  message: string,
  tx?: string,
}
const handler: NextApiHandler = async (
  req: CustomRequestBody<NextApiRequest, AddCollectionApiArgs>,
  res: NextApiResponse<ResponseData>
) => {
  const network = process.env.NEXT_PUBLIC_SOLANA_CLUSTER === "devnet" ? 
    WalletAdapterNetwork.Devnet : WalletAdapterNetwork.Mainnet;

  let endpoint; 
  switch (network) {
    case(WalletAdapterNetwork.Devnet) :
      endpoint = process.env.NEXT_PUBLIC_SOLANA_RPC_DEVNET || clusterApiUrl(network);
      break;
    case(WalletAdapterNetwork.Mainnet) :
      endpoint = process.env.NEXT_PUBLIC_SOLANA_RPC_MAINNET || clusterApiUrl(network);
  }
  const connection = new Connection(endpoint);

  const tx = Transaction.from(base58.decode(req.body.transaction));

  console.log(tx.instructions[2].programId.toString());

  if (!tx.instructions[2].programId.equals(REEMETA_PROGRAM_ID)) {
    return res.status(400).json({type: "Instruction", message: "Bad instruction in transaction"})
  }

  if (
    !tx.instructions[2].keys[0].pubkey.equals(new PublicKey(req.body.itemPda))
    || !tx.instructions[2].keys[6].pubkey.equals(new PublicKey(req.body.buyer))
  ) {
    return res.status(400).json({type: "Accounts", message: "bad accounts"})
  }

  const secretKey = process.env.SERVER_PRIVATE_KEY
  
  if (!secretKey) {
    return res.status(500).json({type: "Critical", message: "SERVER ERROR: server authentication missing. contact support."})
  }

  const keys = Keypair.fromSecretKey(base58.decode(secretKey));

  const timestamp = new Date().getTime();
  const userText = `Authentication of collection add ${req.body.collectionId}`;
  const message = `${userText}\nGET/api/collections/auth/id/${req.body.collectionId}${timestamp}`;

  const signature = nacl.sign.detached(new TextEncoder().encode(message), keys.secretKey)

  const url = `${DROPOPAPIHOST}/collections/auth/id/${req.body.collectionId}`;

  const result = await axios.get<{collection: DropCollectionWithAuth}>(
    url,
    {
      headers: {
        "drop-signature": base58.encode(signature),
        "drop-timestamp": timestamp,
        "drop-usertext": userText,
      }
    }
  )
  
  const collectionPda = new PublicKey(result.data.collection.pda);
  console.log('payer');
  const payer = new PublicKey(req.body.buyer)
  console.log('uploader');
  const uploader = new PublicKey(result.data.collection.authority.publicKey);
  console.log('toAdd');
  const toAdd = new PublicKey(req.body.itemPda)
  

  const addToCollectionIx = addItemToCollectionInstruction(
    {
      programId: REECOLLECTION_PROGRAM_ID,
      collectionPda,
      payer,
      uploader,
      toAdd,
    },
    {
      attributes: []
    },
  )

  console.log("hello");

  const authKeypair = Keypair.fromSecretKey(base58.decode(result.data.collection.authority.secret))

  const signer: Signer = {
    publicKey: authKeypair.publicKey,
    secretKey: authKeypair.secretKey,
  }

  console.log('sign transaction');
  tx.add(addToCollectionIx);
  tx.partialSign(signer);
  

  return res.json({type: "OK", message:"instruction added", tx: base58.encode(tx.serialize({verifySignatures: false}))})
}

export default handler;