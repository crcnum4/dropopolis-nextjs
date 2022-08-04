import { programs } from "@metaplex/js"
import { PublicKey } from "@solana/web3.js"
import OffChainMetadata from "./OffChainMetadata"

export type CollectionNft = {
  tokenAccount: PublicKey,
  metadata: programs.metadata.Metadata,
  offChainMeta: OffChainMetadata
}