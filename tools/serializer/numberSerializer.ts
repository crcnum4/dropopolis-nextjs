import  BN  from "bn.js"

export enum Ux {
  U8,
  U16,
  U32,
  U64,
  U128,
  U356,
  U512
}

const map = [1, 2, 4, 8, 16, 32, 54]

export const numberSerializer = (n: number, type: Ux): Buffer => {
  switch (type) {
    case Ux.U8:
      return Buffer.from([n])
    default:
      return Buffer.from(Uint8Array.of(...new BN(n).toArray('le', map[type])))
  }
}