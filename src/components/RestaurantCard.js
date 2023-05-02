import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './RestaurantCard.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccountCircle } from '@material-ui/icons';
import Masonry from 'react-masonry-css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Food from '../components/Food';
import BackToTop from '../components/BackToTop';
import Footer from '../components/Footer';
import NavigationIcon from '@material-ui/icons/Navigation';
import { Button, Card } from '@material-ui/core';
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
import { Avatar, BottomNavigation, BottomNavigationAction, CardActions, CardContent, CardHeader, CardMedia, Collapse, Grid, Rating } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const RestaurantCard = () => {
    const [rateValue, setRateValue] = React.useState(2.5);
    return ( 
        <div>
            <Card className='card-restaurant-homepage'>
                    <Grid container spacing={1} >
                    </Grid>
                        <CardMedia
                        component="img"
                        src={"/mohsen.jpg"}
                        alt="Restaurant1"
                        />
                        <Grid item>
                        <CardHeader 
                            title= "Setareh"
                            subheader="2002-09-29"
                        >
                        </CardHeader>
                        {/* <CardActions disableSpacing> */}
                            <Rating name="read-only" value={rateValue} readOnly />
                        {/* </CardActions> */}
                        </Grid>
                        <CardContent>
                        <Typography variant="body2" className='Body2-homepage-customer' color="text.secondary">
                            This is my restaurant
                        </Typography>
                        <Typography>
                            20% Discount
                        </Typography>
                        </CardContent>

                </Card>
        </div>
    );
}

export default RestaurantCard;