import * as React from 'react';
import * as MU from '@mui/material';
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
import {useHistory } from "react-router-dom";
import Header from './Header';



const Search = MU.styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: MU.alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: MU.alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0, 
    marginRight: theme.spacing(8), 
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1), 
        width: 'auto',
    },
}));

const SearchIconWrapper = MU.styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = MU.styled(MU.InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
            width: '20ch',
        },
        },
},
}));

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = MU.styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
    }),
}));


const RestaurantView = (props: Props) => 
{
    const [expanded, setExpanded] = React.useState(false);
    const [rateValue, setRateValue] = React.useState(2);
    const [color, setColor] = React.useState(false);
    const history = useHistory();


    const handleColor = () => {
        setColor(!color);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    const breakpoints = {
        default: 3,
        1100: 2,
        700:1
    }

    const foods = ["food1","food2","food3", "food4", "food5", "food6", "food7"]


    return (
    <div>
        <Header/>
        <MU.Grid container spacing={2} sx={{
            paddingTop:"2%"
        }}>
            <MU.Grid item md={3}>
                <MU.Card sx={{ borderStyle: 'none'}} className='card-restaurant-view'>
                    <MU.Grid container spacing={1} alignItems="center" >
                    <MU.Grid item>
                        <MU.CardHeader 
                                avatar={
                                    <MU.Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    M
                                    </MU.Avatar>
                                }
                                title="Restaurant Mohsen"
                                subheader="From September 14, 2023"
                                >
                        </MU.CardHeader>
                        </MU.Grid>
                        <MU.Grid item sx={{
                            marginLeft:"10%"
                        }}>

                        <MU.BottomNavigation>
                            <MU.BottomNavigationAction 
                                value="favorites"
                                icon={
                                color ? 
                                <FavoriteIcon className='favorite-restaurant-view' sx={{ color: 'red'}} onClick={handleColor} /> :
                                <FavoriteBorderIcon className='favorite-restaurant-view' sx={{ color: 'inherit' }} onClick={handleColor} />
                                }
                            />
                        </MU.BottomNavigation>
                            

                        </MU.Grid>
                    </MU.Grid>

                        <MU.CardMedia
                        component="img"
                        src="/mohsen.jpg"
                        alt="Restaurant1"
                        />
                        <MU.CardContent>
                        <MU.Typography variant="body2" className='Body2-restaurant-view' color="text.secondary">
                            Restaurant Mohsen takes pride that since 1375 (1996/1997), the same time it started its activities, it has been maintaining its special quantity and quality with the full supervision of management and the support of an experienced team in the preparation of raw materials and cooking affairs.
                        </MU.Typography>
                        </MU.CardContent>
                        <MU.CardActions disableSpacing>
                            <MU.Rating name="read-only" value={rateValue} readOnly />
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                            <ExpandMoreIcon />
                            </ExpandMore>
                        </MU.CardActions>
                    <MU.Collapse in={expanded} timeout="auto" unmountOnExit>
                        <MU.CardContent>
                            <MU.Typography paragraph>
                                phone number : 021 2284 5657
                            </MU.Typography>
                            <MU.Typography paragraph>
                                Address : Tehran Province, Tehran, Zarrabkhaneh, Qoba, QF52+P86
                            </MU.Typography>
                        </MU.CardContent>
                    </MU.Collapse>
                </MU.Card>
            </MU.Grid>
            
            <MU.Grid item md={9}>
            {/* <MU.Container> */}
                <Masonry
                    breakpointCols={breakpoints}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
            >
                {foods.map(food => (
                <div item xs={3}>
                    <Food food={food}/>
                </div>
                ))}
            </Masonry>
            {/* </MU.Container> */}
            </MU.Grid>
            <BackToTop/>
        </MU.Grid>

        {/* <Footer/> */}

    </div>
    );
}

export default RestaurantView;

