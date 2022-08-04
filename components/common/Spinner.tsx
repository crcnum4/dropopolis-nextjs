import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface SpinnerProps { 
  style?: React.CSSProperties,
  className?: string,
}

const Spinner: FC<SpinnerProps> = (props) => {
  return (
    <FontAwesomeIcon
      icon={faSpinner}
      spin
      style={{ fontSize: 20, margin: "0 auto", ...props.style }}
      className={props.className || ''}
      color='white'
    />
  );
};

export default Spinner;
