import React, {FC} from 'react';

type InfoCardProps = {
  style?: React.CSSProperties,
  className?: string,
  children: React.ReactNode
}


const InfoCard: FC<InfoCardProps> = (props) => {
  return (
    <div className={"w-full p-12 m-5 bg-blue-100/30 h-auto flex-1"} style={{minWidth: '300px'}}>
      {props.children}
    </div>
  )
}

export default InfoCard;