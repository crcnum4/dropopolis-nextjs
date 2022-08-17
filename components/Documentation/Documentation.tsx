import {FC, MouseEventHandler, useState} from 'react';
import exampleJson from '../SelfService/example.json';
import SyntaxHighlighter from 'react-syntax-highlighter'
import NftMetaDataJson from './NftMetadataJson';
import Topic from './Topic';



const SelfDocumentation: FC = () => {

  const [topic, setTopic] = useState("");

  const changeTopic = (id: string): void =>{
    setTopic(id); 
  }

  const displayTopic = () =>{
    switch (topic) {
      case "NftJson":
        return <NftMetaDataJson />
      default:
        return <p>Select a topic</p>
    }
  }

  return (
    <div>
      <h2 className='text-3xl font-bold my-4'>Documentation</h2>
      <div className="flex-row container mx-auto border border-gray-500 min-h-[500px]">
        <div className="flex-1 flex-col border border-gray-500"> 
          <Topic 
            label='NFT Json Data'
            id="NftJson"
            active={topic === "NftJson"}
            onClick={changeTopic}
          />
          <Topic 
            label='Collection Data'
            id="ColJson"
            active={topic === "ColJson"}
            onClick={changeTopic}
          />
        </div>
        <div className="flex-col flex-[5] border border-gray-500 p-2">
          {displayTopic()}
        </div>
      </div>
    </div>
  )
}

export default SelfDocumentation;