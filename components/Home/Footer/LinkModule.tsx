import Link from 'next/link'
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
            {text: "About", url: "https://dropopolis.com"}, 
            {text: "Contact", url: "https://dropopolis.com"}
        ]
    },
    {
        title: "Links",
        links: [
            {text: "Blog", url: "https://dropopolis.com"}, 
            {text: "Help Center", url: "https://dropopolis.com"}
        ]
    },
    {
        title: "Community Links",
        links: [
            {text: "Discord", url: "https://dropopolis.com"}, 
            {text: "Community", url: "https://dropopolis.com"}
        ]
    }
]

const LinksModule: FC<LinksModuleProps> = (props) => {

    const displayLinks = () => {

        const displaySectionLinks = (linkSection: LinkData) => {
            return linkSection.links.map( (l, i) => {
                return (
                    <Link key={i} href={l.url}>
                        <a target="_blank" rel="noopener noreferrer">{l.text}</a>
                    </Link>
                )
            } )
        }

        return linkData.map( linkSection => {
            return (
                <div className='' style={{minWidth: 130}} key={linkSection.title}>
                    <p className='font-bold text-left text-xl mb-4 text-gray-700'>
                        {linkSection.title}
                    </p>
                    <div >
                        <div className='flex-column text-left text-blue-500' >
                            {displaySectionLinks(linkSection)}
                        </div>
                    </div>
                </div>
            )
        })
    }

  return (
    <div style={{...props.style}} className={props.className || "flex-row mb-8 mx-10 my-6"}>
        {displayLinks()}
    </div>
  )
}
export default LinksModule;