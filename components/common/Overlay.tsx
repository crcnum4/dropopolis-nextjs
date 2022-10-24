import React, {CSSProperties, FC, ReactNode} from 'react';
import Spinner from './Spinner';

interface OverlayProps {
  children: ReactNode,
  // style?: CSSProperties,
  // className?: string,
  active?: boolean
}

const Overlay: FC<OverlayProps> = (props) => {
  return (
    <div 
      className={ 
        "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10 " + 
        (
          props.active ? 
          "" : "hidden" 
        )
      }
    >
      {props.children}
    </div>
  )
}

export default Overlay;