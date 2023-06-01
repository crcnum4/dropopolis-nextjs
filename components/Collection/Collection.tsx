import {FC} from 'react';
import { DropCollection } from '../../types/DropCollection';
import Link from 'next/link'

const Collection: FC<{collection: DropCollection}> = ({collection}) => {
  return (
    <Link href={`/collection/name/${collection.urlName}`}>
      <div className="w-1/2 p-2 min-w-[25rem]">
        <div className="bg-cover h-40 w-full rounded-lg my-2 bg-gray-600 cursor-pointer justify-center" style={{
          backgroundImage: `url(${collection.headerImage})`
        }}>
          <p className="text-3xl self-center my-4 font-bold text-blue-100" style={{
            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
          }}>
            {collection.name}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default Collection;