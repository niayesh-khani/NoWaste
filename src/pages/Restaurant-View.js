import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import {Badge } from "@material-ui/core";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Restaurant-View.css';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Grid } from '@material-ui/core';
import { Container, Rating } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Masonry from 'react-masonry-css';
import Food from '../components/Food';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0, 
    marginRight: theme.spacing(8), 
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1), 
        width: 'auto',
    },
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
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

const RestaurantView = () => 
{
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState('');
    const [expanded, setExpanded] = React.useState(false);
    const [rateValue, setRateValue] = React.useState(2);
    const [color, setColor] = React.useState(false);


    const handleColor = () => {
        setColor(!color);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    //////----------------------------------------------
    const breakpoints = {
        default: 3,
        1100: 2,
        700:1
    }

    const foods = ["food1","food2","food3", "food4", "food5", "food6", "food7"]


    return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className="header-restaurant-view">
            <Toolbar className='toolbar-restaurant-view'>

                <img 
                    className='logo'
                    src="/logo4.png"
                    alt="NoWaste"
                />

                <Search>
                    <SearchIconWrapper>
                    <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                {auth && (
                <div >
                    
                    <IconButton color='inherit'>
                        <Badge badgeContent={2} color='error'>
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                    <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                    className='last-icon-restaurant-view'
                    >
                    <AccountCircle />
                    </IconButton>
                    
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>Log out</MenuItem>
                    </Menu>

                </div>
                )}
            </Toolbar>
            </AppBar>
        </Box>
        
        <Card className='card-restaurant-view' sx={{ borderStyle: 'none'}}>
            <Grid container spacing={1} alignItems="center">
                <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            M
                            </Avatar>
                        }
                        title="Restaurant Mohsen"
                        subheader="From September 14, 2023"
                        >
                </CardHeader>

                <Grid item>

                <BottomNavigation>
                    <BottomNavigationAction 
                        value="favorites"
                        icon={
                        color ? 
                        <FavoriteIcon className='favorite-restaurant-view' sx={{ color: 'red'}} onClick={handleColor} /> :
                        <FavoriteBorderIcon className='favorite-restaurant-view' sx={{ color: 'inherit' }} onClick={handleColor} />
                        }
                    />
                </BottomNavigation>
                    

                </Grid>
            </Grid>

                <CardMedia
                component="img"
                src="/mohsen.jpg"
                alt="Restaurant1"
                />
                <CardContent>
                <Typography variant="body2" className='Body2-restaurant-view' color="text.secondary">
                    Restaurant Mohsen takes pride that since 1375 (1996/1997), the same time it started its activities, it has been maintaining its special quantity and quality with the full supervision of management and the support of an experienced team in the preparation of raw materials and cooking affairs.
                </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Rating name="read-only" value={rateValue} readOnly />
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
                        phone number : 021 2284 5657
                    </Typography>
                    <Typography paragraph>
                        Address : Tehran Province, Tehran, Zarrabkhaneh, Qoba, QF52+P86
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
        
        <Container>
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
        </Container>
    </div>
    );
}

export default RestaurantView;
