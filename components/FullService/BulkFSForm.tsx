import {ChangeEventHandler, FC, Fragment, useEffect, useRef, useState} from 'react';
import { receiveMessageOnPort } from 'worker_threads';
import Button from '../common/Button';
import Form from '../common/Form';
import InlineInputContainer from '../common/InlineInputContainer';
import Input from '../common/Input';
import ToggleFa from '../common/ToggleFa';

interface FSBulkProps {
  onSubmit: (data: BulkFSQuery, files: File[]) => void
}

export interface BulkFSQuery {
  isCollection: boolean,
  nameGenerationOption: "blank" | "file" | "prefix" | "collection",
  descriptionOption: boolean,
  symbolOption: "none" | "blank" | "same",
  name: string,
  description: string,
  symbol: string,
  collectionName: string
  resaleFee: number,
  projectUrl: string,
}

const defaultQuery:BulkFSQuery = {
  isCollection: false,
  nameGenerationOption: "file",
  descriptionOption: true,
  symbolOption: "none",
  name: "",
  description: "",
  symbol: "",
  collectionName: "",
  resaleFee: 5,
  projectUrl: ""
}

const acceptedFiles = ["image/png", "image/git", "image/jpeg"];

const BulkFSForm: FC<FSBulkProps> = (props) => {
  const [query, setQuery] = useState<BulkFSQuery>(defaultQuery)
  const [files, setFiles] = useState<File[]>([]);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.setAttribute('directory', "");
      ref.current.setAttribute('webkitdirectory', '');
    }
  },[ref])
  
  const onSubmit = () => {
    props.onSubmit(query, files);
  }

  const handleChange = (field: string, value: any) => {
    setQuery({
      ...query,
      [field]: value
    })
  }

  const handleFormChage: ChangeEventHandler<HTMLInputElement> = (e) => {
    handleChange(e.target.id, e.target.value)
  } 

  const onFolderSelect:ChangeEventHandler<HTMLInputElement> = (e) => {
    if(e.target.files && e.target.files.length > 0) {
      const imageFiles: File[] = [];
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        if (acceptedFiles.includes(file.type)) {
          imageFiles.push(file);
        }
      }
      setFiles(imageFiles);
      // loop through target files and only save types of "image/*"
    }
  }

  const handleClick = () => {
    if (ref.current !== null) {
      ref.current?.click();
    }
  }

  const displayFileNames = () => {
    return files.map(file => {
      const index = file.name.lastIndexOf('.');
      const name = file.name.substring(0,index);
      return <p key={name}>{name}</p>
    })
  }

  const labelClass = "self-start"

  return (
      <div className="container mx-auto mt-8 items-center flex-row">
        <div className="flex flex-1 flex-col px-2">
          <Form onSubmit={onSubmit}>
            <InlineInputContainer style={{alignItems:'center'}}>
              <Button 
                type="button" 
                onClick={handleClick}
                className="bg-gray-300 hover:bg-gray-400 py-2 px-3 rounded-md w-fit my-5"
              >
                  Select Folder
              </Button>
              <p className="p-3">{files ? `You have selected ${files.length} images` : "Click to select a folder"}</p>
              <input type='file' id='files' ref={ref} onChange={onFolderSelect} className="hidden" />
            </InlineInputContainer>
            <h1 className={labelClass}>Is this a collection?</h1>
            <InlineInputContainer>
              <ToggleFa 
                label={query.isCollection ? "Yes": "No"}
                active={query.isCollection}
                id="CollectionOption"
                onChange={() => handleChange("isCollection", !query.isCollection)}
              />
            </InlineInputContainer>
            {query.isCollection ? (
              <InlineInputContainer>
                <Input 
                  placeholder='Collection Name'
                  value={query.collectionName}
                  id="collectionName"
                  required
                  onChange={handleFormChage}
                />
              </InlineInputContainer>
            ) : null}
            <h1 className='self-start'>NFT default name generation</h1>
            <InlineInputContainer>
              <ToggleFa 
                label="Use File Name (easiest)"
                active={query.nameGenerationOption === "file"}
                id="fileName"
                onChange={() => handleChange("nameGenerationOption", "file")}
              />
              <ToggleFa 
                label="Prefix (text-#) "
                active={query.nameGenerationOption === "prefix"}
                id="prefixName"
                onChange={() => handleChange("nameGenerationOption", "prefix")}
              />
              <ToggleFa 
                label="Name Each Individually (hardest)"
                active={query.nameGenerationOption === "blank"}
                id="blankName"
                onChange={() => handleChange("nameGenerationOption", "blank")}
              />
              {/* add collection toggle */}
            </InlineInputContainer>
            {query.nameGenerationOption === "prefix" ? (
              <InlineInputContainer>
                <Input 
                  placeholder='Prefix text'
                  value={query.name}
                  id="name"
                  onChange={handleFormChage}
                />
              </InlineInputContainer>
            ) : null}
            <h1 className={labelClass}>Default description click the toggle if each NFT should have a unique description (added in next step)</h1>
            <InlineInputContainer>
              <ToggleFa 
                label={query.descriptionOption ? "Generic Description (easiest)": "Unique Description (hardest)"}
                active={query.descriptionOption}
                id="descOption"
                onChange={() => handleChange("descriptionOption", !query.descriptionOption)}
              />
            </InlineInputContainer>
            <InlineInputContainer>
              {query.descriptionOption ? (
                <Input 
                  placeholder='Description'
                  value={query.description}
                  id='description'
                  onChange={handleFormChage}
                />
              ) : (
                <p>You will enter this in the next step</p>
              )}
            </InlineInputContainer>
            <h1 className={labelClass}>Abbreviation Letters? (if you do not know what this is leave None)</h1>
            <InlineInputContainer>
              <ToggleFa 
                label="None"
                active={query.symbolOption === "none"}
                id="symbolNone"
                onChange={() => handleChange("symbolOption", "none")}
              />
              <ToggleFa 
                label="Start Blank"
                active={query.symbolOption === "blank"}
                id="symbolBlank"
                onChange={() => handleChange("symbolOption", "blank")}
              />
              <ToggleFa 
                label="All Same"
                active={query.symbolOption === "same"}
                id="symbolSame"
                onChange={() => handleChange("symbolOption", "same")}
              />
            </InlineInputContainer>
            {query.symbolOption === "same" ? (
              <InlineInputContainer>
                <Input 
                  placeholder='Symbol for all NFTs'
                  value={query.symbol}
                  id="symbol"
                  onChange={handleFormChage}
                />
              </InlineInputContainer>
            ) : null}
            <h1 className={labelClass}>Resale Fee (leave default if unsure)</h1>
            <InlineInputContainer>
              <Input 
                placeholder='resaleFee 0 to 75%'
                type="number"
                value={query.resaleFee}
                id="resaleFee"
                onChange={handleFormChage}
                min={0}
                max={75}
                step={1}
              />
            </InlineInputContainer>
            <InlineInputContainer>
              <Input 
                placeholder='Official NFT Website URL'
                value={query.projectUrl}
                id="projectUrl"
                onChange={handleFormChage}
              />
            </InlineInputContainer>
            <Button style={{marginLeft: '0.75rem', marginTop: '1rem'}}>Submit</Button>
          </Form>
        </div>
      </div>
  )
}

export default BulkFSForm;