import { Connection, PublicKey } from '@solana/web3.js';
import { REEMETA_PROGRAM_ID } from '../statics/programIds';
import { NftMetadata } from '../types/NftMetadata';
import { getMetadataPda } from './getMetadataPda';

export const getNftMetadata = async(token: PublicKey, connection: Connection): Promise<NftMetadata | null> => {
  
  const nftPda = await getMetadataPda(token, REEMETA_PROGRAM_ID);

  let accountInfo = await connection.getAccountInfo(nftPda, 'confirmed');
  if (!accountInfo || accountInfo.owner != REEMETA_PROGRAM_ID || accountInfo.data.length === 0) {
    return null;
  }

  return NftMetadata.decode(accountInfo.data);

} 