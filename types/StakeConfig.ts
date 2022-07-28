import { PublicKey, SOLANA_SCHEMA } from "@solana/web3.js";
import BN from 'bn.js'
import { deserialize } from "borsh";
import { Buffer } from "buffer";

export type StakeConfigData = {
  isInitialized: number;
  identifier: string;
  owner: Uint8Array;
  payCycle: Uint8Array;
  payValue: BN;
  payCurrency: Uint8Array;
  dispenser: Uint8Array;
  configKey: number;
  buffer: Buffer;
}

export class StakeConfig {
  isInitialized: boolean;
  identifier: string;
  owner: PublicKey;
  payCycle: number;
  payValue: number;
  payCurrency: PublicKey;
  dispenser: PublicKey;
  configKey: number;
  itemList: PublicKey[];

  constructor(data: StakeConfigData) {
    this.isInitialized = data.isInitialized != 0;
    this.identifier = data.identifier;
    this.owner = new PublicKey(data.owner);
    const view = new DataView(data.payCycle.buffer);
    this.payCycle = Number(view.getBigInt64(0, true));
    this.payValue = data.payValue.toNumber(),
    this.payCurrency = new PublicKey(data.payCurrency);
    this.dispenser = new PublicKey(data.dispenser);
    this.configKey = data.configKey;
    this.itemList = [];
  }

  static decode(data: Buffer): StakeConfig {
    const stakeConfig = deserialize(SOLANA_SCHEMA, this, data);

    let offset = 1 + 4 + stakeConfig.identifier.length + 32 + 8 + 8 + 32 + 32 + 1
    let remaining = data.slice(offset);
    if (remaining[0] == 0) {
      return stakeConfig;
    }

    const itemsCount = remaining.slice(1,5).readUint32LE();
    remaining = remaining.slice(5);
    for (let i = 0; i < itemsCount; i++) {
      stakeConfig.itemList.push(new PublicKey(remaining.slice(0, 32)))
      remaining = remaining.slice(32)
    }
    return stakeConfig;
  }

}

SOLANA_SCHEMA.set(StakeConfig, {
  kind: 'struct',
  fields: [
    ["isInitialized", "u8"],
    ["identifier", "string"],
    ['owner', [32]],
    ['payCycle', [8]],
    ['payValue', 'u64'],
    ['payCurrency', [32]],
    ['dispenser', [32]],
    ['configKey', 'u8'],
    ['buffer', 'buffer'],
  ]
})