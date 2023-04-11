import * as React from 'react';
import Typography from '@mui/material/Typography';
import '../pages/Restaurant-View.css';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { red } from '@mui/material/colors';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCart from '@material-ui/icons/RemoveShoppingCart';
import IconButton from '@mui/material/IconButton';
import { TextField } from '@material-ui/core';
import OutlinedInput from '@mui/material/OutlinedInput';

const Food = ({food}) => {
    const [count, setCount] = React.useState(0);

    const handleAddToCartClick = () => {
        setCount(count + 1);
    }

    const handleRemoveFromCartClick = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    }

    React.useEffect(() => {
        localStorage.setItem('countOffood', JSON.stringify(count));
        }, [count]);

    return ( 
        <div>
            <Card className= 'card-food'>
            <CardMedia
                sx={{ height: 140 }}
                image="/food1.jpg"
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Special Sultan's Kebab of Mohsen
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Premium leaf (300g) + Kebab Lqma (250g) + Grilled tomato without rice and side dishes (decorative picture).
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton color="success" aria-label="add to shopping cart" onClick={handleAddToCartClick}>
                    <AddShoppingCartIcon />
                </IconButton>
                <TextField
                    type='text'
                    label="count"
                    variant='outlined'
                    onChange={(e) => setCount(e.target.value)}
                    value={count}
                    inputProps={{
                        pattern: '[0-9]*'
                    }}
                />
                <IconButton sx={{ color: red[500] }} aria-label="add to shopping cart" onClick={handleRemoveFromCartClick}>
                    <RemoveShoppingCart />
                </IconButton>
            </CardActions>
            </Card>
        </div>
    );
}
export default Food;