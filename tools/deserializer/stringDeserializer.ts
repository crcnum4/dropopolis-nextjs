

export const deserializeString = (data: Buffer): string => {
  const strLength = data.subarray(0, 4).readUint32LE();
  const str = new TextDecoder().decode(data.subarray(4, 4 + strLength));

  return str;
}