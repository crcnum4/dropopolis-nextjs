import {FC, useState} from 'react';
import { initialURoyaltyArtQuery, URoyaltyArtQuery } from '../../types/UploadTypes';
import LocalArtNftCard from '../Gallery/LocalArtNftCard';
import Reviewer from './Reviewer';

interface ReviewNftProps {
  potentialNfts: URoyaltyArtQuery[],
  updateNft: (index: number, data: URoyaltyArtQuery) => void
}

const ReviewNfts: FC<ReviewNftProps> = (props) => {
  const [selected, setSelected] = useState<number | null>(null);

  const onUpdate = (index: number, newData: URoyaltyArtQuery): boolean => {
    props.updateNft(index, newData);
    setSelected(null);
    return true;
  }

  const onClick = (index: number) => {
    setSelected(index);
    window.scrollTo(0, 0)
  }

  const displayPotentialNfts = () => {
    return props.potentialNfts.map((potentialNft, index) => 
      <LocalArtNftCard 
        nft={{
          imgUrl: potentialNft.img.url,
          name: potentialNft.name,
          symbol: potentialNft.symbol,
          description: potentialNft.description,
          externalUrl: potentialNft.externalUrl
        }}
        onClick={() => onClick(index)}
        key={potentialNft.name}
      />)
  }

  return (
    <div className="container mt-8 mx-auto">
      <Reviewer 
        active={selected != null} 
        index={selected != null ? selected : 0}
        existingQuery={
          selected != null 
            ? props.potentialNfts[selected] 
            : initialURoyaltyArtQuery
        }
        updateData={onUpdate}
      />
      <div className='flex-row w-full flex-wrap'>
        {displayPotentialNfts()}
      </div>
    </div>
  )

}

export default ReviewNfts