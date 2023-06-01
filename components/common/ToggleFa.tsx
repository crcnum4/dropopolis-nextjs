import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import {ChangeEventHandler, CSSProperties, FC, MouseEventHandler} from 'react';

interface ToggleProps {
  active: boolean;
  classNameActive?: string;
  classNameDeactive?: string;
  activeStyle?: CSSProperties;
  deactiveStyle?: CSSProperties;
  onChange: MouseEventHandler<HTMLDivElement>;
  label: string,
  id: string,
}

const ToggleFa: FC<ToggleProps> = (props) => {

  const activeClassName = props.classNameActive ? props.classNameActive :
    "text-blue-700"

  const deactiveClassName = props.classNameDeactive ? props.classNameDeactive :
    "text-gray-500"

  return (
    <div 
      className="flex-1 cursor-pointer flex-row"
      onClick={props.onChange}
      id={props.id}
    >
      <FontAwesomeIcon 
        icon={props.active ? faToggleOn : faToggleOff}
        className={props.active? activeClassName : deactiveClassName}
        style={props.active? props.activeStyle : props.deactiveStyle}
        size="lg"
      />
      <p className="px-2">{props.label}</p>
    </div>
  )
}

export default ToggleFa