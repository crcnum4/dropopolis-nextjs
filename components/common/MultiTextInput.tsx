import React, { FC, MouseEventHandler } from "react";
import Button from "./Button";
import InlineInputContainer from "./InlineInputContainer";
import Input from "./Input";


export interface MultiPartInput {
    name: string
    fields: {key: string, value: string | number}[]
 }

interface MultiTextInputProps {
  inputName: string;
  style?: React.CSSProperties | undefined,
  className?: string | undefined,
  disabled?: boolean | undefined,
//   fieldProps:  {name: string, value: string | number, type?: 'text' | 'number', min?: number, max?: number}[],
  values: MultiPartInput[]
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void, 
  addOneField: () => void,
  removeOneField: () => void,
}

const MultiTextInput: FC<MultiTextInputProps> = (props) => {

  const {values, onChange, addOneField, removeOneField, inputName} = props;

  return (
    <div>
        
        {values.map(({fields, name}, index) => {
            return (
                <div key={index}>
                <InlineInputContainer>
                    <label htmlFor={inputName + (index+1)}>{name}</label>
                    {fields.map(({key, value}, index) => {
                        return (
                            <Input
                                key={index}
                                label={key}
                                placeholder={key}
                                id={key}
                                value={value}
                                onChange={onChange}
                            />
                        )
                    }
                    )}
                </InlineInputContainer>
                <Button 
                    style={{...props.style}}
                    className={props.className || "p-2 m-1 flex-1 border rounded-md"}
                    onClick={removeOneField}
                    disabled={props.disabled}
                    children="-"
                />
                </div>
            )
            })  
        }
        <Button
            onClick={addOneField}
        >
            Add {inputName}
        </Button>
    </div>
  )
}

export default MultiTextInput;