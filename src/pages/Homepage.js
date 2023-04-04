import * as React from 'react';
import { AppBar, Badge, BottomNavigation, Box, Button, Container, createTheme, Icon, IconButton, InputAdornment, makeStyles, TextField, ThemeProvider, Typography } from "@material-ui/core";
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import './Homepage.css';
import { Toolbar } from '@mui/material';

export default function HomePage(){
    return ( 
        <div className="back">
            <AppBar position="fixed" className="header">
                <Toolbar className='toolbar'>
                    <img 
                        className='logo'
                        src="/logo4.png"
                        alt="NoWaste"
                    />
                    <div className='icon'>
                        <IconButton color='inherit'>
                            <SearchIcon />
                        </IconButton>
                        <IconButton color='inherit'>
                            <Badge badgeContent={2} color='error'>
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        <IconButton color='inherit'>
                            <Badge badgeContent={5} color="error">
                                <EmailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton color='inherit' className='last-icon'>
                            <PersonIcon />
                        </IconButton>
                    {/* <Typography variant="h6" noWrap>
                        My App
                    </Typography> */}
                    </div>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <div></div>
            <BottomNavigation position="fixed" className="footer">
                <Toolbar>
                    <Typography className='homepage-text' noWrap >
                        My App
                    </Typography>
                </Toolbar>
            </BottomNavigation>
            {/* <div className="header">
                <img 
                    className="logo"
                    src="/logo4.png"
                    alt="NoWaste">
                </img>
                <nav>
                    <div>
                        <ul>
                            <li>
                                <PersonIcon className='icon'/>
                            </li>
                            <li>
                                <ShoppingCartIcon className='icon' />
                            </li>
                        </ul>
                        <div
                            className="search">
                            <TextField
                            variant="outlined"
                            fullWidth
                            label="Search"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Icon>
                                            <SearchIcon />
                                        </Icon> 
                                    </InputAdornment>
                                )
                            }}

                            />
                        </div>
                    </div>
                </nav>

            </div> */}
        </div>
    )

}