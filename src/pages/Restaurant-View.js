import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Rating } from '@mui/material';


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

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                    </Avatar>
                }
                title="name_restaurant"
                subheader="From September 14, 2016"
            >
                <IconButton aria-label="add to favorites" color="primary">
                    <FavoriteIcon />
                </IconButton>
            </CardHeader>
            <CardMedia
            component="img"
            src="/logo4.png"
            alt="Restaurant1"
            />
            <CardContent>
            <Typography variant="body2" className='Body2-restaurant-view' color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to cook
                together with your guests. Add 1 cup of frozen peas along with the mussels,
                if you like.
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
                    phone number : 09125478945
                </Typography>
                <Typography paragraph>
                    Address : hell
                </Typography>
            </CardContent>
        </Collapse>
        </Card>
    </div>
    );
}

export default RestaurantView;
