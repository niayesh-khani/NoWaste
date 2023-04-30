import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Restaurant-View.css';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
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
import Slide from '@mui/material/Slide';
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
import "./HomepageCustomer.css";

{/* <hr></hr> */}
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
const HomepageCustomer = () => {
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
                    <hr className='hr-tag'
                    // style={{borderTop: "2px solid black", width: "50px"}}
                    />
                    <Typography className='filter-type'>
                        Discount
                    </Typography>
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