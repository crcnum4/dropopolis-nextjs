import React, {ChangeEventHandler, FC, Fragment} from 'react';

type InputProps = {
  error?: string,
  errorStyle?: React.CSSProperties,
  style?: React.CSSProperties,
  id: string,
  type?: string,
  placeholder: string,
  onChange: ChangeEventHandler,
  required?: boolean,
  value: any,
  accept?: string,
  multiple?: boolean,
  disabled?: boolean,
  label?: string,
  className? : string,
  errorClassName?: string,
  min?: number,
  max?: number,
}

//some input types ie 'file' does not support modifying the 'value' prop. 
//As we find other input types that do not support 'value' we can add them to this list and make them safe to use with this component
const nonValueInputTypes: {[key: string]: number} = {file: 1} //using an object for n(1) searching

const Input: FC<InputProps> = (props) => {

  const inputType = props.type || "text"

  const input = (
    <input 
      style={
        props.error ? 
          {...props.errorStyle} :
          {...props.style} 
      }
      className={ props.error ? 
        props.errorClassName || "p-2 m-1 flex-1 border-red-500 border rounded-md"
        :
        props.className || "p-2 m-1 flex-1 border rounded-md"
      }
      id={props.id}
      type={inputType}
      placeholder={props.placeholder}
      onChange={props.onChange}
      required={props.disabled}
      value={nonValueInputTypes[inputType] ? "" : props.value}
      accept={props.accept}
      multiple={props.multiple}
      disabled={props.disabled}
      min={props.min}
      max={props.max}
    />
  );

  const errorLabel = <p style={styles.error}>{props.error}</p>

  if (props.label) {
    return (
      <Fragment>
        <div style={styles.container}>
          <label htmlFor={props.id}>{props.label}</label>
          {input}
        </div>
        {props.error ? errorLabel : null}
      </Fragment>
    )
  }

  return (
    <Fragment>
      {input}
      {props.error ? errorLabel : null}
    </Fragment>
  )
}

type Styles = {
  input: React.CSSProperties,
  container: React.CSSProperties,
  inputError: React.CSSProperties,
  error: React.CSSProperties,
}

const styles: Styles = {
  input: {
    color: "#000",
    backgroundColor: "#eee",
    padding: 5,
    fontSize: 18,
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    flex:1,
    height: "auto",
    minWidth: '100px',
    borderRadius: '0.75rem',
    margin: "0.50rem 0"
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  inputError: {
    color: "#000",
    backgroundColor: "#eee",
    padding: 5,
    fontSize: 18,
    borderColor: "red",
    borderWidth: 2,
    width: "60%",
    height: "auto",
    flex: 1,
  },
  error: {
    color: "red",
    fontWeight: "bold",
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 3,
    paddingLeft: 5,
  },
}

export default Input;