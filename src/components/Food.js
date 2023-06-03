import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea'
import { red } from '@mui/material/colors';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCart from '@material-ui/icons/RemoveShoppingCart';
import { TextField } from '@material-ui/core';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled} from '@mui/material/styles';
import './Food.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Chip, Divider, Grid } from '@mui/material';
import { Stack } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useEffect } from 'react';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
    }),
}));

const userid = localStorage.getItem("id");

const Food = (props) => {
    const [count, setCount] = React.useState(0);
    const [expanded, setExpanded] = React.useState(false);
    const [restaurant, setRestaurant] = React.useState('');
    const [menu, setMenu] = React.useState([]);
    const {id} = useParams(); 
    const food = props.food;
    const token = localStorage.getItem('token');
    const order_id = localStorage.getItem("order_id");
    // console.log("my id",order_id);
    const [resid, setResid] = localStorage.getItem("restaurantId");
    const handleChange = (e) => {
        setCount(e.target.value);
    }
    console.log("user id",userid);
    console.log("res id",resid);


    
    const handleAddToCartClick = () => {
        console.log("id", id);
        console.log("order id", order_id);
        console.log("food id", food.id);

        axios.get("http://5.34.195.16/restaurant/restaurant_view/"+ resid + "/" + userid + "/order/add_to_order/" + food.id + "/",
        {headers: {
            'Content-Type' : 'application/json',
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Methods" : "PUT,PATCH",
            'Authorization' : "Token " + token.slice(1,-1)   
        }})
        .then((response) => {
            console.log("l;kjhugytfrde",response);
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log("server responded");
            } 
            else if (error.request) {
                console.log("network error");
            } 
            else {
                console.log(error);
            }
        },);
        console.log(count);
        var tmp = parseInt(count) + 1
        console.log(tmp);
        setCount(tmp);
    }


    const handleRemoveFromCartClick = () => {
        axios.get("http://5.34.195.16/restaurant/restaurant_view/"+ resid + "/" + userid + "/order/remove_from_order/" + food.id + "/",
        {headers: {
            'Content-Type' : 'application/json',
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Methods" : "PUT,PATCH",
            'Authorization' : "Token " + token.slice(1,-1)   
        }})
        .then((response) => {
            console.log("l;kjhugytfrde",response);
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log("server responded");
            } 
            else if (error.request) {
                console.log("network error");
            } 
            else {
                console.log(error);
            }
        },);
        if (count > 0) {
            setCount(count - 1);
        }
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    React.useEffect(() => {
        localStorage.setItem('countOffood', JSON.stringify(count));
        }, [count]);

        axios.get("http://5.34.195.16/restaurant/restaurant_view/" + resid + '/',
        {headers: {
            'Content-Type' : 'application/json',
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Methods" : "PUT,PATCH",
            'Authorization' : "Token " + token.slice(1,-1) 
 
        }})
        axios.get("http://5.34.195.16/restaurant/restaurant_view/" + id + '/')
        .then((response) => {
            console.log(response);
            setRestaurant(response.data);
            setMenu(restaurant.menu);
        })
        .catch((error) => {
            console.log(error);
        });
    });

    return ( 
        <div>
            <Card sx={{ borderRadius: 2 }} className= 'card-food'>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        sx={{ height: 140 }}
                        image="/food2.jpg"
                        title={food.Type}
                    />
                    <CardContent sx={{ height: 25}}>
                        <Typography gutterBottom className='food-name-restaurant-view'>{food.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{food.ingredients}</Typography>
                        <Typography variant="body2" color="#e74c3c">number remaining: 5</Typography>

                        {/* <hr className='food-hr'/> */}
                    </CardContent>
                    </CardActionArea>
                <CardActions>
                    <Grid container spacing={3.5} className='food-card-grid'>
                        <Grid item>
                            <Typography className='food-price'>${parseInt(food.price)}</Typography>
                        </Grid>
                        <Grid item lg={5} md={5} sm={5} className='count-buttons'>
                            <button className='button__wrapper' onClick={handleRemoveFromCartClick}>-</button>
                            <h5 className="food-h5" onChange={handleChange}>{count}</h5>
                            <button className='button__wrapper' onClick={handleAddToCartClick}>+</button>
                        </Grid>
                    </Grid>
                </CardActions>
                {/* <CardActions> */}
                    {/* <IconButton color="success" aria-label="add to shopping cart" onClick={handleAddToCartClick}>
                        <AddShoppingCartIcon/>
                    </IconButton>
                    <TextField
                        // type='number'
                        // label="count"
                        // variant="standard" 
                        // onChange={handleChange}
                        // value={count}
                        id="standard-basic" label="Standard" variant="standard" size='smaller' sx={{ mx: 1, maxWidth: 50 }}
                    />
                    <IconButton sx={{ height: 2, width: 2 }} aria-label="add to shopping cart" onClick={handleRemoveFromCartClick}> */}
                        {/* <RemoveShoppingCart sx={{fontSize: "small "}}/> */}
                    {/* </IconButton>
                </CardActions>
                

                {/* <CardActions disableSpacing> */}
                        {/* <Rating name="read-only" value={rateValue} readOnly /> */}
                        {/* <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                        <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
 */}
                {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            Ingredients: {food.ingredients}
                        </Typography>
                    </CardContent>
                </Collapse> */}
            </Card>
        </div>
    );
}
export default Food;