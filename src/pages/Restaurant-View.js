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
import Foods from '../components/Foods';
import BackToTop from '../components/BackToTop';
import Footer from '../components/Footer';
import NavigationIcon from '@material-ui/icons/Navigation';
import { Button } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useHistory } from "react-router-dom";
import Header from './Header';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ShowComment from '../components/ShowComment';



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

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };


const RestaurantView = (props: Props) => 
{
    const [expanded, setExpanded] = React.useState(false);
    const [rateValue, setRateValue] = React.useState(2);
    const [color, setColor] = React.useState(false);
    const [restaurant, setRestaurant] = React.useState();
    // const [open, setOpen] = React.useState(false);

    // const handleOpenComment = () => setOpen(true);
    // const handleCloseComment = () => setOpen(false);

    
    const history = useHistory();
    const {id} = useParams();

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

    React.useEffect(() => {
        axios.get("http://127.0.0.1:8000/restaurant/restaurant_profile/" + id + '/')
        .then((response) => {
            console.log(response);
            setRestaurant(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    });

    return (
    <div>
        <Header />
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

                {/* <div>
                    <Button onClick={handleOpenComment} variant="contained" id="submit-restaurant-view" className="field-restaurant-view " color="primary" >
                        See comment
                    </Button>
                    <Modal
                        open={open}
                        onClose={handleCloseComment}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                        
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            User comment
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                        </Box>
                    </Modal>
                </div>  */}
                <ShowComment />


            </MU.Grid>
            
            <MU.Grid item md={9}>
            {/* <MU.Container> */}
                <Masonry
                    breakpointCols={breakpoints}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
            >
                <div item xs={3}>
                    <Foods />
                </div>
            </Masonry>
            {/* </MU.Container> */}
            </MU.Grid>
            <BackToTop/>
        </MU.Grid>
        <Footer/>

    </div>
    );
}

export default RestaurantView;

