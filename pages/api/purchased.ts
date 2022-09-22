import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token2";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl, Connection, SystemProgram, ParsedInstruction, PartiallyDecodedInstruction, PublicKey, Keypair } from "@solana/web3.js";
import axios from "axios";
import base58 from "bs58";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import reactSyntaxHighlighter from "react-syntax-highlighter";
import nacl from "tweetnacl";
import { DROPOPAPIHOST, REEMETA_PROGRAM_ID } from "../../statics/programIds";
import { CustomRequestBody } from "../../types/customApiRequest";

export type DataRequest = {
  buyer: string,
  pda: string,
  itemId: string,
  mint: string,
  signature: string,
  kind: "escrow" | "mint",
}

export type MessageRes = {
  message: string,
}

const handler: NextApiHandler = async (
  req: CustomRequestBody<NextApiRequest, DataRequest>,
  res: NextApiResponse<MessageRes>
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
  console.log(req.body);

  const tx = await connection.getParsedTransaction(req.body.signature, 'confirmed');

  if (!tx) {
    return res.status(400).json({message: "Transaction not found"})
  }

  if (tx.meta && tx.meta.err) {
    return res.status(400).json({message: "Transaction Failed"})
  }

  // this is the mint validation not currently do not 

  if (tx.transaction.message.instructions.length < 7) {
    return res.status(400).json({message: "Invalid Transaction -> wrong instruction count."})
  }

  console.log('type')
  const instructions = tx.transaction.message.instructions as PartiallyDecodedInstruction[];
  // console.log(tx.transaction.message.instructions[2] as ParsedInstruction);
  

  if (
    !instructions[0].programId.equals(SystemProgram.programId)
    || !instructions[1].programId.equals(TOKEN_PROGRAM_ID)
    || !instructions[2].programId.equals(REEMETA_PROGRAM_ID) 
    || !instructions[3].programId.equals(REEMETA_PROGRAM_ID) 
    || !instructions[4].programId.equals(ASSOCIATED_TOKEN_PROGRAM_ID) 
    || !instructions[5].programId.equals(REEMETA_PROGRAM_ID) 
    || !instructions[6].programId.equals(REEMETA_PROGRAM_ID)
  ) {
    return res.status(400).json({message: "Invalid Transaction"})
  }
  
  // for (let i = 0; i < instructions[2].accounts.length; i++) {
  //   console.log(`account ${i}: ${instructions[2].accounts[i].toString()}`);
  // }

  if (
    !instructions[2].accounts[0].equals(new PublicKey(req.body.pda))
    || !instructions[2].accounts[6].equals(new PublicKey(req.body.buyer))
  ) {
    return res.status(400).json({message: "Invalid Transaction -> instruction 3 mismatched data"})
  }

  const secretKey = process.env.SERVER_PRIVATE_KEY

  if (!secretKey) {
    return res.status(500).json({message: "Secret key missing"});
  }

  const keys = Keypair.fromSecretKey(base58.decode(secretKey));

  console.log(keys.publicKey.toString())

  // if all tests pass send the delete store item method to the server.
  const timestamp = new Date().getTime()
  const message = `purchase of item ${req.body.pda}\nDELETE/api/items/purchased/${req.body.itemId}${timestamp}`;

  const signature = nacl.sign.detached(new TextEncoder().encode(message), keys.secretKey)

  const url = `${DROPOPAPIHOST}/items/purchased/${req.body.itemId}`;

  const result = await axios.delete(url, {
    headers: {
      "drop-signature": base58.encode(signature),
      "drop-timestamp": timestamp,
      "drop-usertext": `purchase of item ${req.body.pda}`,
    },
    data: {
      mint: req.body.mint,
      pda: req.body.pda,
    }
  })
 
  return res.json({message: "purchase sucessful"})
}


export default handler;