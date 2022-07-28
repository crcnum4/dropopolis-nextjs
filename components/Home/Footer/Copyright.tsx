import Link from 'next/link';
import * as React from 'react';
import { FC } from 'react';

type CopyrightProps = {
  style?: React.CSSProperties
}

const Copyright: FC<CopyrightProps> = (props) => {

  return (
    <div style={{...props.style}}>
      <Link href="/">
        <a 
          className=' text-gray-400' 
          target="_blank" 
          rel="noreferrer" 
        >
          Copyright © 2022 DropOplis & DevAccelerator. All Rights Reserved
        </a>
      </Link>
    </div>
  );
}
export default Copyright;
