import { PublicKey, SOLANA_SCHEMA } from '@solana/web3.js';
import BN from 'bn.js';
import {deserialize, serialize} from 'borsh';
import {Buffer} from 'buffer';
import { Stake } from './';

export type StakeVaultData = {
  isInitialized: number,
  ownerAccount: PublicKey,
  payoutAccount: PublicKey,
  config: PublicKey,
  lastEarningEstimate: BN,
  buffer: Buffer,
};

export class StakeVault {
  isInitialized: boolean;
  ownerAccount: PublicKey;
  payoutAccount: PublicKey;
  config: PublicKey;
  lastEarningEstimate: number;
  vault: Stake[];

  constructor(data: StakeVaultData) {
    this.isInitialized = data.isInitialized != 0;
    this.ownerAccount = new PublicKey(data.ownerAccount);
    this.payoutAccount = new PublicKey(data.payoutAccount);
    this.config = new PublicKey(data.config);
    this.lastEarningEstimate = data.lastEarningEstimate.toNumber();
    this.vault = [];
  }

  static decode(data: Buffer): StakeVault {
    const stakeVault = deserialize(SOLANA_SCHEMA, this, data);

    let offset = 1 + 32 + 32 + 32 + 8;
    let remaining = data.subarray(offset);
    if (remaining[0] == 0) {
      return stakeVault;
    }

    const stakeCount = remaining.subarray(1, 5).readUint32LE();
    remaining = remaining.subarray(5);
    for (let i = 0; i < stakeCount; i++) {
      let stake = Stake.decode(remaining.subarray(0, Stake.size))
      stakeVault.vault.push(stake);
      remaining = remaining.subarray(Stake.size)
    }

    return stakeVault;
  }

}

SOLANA_SCHEMA.set(StakeVault, {
  kind: "struct",
  fields: [
    ["isInitialized", "u8"],
    ["ownerAccount", [32]],
    ["payoutAccount", [32]],
    ["config", [32]],
    ["lastEarningEstimate", "u64"],
    ["buffer", "buffer"],
  ]
})