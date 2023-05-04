import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { yellow } from '@mui/material/colors';
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
import { Avatar, BottomNavigation, BottomNavigationAction, CardActions, CardContent, CardHeader, CardMedia, Chip, Collapse, Grid, Rating } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import CardActionArea from '@mui/material/CardActionArea';
import Icon from '@mui/material/Icon';
import DiscountIcon from '@mui/icons-material/Discount';
import StarRateIcon from '@mui/icons-material/StarRate';


const RestaurantCard = () => {
    const history = useHistory();
    const [rateValue, setRateValue] = React.useState(2.5);
    const userId = localStorage.getItem("id");
    const [discount, setDiscount] = useState(20);
    const handleclick = () => {

    }

    const handleShow = () => {
        history.push("http://5.34.195.16/restaurant/restaurant_view/" + userId);
    }

    return ( 
        <div>
        <Card className= 'homepage-custumer-card-restaurant' onClick={handleShow}>
            <CardActionArea>
            <div style={{ position: 'relative' }}>

                <CardMedia
                    component="img"
                    sx={{ height: 140 }}
                    image="/mohsen.jpg"
                    // title={food.Type}
                />
                <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                backgroundColor: '#E74C3C',
                color: 'white',
                padding: '5px'
                }}>
                    {discount + "%"}
                </div>
                </div>
                <CardContent sx={{ height: 150}}>
                    <Grid>
                        <Typography gutterBottom className='restaurant-name-hemepage-customer'>Piano Restaurant
                            <Typography style={{marginLeft: '75%', marginTop: '-11%', fontSize: '1.1em'}}>
                                {rateValue}
                                <StarRateIcon style={{ color: '#faaf00', marginTop: '-11%'}} />
                            </Typography>
                        </Typography>
                    </Grid>
                    <Typography variant="description-homepage-customer" color="text.secondary">This is a best restaurant in Narmak that you can order everything you want.</Typography>
                </CardContent>
                </CardActionArea>
            <CardActions>
            </CardActions>
        </Card>
    </div>
    );
}

export default RestaurantCard;