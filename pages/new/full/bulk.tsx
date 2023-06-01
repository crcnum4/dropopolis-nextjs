import { NextPage } from "next"
import { Fragment, useState } from "react";
import Button from "../../../components/common/Button";
import Overlay from "../../../components/common/Overlay";
import BulkFSForm, { BulkFSQuery } from "../../../components/FullService/BulkFSForm";
import ReviewNfts from "../../../components/FullService/ReviewNfts";
import { initialURoyaltyArtQuery, URoyaltyArtQuery } from "../../../types/UploadTypes";

const FullBulk: NextPage = () => {
  const [uploadData, setUploadData] = useState<BulkFSQuery | null>(null);
  const [nftData, setNftData] = useState<URoyaltyArtQuery[]>([]);
  const [uploading, setUploading] = useState(false);
  const [overlayMessage, setOverlayMessage] = useState(false);

  const onSubmit = (data: BulkFSQuery, files: File[]) => {
    setUploadData(data);
    const generatedData: URoyaltyArtQuery[] = files.map((file, index) => {
      const query: URoyaltyArtQuery = initialURoyaltyArtQuery;
      query.img = {
        file,
        url: URL.createObjectURL(file)
      }
      switch(data.nameGenerationOption) {
        case "blank":
          break;
        case "file":
          query.name = file.name.substring(0, file.name.lastIndexOf('.'))
          break;
        case "prefix":
          query.name = `${data.name}-${index+1}`
          break;
        case "collection":
          query.name = `${data.collectionName}-${index+1}`
          break;
        default:
          query.name="";
      }
      query.description = data.descriptionOption ? data.description : "";
      query.symbol = data.symbolOption === "same" ? data.symbol : "";
      query.resaleFee = data.resaleFee.toString();
      query.externalUrl = data.projectUrl;
      return {...query}
    })

    console.log(generatedData);
    setNftData(generatedData);
  }

  const updatePotentialNft = (index: number, newNftData: URoyaltyArtQuery) => {
    nftData[index] = newNftData;
    setNftData(nftData);
  }

  return (
    <div className="container mx-auto mt-8 items-center">
      <Overlay active={uploading}>
        <p className="text-white text-xl">{overlayMessage}</p>
      </Overlay>
      {nftData.length === 0 ? (
        <Fragment>
          <h1 className={" text-lg font-bold"}>Step 1 of 2: Select Files and Default Values</h1>
          <BulkFSForm onSubmit={onSubmit} />
        </Fragment>
      ) : (
        <Fragment>
          <h1 className={" text-lg font-bold"}>Step 2 of 2: Review Generated NFTs</h1>
          <ReviewNfts potentialNfts={nftData} updateNft={updatePotentialNft} />
          <Button type="button" onClick={() => alert("in process")}>Create</Button>
        </Fragment>
      )}
    </div>
  ) 
}

export default FullBulk;