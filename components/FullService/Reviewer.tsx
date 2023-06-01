import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useState } from "react";
import { initialURoyaltyArtQuery, URoyaltyArtQuery } from "../../types/UploadTypes";
import FullServiceForm from "./FullServiceForm";
import {faX} from '@fortawesome/free-solid-svg-icons'

interface ReviewerProps {
  active: boolean,
  existingQuery: URoyaltyArtQuery
  index: number,
  updateData: (index: number, newQuery: URoyaltyArtQuery) => boolean
}

const Reviewer: FC<ReviewerProps> = ({active, existingQuery, index, updateData}) => {
  const [query, setQuery] = useState<URoyaltyArtQuery>(existingQuery);

  useEffect(() => {
    console.log('effect Triggered');
    if (active) {
      setQuery(existingQuery)
    } else {
      setQuery(initialURoyaltyArtQuery)
    }
  }, [existingQuery, active, index])

  const onSubmit = async (nft: URoyaltyArtQuery) => {
    return updateData(index, nft);
  }

  switch (active) {
    case false:
      return (
        <h1>Select an NFT to Edit</h1>
      )
    case true:
      return (
        <div className="flex-col w-full">
          <div className="flex-row w-full">
            <h1 className="flex-1">Edit Nft Details</h1>
            <FontAwesomeIcon icon={faX} size="lg" onClick={() => updateData(index, existingQuery)} />
          </div>
          <FullServiceForm submit={onSubmit} existingNftData={query}/>
        </div>
      )
  }
}

export default Reviewer;