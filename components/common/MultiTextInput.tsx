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
  values: MultiPartInput[]
  onChange: (field: string, value: MultiPartInput[]) =>void, 
  addOneField: () => void,
  removeOneField: (index: number) => void,
}

const MultiTextInput: FC<MultiTextInputProps> = (props) => {

  const {values, onChange, addOneField, removeOneField, inputName} = props;

  return (
    <div className='border rounded-md my-4'>
        <h1 className="text-xl font-bold text-center mt-2">{inputName}s</h1>
        {values.map(({fields, name}, vIndex) => {

            name = name.substring(0, 1).toUpperCase() + name.substring(1)  + ' ' + (vIndex+1) || inputName;;

            return (
                <div 
                    key={vIndex}
                    className='mx-4 my-2 justify-center items-center flex flex-wrap flex-col border-2 border-black rounded-md my-4'
                >
                    <InlineInputContainer>
                        <label 
                            htmlFor={inputName + (vIndex+1)}
                            className="text-lg font-bold mb-1"
                        >
                            {name}
                        </label>
                        {fields.map(({key, value}, fIndex) => {
                            const keyName = key.substring(0, 1).toUpperCase() + key.substring(1);
                            // console.log(value);
                            
                            return (
                                <Input
                                    className="p-2 m-1 flex-1 border rounded-md mt-5"
                                    key={fIndex}
                                    label={keyName}
                                    placeholder={keyName}
                                    id={key}
                                    value={value}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        
                                        const field = `${inputName}s`.toLowerCase();
                                        
                                        const value = values.map(({fields:tempFields}, i) => {
                                            if (vIndex != i) return {
                                                name: values[vIndex].name,
                                                fields:tempFields
                                            }
                                            return {
                                                name: values[i].name,
                                                fields: fields.map(({key, value}, i) => {
                                                    if (fIndex != i) return {key, value};

                                                    return {key, value: event.target.value};
                                                })
                                            }
                                        })
                                        
                                        onChange(field, value)
                                    }}
                                />
                            )
                        }
                        )}
                    </InlineInputContainer>
                    <Button 
                        className="bg-red-500 hover:bg-red-700 text-white py-3 px-5 rounded-md w-fit my-5"

                        onClick={() => {
                            console.log('removeOneField', vIndex);
                            
                            removeOneField(vIndex)
                        }}
                        disabled={props.disabled}
                    >
                        Remove {name}
                    </Button>
                
                </div>
            )
            })  
        }
        <Button
            className="p-3 m-1 flex-1 w-80 border rounded-md mt-2 bg-blue-500 hover:bg-blue-600 text-white self-center"
            onClick={addOneField}
        >
            Add {inputName}
        </Button>
    </div>
  )
}

export default MultiTextInput;