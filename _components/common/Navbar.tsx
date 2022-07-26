import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

//ICON IMPORTS
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings'
import MoreIcon from '@mui/icons-material/MoreVert';

import { useRouter } from 'next/router'
import WalletButtons from '../solcommon/WalletButtons';
import { Button } from '@mui/material';



// Component created from the starter code provided at: https://github.com/mui/material-ui/blob/v5.5.2/docs/data/material/components/app-bar/PrimarySearchAppBar.tsx


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navbar() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);


  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMenuLink = (event: React.MouseEvent<HTMLElement>, path: string) => {
    router.push(path);
  };

  const solanaButtonStyle = {
    color: 'black'
  }

  const styles = {navBarButtonStyle: {marginLeft: "15px", backgroundColor: '#5daeff'}}

  const menuId = 'navbar-menu-desktop';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={e => handleMenuLink(e, "/profile")}>Profile</MenuItem>
      <MenuItem onClick={e => handleMenuLink(e, "/settings")}>Settings</MenuItem>
    </Menu>
  );
  const mobileMenuId = 'navbar-menu-mobile';
  const renderMobileMenu = (
    
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <WalletButtons/>
      </MenuItem>
      <MenuItem onClick={e => handleMenuLink(e, "/profile")}>
        <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>

      <MenuItem onClick={e => handleMenuLink(e, "/settings")}>
        <IconButton
            size="large"
            aria-label="settings of current user"
            aria-controls="primary-search-settings-menu"
            aria-haspopup="true"
            color="inherit"
          >
          <SettingsIcon />
        </IconButton>
        <p>Settings</p>
      </MenuItem>
      

    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Add back if navigation drawer is wanted */}
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
          <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            SolPrime Marketplace
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search NFTs…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/* Wallet Button */}
            <WalletButtons/>
            {/* Mint NFT Button */}
            <Button 
              variant="contained" 
              style={{...styles.navBarButtonStyle}} 
              onClick={e => handleMenuLink(e, "/mint")}
            >
              Mint An NFT
            </Button>
             {/* View Your NFTs Button */}
            <Button 
              variant="contained" 
              style={{...styles.navBarButtonStyle}} 
              onClick={e => handleMenuLink(e, "/profile")}
            >
              View Your NFTs
            </Button>             
            {/* Profile Button Menu  */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}