

import React, {FC} from "react";
import Spinner from "./Spinner";

type BackdropProps = {
  children?: React.ReactNode,
  style?: React.CSSProperties,
  className?: string,
  showBackdrop: boolean,
  showLoading?: boolean,
  message?: string,
}

const Backdrop: FC<BackdropProps> = (props) => {

    const renderBackdrop = () => {''
        return (
            <div className='w-full h-full fixed z-50 left-0 top-0 bg-gray-900 bg-opacity-90 items-center justify-center'>
                {props.message ?
                    <h1 className="text-4xl font-bold text-white my-6">{props.message}</h1> 
                : null}
                {props.showLoading ?
                    <Spinner/>
                : null}
            </div>
        )
    }

    return (
        props.showBackdrop ? renderBackdrop() : null
    )
}

export default Backdrop;