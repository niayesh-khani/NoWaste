import { AppBar, Toolbar, styled, Menu, alpha, InputBase, IconButton, Badge, MenuItem } from '@mui/material';
import * as React from 'react';
import {useHistory } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AccountCircle } from '@material-ui/icons';
import { useState } from 'react';


const Header = () => {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState('');
    const history = useHistory();
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0, 
        marginRight: theme.spacing(8), 
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1), 
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
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
            },
    },
    }));

    const handleClickProfile = () => {
        history.push("/edit-profile");
    }
    const handleClickLogOut = () => {
        localStorage.removeItem("token");
        history.push("/landing");
    }
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        };
    
        const handleClose = () => {
        setAnchorEl(null);
        };

    return ( 
        <>
        <AppBar sx={{position:"sticky"}} className="header-restaurant-view">
            <Toolbar className='toolbar-restaurant-view'>
                <img 
                    className='logo'
                    src="/logo4.png"
                    alt="NoWaste"
                />
                <Search>
                    <SearchIconWrapper>
                    <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                {auth && (
                <div >
                    
                    <IconButton color='inherit'>
                        <Badge badgeContent={2} color='error'>
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                    <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                    className='last-icon-restaurant-view'
                    >
                    <AccountCircle />
                    </IconButton>
                    
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    >
                    <MenuItem onClick={handleClickProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleClickLogOut}>Log out</MenuItem>
                    </Menu>

                </div>
                )}
            </Toolbar>
        </AppBar>
        </>
    );
}

export default Header;