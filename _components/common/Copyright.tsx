import * as React from 'react';
type Props = {
  link: string,
  companyName: string,
  style: React.CSSProperties
}

export default function Copyright(props: Props) {

  const {link, companyName} = props

  return (
    <div style={{...props.style}}>
      <a target="_blank" rel="noreferrer" href={link}>{companyName} NFT 2022</a>
    </div>
  );
}
