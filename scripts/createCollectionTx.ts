import { PublicKey, Transaction } from "@solana/web3.js";
import { createCollectionInstruction, getCollectionPda } from "../instructions";


export const createCollectionTx = async (
  collectionProgramId: PublicKey,
  collectionName: string,
  collectionUri: string,
  publisher: PublicKey,
): Promise<[tx: Transaction, collectionPda: PublicKey]> => {
  // let collectionProgramId: String | PublicKey | undefined = process.env.NEXT_PUBLIC_REECOLLECTION_PROGRAM_ID;

  if (!collectionProgramId) {
    throw new Error("Missing collection program id");
  }
  // collectionProgramId = new PublicKey(collectionProgramId);

  const [collectionPda, _] = await getCollectionPda(
    collectionName,
    collectionProgramId,
    publisher
  );

  const ix = createCollectionInstruction({
    programId: new PublicKey(collectionProgramId),
    collectionPda,
    payer: publisher,
    publisher,
    uploaders: [publisher]
  }, {
    name: collectionName,
    uri: collectionUri,
  })

  const tx = new Transaction().add(ix);
  return [tx, collectionPda];
}