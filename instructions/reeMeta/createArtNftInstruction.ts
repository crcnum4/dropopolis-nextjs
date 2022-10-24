import {
  PublicKey,
  TransactionInstruction,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from '@solana/web3.js'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token2'
import { keyFormat } from '../utils'
import { Serializer, Ux } from '../../tools/serializer'

export type CreateArtNftKeys = {
  metadataPda: PublicKey,
  mint: PublicKey,
  royaltyOwner: PublicKey,
  mintAuthority: PublicKey,
  newMintAuthority: PublicKey,
  payer: PublicKey,
  updateAuthority: PublicKey,
  programId: PublicKey,
  collectionKey?: PublicKey
}

export type CreateArtNftData = {
  name: string,
  symbol: string,
  uri: string,
  resaleFee: number,
}

export const createArtNftInstruction = (keys: CreateArtNftKeys, data: CreateArtNftData): TransactionInstruction => {

  const keyList = [
    keyFormat.writable(keys.metadataPda),
    keyFormat.writable(keys.mint),
    keyFormat.readonly(keys.royaltyOwner),
    keyFormat.signOnly(keys.mintAuthority),
    keyFormat.readonly(keys.newMintAuthority),
    keyFormat.full(keys.payer),
    keyFormat.readonly(keys.updateAuthority),
    keyFormat.readonly(SystemProgram.programId),
    keyFormat.readonly(SYSVAR_RENT_PUBKEY),
    keyFormat.readonly(TOKEN_PROGRAM_ID)
  ]

  if (keys.collectionKey) {
    keyList.push(keyFormat.readonly(keys.collectionKey))
  }

  return new TransactionInstruction({
    programId: keys.programId,
    keys: keyList,
    data: Buffer.concat([
      Serializer.number(0, Ux.U8),
      Serializer.number(1, Ux.U8),
      Serializer.number(1, Ux.U8),
      Serializer.number(1, Ux.U8),
      Serializer.number((keys.collectionKey ? 1 : 0), Ux.U8),
      Serializer.string(data.name),
      Serializer.string(data.symbol),
      Serializer.string(data.uri),
      Serializer.number(data.resaleFee, Ux.U16)
    ])
  })
}