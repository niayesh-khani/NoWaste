import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Restaurant-View.css';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccountCircle } from '@material-ui/icons';
import Masonry from 'react-masonry-css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Food from '../components/Food';
import BackToTop from '../components/BackToTop';
import Footer from '../components/Footer';
import NavigationIcon from '@material-ui/icons/Navigation';
import { Button } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useHistory } from "react-router-dom";
import Header from '../components/Header';
import Slider from '@mui/material/Slider';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ShowComment from '../components/ShowComment';
import { useEffect } from 'react';
import { react } from '@babel/types';
import { Grid, createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import Switch from '@mui/material/Switch';
import "./HomepageCustomer.css";

const theme = createTheme({
    palette: {
        primary: {
            main: '#dd9d46',
        },
        secondary: {
            main: '#a44704',
        }
    },
})

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
            backgroundColor:'#dd9d46',
            opacity: 1,
            border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.5,
        },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#dd9d46',
        border: '6px solid #dd9d46',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
        color:
            theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
        duration: 500,
        }),
    },
    }));

const HomepageCustomer = () => {
    const [valueR, setValueR] = React.useState([0, 5]);
    const [valueD, setValueD] = React.useState([0, 100]);

    const handleChangeRate = (event, newValue) => {
        setValueR(newValue);
    };
    const handleChangeDiscount = (event, newValue) => {
        setValueD(newValue);
    };
    return ( 
        // <div>
        <ThemeProvider theme={theme}>
        <Header />
        <Grid container spacing={2} sx={{
            paddingTop:"2%",
        }}
        className='grid-homepage-customer'>
            <Grid item md={3}>
                <Box className="filter-hompage-customer">
                    <Typography className='filter-type'>
                        Rating
                    </Typography>
                    <Slider
                        getAriaLabel={() => 'rate range'}
                        value={valueR}
                        onChange={handleChangeRate}
                        valueLabelDisplay="auto"
                        max={5}
                        className="range-homepage-customer"
                    />
                    <hr className='hr-tag'
                    />
                    <Typography className='filter-type'>
                        Discount
                    </Typography>
                    <Slider
                        getAriaLabel={() => 'rate range'}
                        value={valueD}
                        onChange={handleChangeDiscount}
                        valueLabelDisplay="auto"
                        max={100}
                        step={5}
                        className="range-homepage-customer"
                    />
                    <hr className='hr-tag'
                    />
                    <FormControlLabel
                        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                        label="Iranian"
                        labelPlacement="start"
                    />
                    <hr className='hr-tag'
                    />
                    <FormControlLabel
                        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                        label="Foreign"
                        labelPlacement="start"
                    />
                    <hr className='hr-tag'
                    />
                    <FormControlLabel
                        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                        label="Drink"
                        labelPlacement="start"
                    />
                </Box>


            </Grid>
            
            <Grid item md={9}>

            </Grid>
            <BackToTop/>
        </Grid>
        {/* <Footer/> */}
        {/* </div> */}
        </ThemeProvider>
    );
}

export default HomepageCustomer;