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
import StarIcon from '@mui/icons-material/Star';

const RestaurantCard = () => {
    const history = useHistory();
    const [rateValue, setRateValue] = React.useState(2.5);
    const handleclick = () => {
    }
    return ( 
        <div>
        <Card sx={{ borderRadius: 2 }} className= 'homepage-custumer-card-restaurant'>
            <CardActionArea>
                <CardMedia
                    component="img"
                    sx={{ height: 140 }}
                    image="/mohsen.jpg"
                    // title={food.Type}
                />
                <CardContent sx={{ height: 150}}>
                    <Grid><Typography gutterBottom className='restaurant-name-hemepage-customer'>Piano Restaurant </Typography>
                    {/* <Rating style={{fontSize: 'large', marginTop:"3px"}} readOnly value={rateValue}/> */}
                    {/* <Chip icon={<StarIcon />} sx={{ color: 'warning.main' }} className='star'/>4.5 */}
                    <Chip icon={<StarIcon/>} sx={{ color: yellow[500] }} className='homepage-customer-icone'/>4.5</Grid>
                    <div><Chip icon={<DiscountIcon />} />60%</div>
                    <Typography variant="body2" color="text.secondary">This is a best restaurant in Narmak that you can order everything you want.</Typography>
                </CardContent>

         

                
                </CardActionArea>
            <CardActions>
                {/* <Typography className='homepage-custumer-resutaurant-price'>99</Typography> */}
                
            </CardActions>
        </Card>
    </div>


        
   );
}

export default RestaurantCard;