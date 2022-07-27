import React, {CSSProperties, FC, MouseEventHandler, useState} from 'react';

type BorderCardProps = {
  className?: string,
  children: React.ReactNode,
  onClick: MouseEventHandler<HTMLDivElement>
}

const BorderCardHover: FC<BorderCardProps> = (props) => {
  const [hover, setHover] = useState(false);

  const onMouseEnter = () => {
    setHover(true);
  }

  const onMouseLeave = () => {
    setHover(false);
  }

  return (
    <div 
      style={hover ? {...styles.card, ...styles.onHover} : {...styles.card, ...styles.offHover}}
      className={
        props.className ? 
        props.className : 
        "rounded-2xl mb-20 p-4 bg-gray-100"
      }
      onClick={props.onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {props.children}
    </div>
  )
}

type Styles = {
  card: CSSProperties,
  onHover: CSSProperties,
  offHover: CSSProperties
}

const styles: Styles = {
  card: {
    border: "1px solid #f7f7f7",
    maxWidth: 350,
  },
  offHover: {
    boxShadow: "1px 1px 20px rgba(91, 91, 91, 0.5)",
    transition: "box-shadow .5s",
  },
  onHover: {
    boxShadow: "1px 1px 20px rgba(91, 91, 91, 0.25)",
    transition: "box-shadow .5s",
  },
}

export default BorderCardHover