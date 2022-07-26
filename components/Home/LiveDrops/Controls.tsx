import {FC, useEffect, useState} from 'react';
import {faChevronLeft, faChevronRight, faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ControlsProps = {
  hasMore: boolean,
  page: number,
  onPageChange: (value: 1 | -1) => void
}

const Controls: FC<ControlsProps> = (props) => {

  const [active, setActive] = useState(props.page % 6);

  useEffect(() => {
    setActive(props.page % 6)
  }, [props.page])

  const displayDots = () => {
    return ([0, 1, 2, 3, 4, 5]).map(index => {
      return (
        <FontAwesomeIcon 
          icon={faCircle} 
          className={active == index ? "text-blue-500" : "text-gray-500"}
          style={{margin: "0 0.25rem"}}
          key={index}
          size="sm"
        />
      )
    })
  }

  return (
    <div className="flex-row items-center">
      <FontAwesomeIcon 
        icon={faChevronLeft} 
        size="lg"
        onClick={ props.page === 0 ? () => {} : () => props.onPageChange(-1)}
        className={
          props.page === 0 ?
            "text-gray-500" :
            "text-blue-500 cursor-pointer"
        }
        style={{margin: "0 0.25rem"}}
      />
      {displayDots()}
      <FontAwesomeIcon 
        icon={faChevronRight} 
        size="lg"
        onClick={props.hasMore ? () => props.onPageChange(1) : () => {}}
        className={
          props.hasMore ? 
            "text-blue-500 cursor-pointer" :
            "text-gray-500"
        }
        style={{margin: "0 0.25rem"}} 
      />
    </div>
  )
}

export default Controls;