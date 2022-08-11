import React, { FC, useState } from "react";

interface BorderCarProps {
    hover: boolean;
    hoverable?: boolean;
    className?: string;
    onClick?: () => void;
    style: React.CSSProperties;
    selfHover?: boolean;
    children: any;
    selected: boolean;
}

const borderCardStyle = {
    card: {
        borderRadius: 5,
        marginBottom: 25,
        padding: "0 8px",
        width: "80%",
        maxWidth: 500,
        backgroundColor: "#f7f7f7",
      } as React.CSSProperties,
}

const BorderCard : FC<BorderCarProps> = (props: BorderCarProps) => {

    const [hover, setHover] = useState(false)

    const onMouseEnter = () => {
        if (props.hoverable) setHover(!hover)
    };

    const onMouseLeave = () => {
        if (props.hoverable) setHover(!hover)
    };
    
    const className = props.className ? `card-${props.className}` : 'card';

    const hoverStyle = {
      noHover: {
        boxShadow: `1px 1px 20px #${props.selected ? 'a200ff80' :'5b5b5b80'}`,
        transition: "box-shadow .5s",
      } as React.CSSProperties,
      hover: {
        boxShadow: `1px 1px 20px #${props.selected ? 'a200ff40' :'5b5b5b40'}`,
        transition: "box-shadow .5s",
      } as React.CSSProperties,
    }

    return (
        <div
        className={className}
        style={
            hover || props.hover
            ? {
                ...borderCardStyle.card,
                ...hoverStyle.hover,
                ...props.style,
                overflow: "hidden",
                }
            : {
                ...borderCardStyle.card,
                ...hoverStyle.noHover,
                ...props.style,
                overflow: "hidden",
                }
        }
        onClick={props.onClick}
        onMouseEnter={props.selfHover ? onMouseEnter : ()=>{}}
        onMouseLeave={props.selfHover ? onMouseLeave : ()=>{}}
        >
        {props.children}
        </div>
    );

}

export default BorderCard;
