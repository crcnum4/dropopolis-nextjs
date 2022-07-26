import React, { FC } from 'react'
import Copyright from './Copyright'

type LinksModuleProps = {
  style?: React.CSSProperties
  className?: string
}

type LinkData = {
    title: string,
    links: {
        text: string,
        url: string
    }[]
}

const linkData:LinkData[] = [
    {
        title: "About Us",
        links: [
            {text: "About", url: "dropopolis.com"}, 
            {text: "About", url: "dropopolis.com"}
        ]
    },
    {
        title: "Links",
        links: [
            {text: "Blog", url: "dropopolis.com"}, 
            {text: "Help Center", url: "dropopolis.com"}
        ]
    },
    {
        title: "Community Links",
        links: [
            {text: "Discord", url: "dropopolis.com"}, 
            {text: "Community", url: "dropopolis.com"}
        ]
    }
]

const LinksModule: FC<LinksModuleProps> = (props) => {
  return (
    <div style={{...props.style}} className={props.className || ""}>
        {linkData.map( linkSection => {
            return (
                <div className='flex-1 flex-row'>
                    <h4>{linkSection.title}</h4>
                    <div>
                        {linkSection.links.map( (l, i) => {
                            return (<a key={i} href={l.url} target="_blank" rel="noopener noreferrer">{l.text}</a>)
                        } )}
                    </div>
                </div>
            )
        })}
    </div>
  )
}
export default LinksModule;