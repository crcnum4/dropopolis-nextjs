import { PublicKey, SOLANA_SCHEMA } from '@solana/web3.js'
import {deserialize} from 'borsh'
import { Buffer } from 'buffer'

export type DispenserData = {
  authId: PublicKey,
  payoutMint: PublicKey,
  payoutAccount: PublicKey,
  creator: PublicKey,
  identifier: string,
}

export class Dispenser {
  authId: PublicKey;
  payoutMint: PublicKey;
  payoutAccount: PublicKey;
  creator: PublicKey;
  identifier: string;

  constructor(data: DispenserData) {
    this.authId = new PublicKey(data.authId);
    this.payoutMint = new PublicKey(data.payoutMint);
    this.payoutAccount = new PublicKey(data.payoutAccount);
    this.creator = new PublicKey(data.creator);
    this.identifier = data.identifier;
  }

  static decode(data: Buffer): Dispenser {
    const disp = deserialize(SOLANA_SCHEMA, this, data);
    return disp;
  }
}

SOLANA_SCHEMA.set(Dispenser, {
  kind: 'struct',
  fields: [
    ['authId', [32]],
    ['payoutMint', [32]],
    ['payoutAccount', [32]],
    ['creator', [32]],
    ['identifier', 'string'],
  ]
})