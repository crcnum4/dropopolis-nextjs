
import {FC} from 'react';
import exampleJson from './example.json';
import SyntaxHighlighter from 'react-syntax-highlighter'

const SelfDocumentation: FC = () => {
  return (
    <>
    <hr />
      <h2 className='text-3xl font-bold my-4'>Documentation</h2>
      <h3 className="text-2xl font-bold my-3">JSON File Keys</h3>
      <p>
        These keys are supported and recognized by the REE Network. 
        Keys in red are required and will be verified.
      </p>
      <p>You can include as much additional data in the json file you wish however Dropopolis may not display the data.</p>
      <ul className="my-2 border p-3 pl-6 list-disc">
        <li className="text-red-700">
          name: name of the NFT
        </li>
        <li>
          symbol: Optional shorthand symbol for the NFT
        </li>
        <li>
          description: A discription of the NFT
        </li>
        <li>
          externalUrl: externalUrl related to the NFT usually an organization website
        </li>
        <li>
          <span className="text-red-700">properties: an object with the following supported keys</span>
          <ul className="ml-3 list-disc">
            <li>
              <span className="text-red-700">files: An array of objects with the following minimum keys</span>
              <ul className="ml-3 list-disc"> 
                <li className="text-red-700">
                  type: supported values: IMAGE | VIDEO | FILE {'->'} a Drop must have at least one IMAGE file
                </li>
                <li className="text-red-700">
                  uri: public URI of the file.
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>attributes: array of objects with the following keys:
          <ul className="ml-3 list-disc">
            <li>
              name: attribute name name
            </li>
            <li>
              value: the value for this property the NFT has.
            </li>
          </ul>
        </li>
      </ul>
      <h3 className="text-2xl my-3">Example Json</h3>
      <SyntaxHighlighter language="json" customStyle={{fontSize: '.9em'}}>
        {JSON.stringify(exampleJson, null, 2)}
      </SyntaxHighlighter>
    </>
  )
}

export default SelfDocumentation;