
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {ChangeEventHandler, FC, MouseEventHandler} from "react";
import Input from "./Input";

export interface ImgInputQuery {file?: File,  url: string}


export interface FileQuery {
  file?: File, 
  url: string
}

type ImageInput = {
  id: string,
  value: FileQuery,
  style?: React.CSSProperties,
  className?: string,
  onUpdate: (field: string, value: FileQuery) => void,
  required: boolean
}

const ImageInput: FC<ImageInput> = (props) => {

  const {onUpdate, id, value, required} = props

  const saveImgLocalURL:ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files && event.target.files[0]) {
      const imgData = event.target.files[0];
      onUpdate(id, {file: imgData, url: URL.createObjectURL(imgData)});
    }
  };

  const removeImage:MouseEventHandler<HTMLButtonElement> = (event) => {
      onUpdate(id, {url: ''});
  };

  return (
      <div 
        style={{...props.style}}
        className={props.className}
      >
        <img src={value.url} />
        <button
          // this prevents the default onSubmit from triggering
          type="button" 
          
          className="bg-red-400 py-1 rounded-md mt-1"
          onClick={removeImage} 
          style={{display: value.url ? 'initial' : 'none'}}
        >
          <FontAwesomeIcon icon={faXmark} size="2x" color="white"/>
        </button>
        <Input
          placeholder="No Image Added"
          value=''
          id={id}
          type="file"
          onChange={saveImgLocalURL} 
          style={{color: 'transparent'}}
          required
        />
      </div>
  );
}

export default ImageInput;