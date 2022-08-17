import {FC, MouseEventHandler} from 'react';

interface TopicProps {
  label: string;
  id: string;
  onClick: (id: string) => void;
  active: boolean;
}

const Topic: FC<TopicProps> = (props) => {

  const onSelect = () => {
    props.onClick(props.id);
  }

  return (
    <div 
      className={' border-gray-500 h-16 w-full p-3 justify-center ' + (props.active 
        ? "border-b-2 bg-blue-500 opacity-80"
        : "border-b bg-white cursor-pointer hover:bg-blue-100 hover:underline")
      }
      id={props.id}
      onClick={onSelect}
    >
      <p className={props.active 
        ? "underline text-white font-bold"
        : ""
      }
      >{props.label}</p>
    </div>
  )

}

export default Topic