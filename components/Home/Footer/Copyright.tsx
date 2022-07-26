import * as React from 'react';
import { FC } from 'react';

type CopyrightProps = {
  style: React.CSSProperties
}

const Copyright: FC<CopyrightProps> = (props) => {

  return (
    <div style={{...props.style}}>
      <a className=' text-gray-400' target="_blank" rel="noreferrer" href="https://dropopolis.com">Copyright © 2022 DropOplis & DevAccelerator. All Rights Reserved</a>
    </div>
  );
}
export default Copyright;
