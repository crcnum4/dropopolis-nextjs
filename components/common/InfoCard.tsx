import React, {FC} from 'react';

type InfoCardProps = {
  style?: React.CSSProperties,
  className?: string,
  children: React.ReactNode
}


const InfoCard: FC<InfoCardProps> = (props) => {
  return (
    <div 
      className={props.className + " w-full p-12 m-5 h-auto flex-1 rounded-3xl"} 
      style={{minWidth: '300px', ...props.style}}
    >
      {props.children}
    </div>
  )
}

export default InfoCard;
