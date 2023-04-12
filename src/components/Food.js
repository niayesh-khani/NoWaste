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
import './Food.css';


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


const Food = ({food}) => {
    const [count, setCount] = React.useState(0);
    const [expanded, setExpanded] = React.useState(false);


    const handleAddToCartClick = () => {
        const tmp = count + 1;
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

    return ( 
        <div>
            <Card className= 'card-food'>
            <CardMedia
                sx={{ height: 140 }}
                image="/food1.jpg"
                title="green iguana"
            />
            <CardContent >
                <Typography gutterBottom className='food-name-restaurant-view' >
                    Special Sultan's Kebab of Mohsen
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                    Premium leaf (300g) + Kebab Lqma (250g) + Grilled tomato without rice and side dishes (decorative picture).
                </Typography> */}
            </CardContent>
            <CardActions>
                <IconButton color="success" aria-label="add to shopping cart" onClick={handleAddToCartClick}>
                    <AddShoppingCartIcon />
                </IconButton>
                <TextField
                    // type='number'
                    label="count"
                    variant='outlined'
                    onChange={(e) => setCount(e.target.value)}
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
                    Premium leaf (300g) + Kebab Lqma (250g) + Grilled tomato without rice and side dishes (decorative picture).
                    </Typography>
                </CardContent>
            </Collapse>


            </Card>
        </div>
    );
}
export default Food;