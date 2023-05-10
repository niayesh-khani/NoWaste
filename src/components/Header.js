import { AppBar, Toolbar, styled, Menu, alpha, InputBase, IconButton, Badge, MenuItem, Modal } from '@mui/material';
import * as React from 'react';
import {useHistory } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AccountCircle } from '@material-ui/icons';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import '../components/Header.css';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Logout from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Header = React.memo(() => {
    const [auth, setAuth] = React.useState(true);
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
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [openWallet, setOpenWallet] = React.useState(false);
    const handleOpenWallet = () => setOpenWallet(true);
    const handleCloseWallet= () => setOpenWallet(false);

    const [balance, setBalance] = useState(0);              //
    const [selectedAmount, setSelectedAmount] = useState(0);

    const handleAddAmount = (amount) => {
        setSelectedAmount(amount);
    };

    const handleIncreaseBalance = () => {
        setBalance((prevBalance) => prevBalance + selectedAmount);
        setSelectedAmount(0);
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        flexGrow: 1,
      }));
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    
    return ( 
        <>
        <AppBar 
        sx={{position:"sticky", width:'fixed', padding: '0 !important'}} 
        className="header-restaurant-view">
            <Toolbar className='toolbar-restaurant-view'>
                <img 
                    className='logo'
                    src="/logo4.png"
                    alt="NoWaste"
                />
                <Search >
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        // onChange={handleChange}
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
                        size='large'
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                        className='last-icon-restaurant-view'
                    >
                        <PersonIcon fontSize="normal"/>
                    </IconButton>
                    
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        // onClick={handleClose}
                        PaperProps={{
                        elevation: 0,
                        sx: {
                            width : 170,
                            borderRadius : 3,
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1,
                            '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                            },
                            '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 12,
                            width: 11,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                            },
                        },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleClickProfile} className='profile-font'>
                        <AccountBoxIcon className='profile-icons'/> Profile
                        </MenuItem>
                        <MenuItem onClick={handleOpenWallet} className='profile-font'>
                        <AccountBalanceWalletIcon className='profile-icons'/> Wallet
                        <div className='balance'>{balance}$</div>
                        </MenuItem>
                        <Modal
                            // className='credit-box'
                            open={openWallet}
                            onClose={handleCloseWallet}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box className='credit-box'>
                                <h2>Increase credit</h2>
                                {/* <h5>Current Balance : 10$</h5> */}
                                <div className='blance-header'>Current Balance : {balance}$</div>
                                <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap" sx={{ marginTop: '20px' }}>
                                    {/* <Item>10$</Item>
                                    <Item>20$</Item>
                                    <Item>30$</Item> */}
                                    {/* <Item>
                                        <button onClick={() => handleAddAmount(10)} className='add-amount-header'>10$</button>
                                    </Item>
                                    <Item>
                                        <button onClick={() => handleAddAmount(20)} className='add-amount-header'>20$</button>
                                    </Item>
                                    <Item>
                                        <button onClick={() => handleAddAmount(30)} className='add-amount-header'>30$</button>
                                    </Item> */}
                                    <Button onClick={() => handleAddAmount(10)} className='add-amount-header'><Item className='item-header'>10$</Item></Button>
                                    <Button onClick={() => handleAddAmount(20)} className='add-amount-header'><Item className='item-header'>20$</Item></Button>
                                    <Button onClick={() => handleAddAmount(30)} className='add-amount-header'><Item className='item-header'>30$</Item></Button> 
                                    
                                
                                </Stack>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '59px' ,justifyContent: 'center'}}>
                                <button className='button__wrapper' style={{ display: 'inline-block' }} onClick={() => setSelectedAmount((prevAmount) => prevAmount - 1)} disabled={selectedAmount <= 1}>-</button>
                                <h3 style={{ display: 'inline-block', margin: '0 10px' }}>{selectedAmount}$</h3>
                                <button className='button__wrapper' style={{ display: 'inline-block' }} onClick={() => setSelectedAmount((prevAmount) => prevAmount + 1)}>+</button>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'center' , alignItems: 'center'}}>
                                    <Button variant="contained" id='payment-submit' onClick={handleIncreaseBalance}>
                                        Payment
                                    </Button>
                                </div>
                                
                            </Box>
                        </Modal>
                        <MenuItem onClick={handleClose} className='profile-font'>
                        <DashboardIcon className='profile-icons'/> Dashboard
                        </MenuItem>
                        <MenuItem onClick={handleClickLogOut} className='profile-font'>
                        <LogoutIcon className='profile-icons'/> Logout
                        </MenuItem>
                    </Menu>
                </div>
                )}
            </Toolbar>
        </AppBar>
        </>
    );
}
)
export default Header;