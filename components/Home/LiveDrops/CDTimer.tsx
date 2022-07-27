import React, {FC, useState, useEffect} from 'react';
import {faStopwatch} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type CDTimerProps = {
  targetTime: number;
  className?: string;
  style?: React.CSSProperties
}

const CDTimer: FC<CDTimerProps> = (props) => {
  const [currentTime, setCurrentTime] = useState(
    0
  )

  console.log();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        new Date().getTime()
      )
    }, 1000)
  }, [currentTime])

  return (
    <div className={'w-1/2 flex-row justify-center ' + props.className} style={props.style}>
      <FontAwesomeIcon icon={faStopwatch} size="lg" />
      <p className='px-3 text-sm'>{moment.utc(moment(props.targetTime).diff(currentTime)).format('HH:mm:ss')}</p>
    </div>
  )

}

export default CDTimer