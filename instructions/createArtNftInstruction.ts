import {
  PublicKey,
  TransactionInstruction,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from '@solana/web3.js'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token2'
import { keyFormat } from './utils'
import { Serializer, Ux } from '../tools/serializer'

export type createArtNftKeys = {
  metadataPda: PublicKey,
  mint: PublicKey,
  royaltyOwner: PublicKey,
  mintAuthority: PublicKey,
  payer: PublicKey,
  updateAuthority: PublicKey,
  programId: PublicKey,
}

export type createArtNftData = {
  name: string,
  symbol: string,
  uri: string,
  resaleFee: number,
}

export const createArtNftInstruction = (keys: createArtNftKeys, data: createArtNftData): TransactionInstruction => {
  return new TransactionInstruction({
    programId: keys.programId,
    keys: [
      keyFormat.writable(keys.metadataPda),
      keyFormat.writable(keys.mint),
      keyFormat.readonly(keys.royaltyOwner),
      keyFormat.signOnly(keys.mintAuthority),
      keyFormat.full(keys.payer),
      keyFormat.readonly(keys.updateAuthority),
      keyFormat.readonly(SystemProgram.programId),
      keyFormat.readonly(SYSVAR_RENT_PUBKEY),
      keyFormat.readonly(TOKEN_PROGRAM_ID)
    ],
    data: Buffer.concat([
      Serializer.number(0, Ux.U8),
      Serializer.number(1, Ux.U8),
      Serializer.number(1, Ux.U8),
      Serializer.number(1, Ux.U8),
      Serializer.string(data.name),
      Serializer.string(data.symbol),
      Serializer.string(data.uri),
      Serializer.number(data.resaleFee, Ux.U16)
    ])
  })
}