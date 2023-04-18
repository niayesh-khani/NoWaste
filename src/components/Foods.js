import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { red } from '@mui/material/colors';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCart from '@material-ui/icons/RemoveShoppingCart';
import { TextField } from '@material-ui/core';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled} from '@mui/material/styles';
import './Foods.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';



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


const Foods = () => {
    const [count, setCount] = React.useState(0);
    const [expanded, setExpanded] = React.useState(false);
    const [restaurant, setRestaurant] = React.useState('');
    const [menu, setMenu] = React.useState([]);
    const {id} = useParams();

    const handleChange = (e) => {
        setCount(e.target.value);
    }
    console.log(count);

    const handleAddToCartClick = () => {
        console.log(count);
        var tmp = parseInt(count) + 1
        console.log(tmp);
        setCount(tmp);
    }


    const handleRemoveFromCartClick = () => {
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

    React.useEffect(() => {
        axios.get("http://nowaste39.pythonanywhere.com/restaurant/restaurant_profile/" + id + '/')
        .then((response) => {
            console.log(response);
            setRestaurant(response.data);
            setMenu(restaurant.menu);
        })
        .catch((error) => {
            console.log(error);
        });
    });

    console.log(menu);
    return ( 
        <div>
            {menu && menu.map((food) => (
                // <Grid container spacing={2}>
                //     <Grid item xs= {12} sm={6}>
                <Card className= 'card-food'>
                    <CardMedia
                        sx={{ height: 140 }}
                        image="/food1.jpg"
                        title={food.Type}
                    />
                    <CardContent >
                        <Typography gutterBottom className='food-name-restaurant-view' >
                            {food.name}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton color="success" aria-label="add to shopping cart" onClick={handleAddToCartClick}>
                            <AddShoppingCartIcon />
                        </IconButton>
                        <TextField
                            // type='number'
                            label="count"
                            variant='outlined'
                            onChange={handleChange}
                            value={count}
                        />
                        <IconButton sx={{ color: red[500] }} aria-label="add to shopping cart" onClick={handleRemoveFromCartClick}>
                            <RemoveShoppingCart />
                        </IconButton>
                    </CardActions>
                    

                    <CardActions disableSpacing>
                            {/* <Rating name="read-only" value={rateValue} readOnly /> */}
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                            <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>
                                {food.ingredients}
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            //     </Grid>
            // </Grid>
            ))}
        </div>
    );
}
export default Foods;