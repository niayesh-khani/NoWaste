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

    const breakpoints = {
        default: 3,
        1100: 2,
        700:1
    }

    const foods = ["food1","food2","food3", "food4", "food5", "food6", "food7"]


    return (
    <div>
        <MU.Box sx={{ flexGrow: 1 }}>
            <MU.AppBar position="static" className="header-restaurant-view">
            <MU.Toolbar className='toolbar-restaurant-view'>

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
                        <MU.Badge badgeContent={2} color='error'>
                            <ShoppingCartIcon />
                        </MU.Badge>
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
                    
                    <MU.Menu
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
                    <MU.MenuItem onClick={handleClose}>Profile</MU.MenuItem>
                    <MU.MenuItem onClick={handleClose}>Log out</MU.MenuItem>
                    </MU.Menu>

                </div>
                )}
            </MU.Toolbar>
            </MU.AppBar>
        </MU.Box>
        
        <MU.Card sx={{ borderStyle: 'none'}} className='card-restaurant-view'>
            <MU.Grid container spacing={1} alignItems="center" >
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

                <MU.Grid item>

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
        
        <MU.Container>
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
        </MU.Container>
        
        <BackToTop/>

        {/* <Footer/> */}

    </div>
    );
}

export default RestaurantView;

