import React, {FC} from 'react';
import BorderCardHover from '../../common/BorderCardHover';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEllipsis} from '@fortawesome/free-solid-svg-icons'
import dynamic from 'next/dynamic';
import Button from '../../common/Button';
import profile from '../../../public/assets/profile.jpeg'
import nft from '../../../public/assets/44.png'
const CDTimer = dynamic(import('./CDTimer'), {ssr: false});

const currentDate = new Date();
const second = 1000;
const minute = second * 60;
const hour = minute * 60;

export type Drop = {
  id: number,
  creatorName: string,
  endTime: number,
  name: string,
  cost: number,
}

type LiveDropProps = {
  drop: Drop,
}

const LiveDrop: FC<LiveDropProps> = (props) => {

  const handleClick = () => {
    alert("selected");
  }


  return (
    <BorderCardHover
      onClick={handleClick}
    >
      <div className="flex-row items-center">
        <Image 
          alt="profile" 
          src={profile} 
          objectFit='cover' 
          height={40} 
          width={40} 
          className="rounded-full bg-gray-200"
        />
        <p className="flex-1 mx-3">{props.drop.creatorName}</p>
        {/* <p className="font-bold text-3xl">...</p> */}
        <FontAwesomeIcon icon={faEllipsis} size="lg" />
      </div>
      <div className="mx-8 my-4 bg-gray-300 rounded-xl relative" style={{minWidth: 200, maxHeight: 300, width: 'auto'}}>
        <Image 
          alt="The Future is Now."
          src={nft}
          objectFit="cover"
          className="rounded-xl"
        />
      </div>
      <div className='w-full items-center bg-transparent -mt-10 z-10 mb-2'>
        <CDTimer 
          targetTime={props.drop.endTime}
          className="bg-blue-200 p-3 rounded-xl"
        />
      </div>
      <h2 className="text-xl my-2">{props.drop.name}</h2>
      <h3 className="text-blue-500 text-xl font-bold my-2">{(props.drop.cost / 1000000).toLocaleString()} SOL</h3>
      <Button className='bg-blue-500 hover:bg-blue-700 text-white py-3 px-5 rounded-md w-full my-5'>Place Bid</Button>
    </BorderCardHover>
  )
}

export default LiveDrop;