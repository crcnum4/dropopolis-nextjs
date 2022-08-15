import Image from "next/image";
import splashImg from '../../public/assets/background_e.png'
import Button from "../common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCompass} from '@fortawesome/free-solid-svg-icons'
import { FC } from "react";

const Splash: FC = () => {
  return (
    <div className="w-full flex flex-row container mx-auto">
        <div className="flex-1 justify-center py-6">
          <h1 className="text-blue-700 font-bold normal text-7xl splash-text">
            Friends, Metas, Droppers...
          </h1>
          <h2 className="text-pink-500 font-bold text-7xl splash-text">
            The Future is HERE.
          </h2>
          <div className="my-5 text-gray-500 text-xl">
            <p >A real city in the Metaverse, built by & for YOU!</p>
            <p>Phase 1: NFT Drops</p>
          </div>
          <Button 
            className="bg-blue-500 hover:bg-blue-700 text-white py-3 px-5 rounded-md w-fit my-5"
            onClick={() => {}}
          >
            <p><FontAwesomeIcon icon={faCompass} className="pr-2"/> Explore Drops</p>
          </Button>
        </div>
        <div className="flex-1 invisible md:visible">
          <Image 
            alt="The Future is Now."
            src={splashImg}
            />
        </div>
    </div>
  )
}

export default Splash;