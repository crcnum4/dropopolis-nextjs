import React, {FC, useEffect, useState} from 'react';
import useDimensions from '../../hooks/useDimensions';
import Controls from './Controls';
import LiveDrop, { Drop } from './LiveDrop';

const currentDate = new Date();
const second = 1000;
const minute = second * 60;
const hour = minute * 60;

const dimensionMap = [1550, 1300, 800]

const mockDrops: Drop[] = [
  {
    id: 1,
    endTime: new Date(
      currentDate.getTime() + (2 * hour) + (34 * minute)
    ).getTime(),
    creatorName: "JimXVic",
    name: 'Abstract Nature',
    cost: 5_100000,
  },
  {
    id: 2,
    endTime: new Date(
      currentDate.getTime() + (5 * hour) + (8 * minute)
    ).getTime(),
    creatorName: "BunnyBun",
    name: "Extraterrestrial",
    cost: 4_500000,
  },
  {
    id: 3,
    endTime: new Date(
      currentDate.getTime() + (5 * hour) + (8 * minute)
    ).getTime(),
    creatorName: "Samantha W.",
    name: "Cute Animal",
    cost: 2_900000,
  },
  {
    id: 4,
    endTime: new Date(
      currentDate.getTime() + (7 * hour) + (47 * minute)
    ).getTime(),
    creatorName: "Jordan Nico",
    name: "Metaverser",
    cost: 5_100000
  },
  {
    id: 5,
    endTime: new Date(
      currentDate.getTime() + (7 * hour) + (34 * minute)
    ).getTime(),
    creatorName: "ToP Maxer",
    name: 'Reflective Sols',
    cost: 4_250000,
  },
  {
    id: 6,
    endTime: new Date(
      currentDate.getTime() + (8 * hour) + (8 * minute)
    ).getTime(),
    creatorName: "Maddy Polister",
    name: "Inner Beauty",
    cost: 1_100000,
  },
  {
    id: 7,
    endTime: new Date(
      currentDate.getTime() + (25 * hour) + (6 * minute)
    ).getTime(),
    creatorName: "Samantha W.",
    name: "Iterterrstrial",
    cost: 3_320000,
  },
  {
    id: 8,
    endTime: new Date(
      currentDate.getTime() + (50 * hour) + (28 * minute)
    ).getTime(),
    creatorName: "Nico Bellor",
    name: "The Future",
    cost: 12_300000
  }
]

const LiveDrops: FC = () => {

  
  const [drops, setDrops] = useState<Drop[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const {width, height} = useDimensions();
  
  const getDropCount = () => {
    if (!width) return 0;
    if (width > dimensionMap[0]) return 4;
    if (width > dimensionMap[1]) return 3;
    if (width > dimensionMap[2]) return 2;
    return 1;
  }

  const [dropCount, setDropCount] = useState<number>(getDropCount());

  useEffect(() => {
    setDropCount(getDropCount);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])

  useEffect(() => {
    const start = page * dropCount;
    setDrops(mockDrops.slice(start, start+dropCount))

  }, [page, dropCount])

  const onPageChange = (value: 1 | -1) => {
    setPage(page + value);
  }

  const displayDrops = () => {
    return drops.map(drop => <LiveDrop drop={drop} key={drop.id} />)
  }

  return (
    <div>
      <div className='flex-row my-10'>
        <div className='flex-1 flex-col'>
          <h1 className="font-bold text-5xl my-2">Live Drops</h1>
          {/* below text is stringed because NFT is getting flagget as an error by vsCode */}
          <p className="my-2 text-gray-500">{"View and Buy NFT's Dropping Now"}</p>
        </div>
        <div onClick={() => alert("more to come")} className="hover:cursor-pointer">
          <h1 className="text-2xl my-auto">More Drops</h1>
        </div>
      </div>
      <div className="flex-row justify-between">
        {displayDrops()}
      </div>
      <div className='w-full items-center my-2'>
        <Controls 
          hasMore={page * dropCount < mockDrops.length - dropCount} 
          page={page}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  )
}

export default LiveDrops