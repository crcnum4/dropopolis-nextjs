import React, {FC} from "react";

type IconHolderProps = {
  children: React.ReactNode
}

const IconHolder: FC<IconHolderProps> = (props) => {
  return (
    <div className="bg-blue-500 rounded-md justify-center p-3" style={{height: 64, width: 64}}>
      {props.children}
    </div>
  )
}

export default IconHolder;