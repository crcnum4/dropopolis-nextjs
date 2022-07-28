import BN from "bn.js"

export const serializeString = (str: string): Buffer =>{
  return Buffer.concat([
    Uint8Array.of(...new BN(str.length).toArray('le', 4)),
    Buffer.from(str)
  ])
}