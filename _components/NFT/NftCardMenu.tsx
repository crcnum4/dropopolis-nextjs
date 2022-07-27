import React, { useState, Fragment, FC } from "react";
import {isEmpty} from "../../utils/isEmpty";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuIcon from '@mui/icons-material/Menu';
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";



interface MenuItemProps {
    text: string;
    onClick: () => void;
}

const MenuItem: FC<MenuItemProps> = (props) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      style={
        hover
          ? { ...styles.menuItem, ...styles.menuItemColor }
          : styles.menuItem
      }
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={props.onClick}
    >
      <p className="font-primary">{props.text}</p>
    </div>
  );
};


interface NftCardMenuProps {
    tokenId: PublicKey;
}

const NftCardMenu: FC<NftCardMenuProps> = (props) => {
    const [isOpen, toggleOpen] = useState(false);
    /*
    const {tokenId} = props;

    const {publicKey} = useWallet();
    
    will be used when button functionality is added
    */
    

    let iconStyle = { ...styles.container };
    iconStyle = !isOpen ? { ...iconStyle, ...styles.active } : iconStyle;

    const handleFavorite = () => {
        toggleOpen(false);
        // if (!publicKey) {
        //   return props.history.push("/login?message=1");
        // }
        // if (props.profile && props.profile.favorites.includes(tokenId)) {
        //   props.removeFavorite(publicKey, tokenId, props.history);
        //   return;
        // }
        // props.addFavorite(publicKey, tokenId, props.history);
    };

    return (
        <div>
        <div
            style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            border: "1px solid #fff",
            borderRadius: "50%",
            overflow: "hidden",
            backgroundColor: 'white'
            }}
            onClick={() => toggleOpen(!isOpen)}
        >
            <div
            style={{
                width: 20,
                height: 20,
                border: "2px solid #4286f7",
                borderRadius: "50%",
                overflow: "hidden",
            }}
            >
            <MenuIcon 
                color="primary" 
                sx={{
                    width: 15,
                    height: 'auto'
                }}
            />
            </div>
        </div>
        <div
            style={{
            position: "absolute",
            top: "35px",
            right: "12px",
            // width: 60,
            // border: "2px solid #4286f7",
            overflow: "hidden",
            }}
        >
            <span
            style={
                !isOpen
                ? {
                    ...styles.menuContainer,
                    ...styles.menuActive,
                    }
                : styles.menuContainer
            }
            >
            <div style={{ height: "0.2em" }} aria-hidden="true"></div>
            <MenuItem
                text={
                //   publicKey &&
                //   props.profile &&
                //   props.profile.favorites.includes(tokenId)
                //     ? "Unfavorite"
                //     : "Favorite"
                    "Favorite" //until user profiles are implemented
                }
                onClick={handleFavorite}
            />
            <div style={{ height: "0.2em" }} aria-hidden="true"></div>
            <div style={{ height: "0.2em" }} aria-hidden="true"></div>
            </span>
        </div>
        </div>
    );
    };

    const styles = {
    container: {
        display: "block",
        width: "100%",
        height: "100%",
        textAlign: "center",
        lineHeight: "22px",
        fontSize: "12px",
        color: "#4286f7",
        backgroundColor: "#fff",
        transition: "0.5s",
    } as React.CSSProperties,
    container2: {
        backgroundColor: "#4286f7",
        color: "#f1f1f1",
    } as React.CSSProperties,
    active: {
        transform: "translateY(-100%)",
    } as React.CSSProperties,
    menuContainer: {
        display: "block",
        width: "100%",
        textAlign: "right",
        fontSize: "12px",
        backgroundColor: "#4286f7",
        color: "#f1f1f1",
        borderRadius: "10px",
        // opacity: 0,
        // visibility: "hidden",
        transition: "0.5s",
    } as React.CSSProperties,
    menuActive: {
        transform: "translateY(-102%)",
    } as React.CSSProperties,
    menuItem: {
        padding: "0 0.8em",
        cursor: "pointer",
    } as React.CSSProperties,
    menuItemColor: {
        backgroundColor: "#250ae3",
    } as React.CSSProperties,
};

export default NftCardMenu;
