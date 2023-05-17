import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import { ExpandMore, ExpandLess} from '@mui/icons-material';
import Masonry from 'react-masonry-css';
import Food from '../components/Food';
import BackToTop from '../components/BackToTop';
import Footer from '../components/Footer';
import { Button, InputLabel, FormControl, Paper, TextareaAutosize } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useHistory } from "react-router-dom";
import Header from '../components/Header';
import Slider from '@mui/material/Slider';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { react } from '@babel/types';
import { Collapse, Grid, MenuItem, TextField, createTheme } from '@mui/material';
import { ThemeProvider, makeStyles } from '@mui/styles';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import "./HomepageRestaurant.css";
import RestaurantCard from '../components/RestaurantCard';
import { Container, Row } from 'react-bootstrap';
import StarRateIcon from '@mui/icons-material/StarRate';
import {InputBase} from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import { Card, CardActionArea, CardMedia, CardContent, Chip } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import MdPhone from '@mui/icons-material/Phone';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import '../components/OwnRestaurantCard.css';
import '../components/OwnRestaurantCard.css';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import InfoIcon from '@mui/icons-material/Info';

const theme = createTheme({
    palette: {
        primary: {
            main: '#dd9d46',
        },
        secondary: {
            main: '#a44704',
        }
    },
})

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
            backgroundColor:'#dd9d46',
            opacity: 1,
            border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.5,
        },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#dd9d46',
        border: '6px solid #dd9d46',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
        color:
            theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
        duration: 500,
        }),
    },
    }));

const useStyles = makeStyles({
    markLabel: {
        fontSize: '0.6rem !important',
        width: '0 !important',
        height: '0 !important',
        alignContent: 'center',
        alignItems: 'center',
        transform: "translateX(-25px) !important"
    },
    markLabelActive: {
        fontSize: '0.5rem',
        width: '0 !important',
        height: '0 !important',
    },
});
const rateMarks = [
    {
        value: 0.0,
        label: "Least reted",
    },
    {
        value: 5.0,
        label: "Most rated",
    }
];
function rateValueText(rateMarks) {
    return `${rateMarks}`;
}
const discountMarks = [
    {
        value: 0,
        label: "Least discount"
    },
    {
        value: 100,
        label: "Most discount"
    }
];
function discountValueText(discountMarks) {
    return `${discountMarks}`;
}

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

const breakpoints = {
    default: 2,
    1100: 2,
    700:1
};

const HomepageRestaurant = () => {
    const [show, setShow] = useState(false);
    const [validInputs, setValidInputs] = useState(false);
    const [newName, setNewName] = useState('');
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [newPhone, setNewPhone] = useState('');
    const [newAddress, setNewAdress] = useState('');
    const [newDiscount, setNewDiscount] = useState('');
    const [restaurants, setRestaurants] = useState();
    const [openNetwork, setOpenNetwork] = useState(null);
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const history = useHistory();
    const [open, setOpen] = useState(false);

    const handleSidebarOpen = () => {
        setOpen(!open);
      };
    
    const handleSidebarClose = () => {
        setOpen(false);
    }

    const handleShow = (res) => {
        history.push(`edit-restaurant/${id}/restaurants/${res.id}`);
    };

    const handleDelete = (res) => {
        console.log("i'm here to delete.");
        axios.delete(`http://5.34.195.16/restaurant/managers/${id}/restaurants/${res.id}/`)
        .then((response) => {
            window.location.reload(false);
        })
        .catch((error) => console.log(error));
    };
    const handleEdit = (res) => {
        history.push(`/${id}/restaurants/${res.id}`);
    };

    function setHeight() {
        const box = document.querySelector('.box');
        const boxHeight = box.offsetHeight;
        const image = document.querySelector('.background');
        image.style.height = `${boxHeight}px`;
    }
    const handleCloseNetwork = () => {
        setOpenNetwork(false);
        setHeight();
    }

    useEffect(() => {
        let valid = false;
        if (!(newAddress || newDiscount || newName || newPhone))
            valid = true;
        setValidInputs(valid);
    }, [newAddress, newName, newDiscount, newPhone]);

    useEffect(() =>{
        axios.get(
            `http://5.34.195.16/restaurant/managers/${id}/restaurants/` , 
            {headers :{
                'Content-Type' : 'application/json',
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Methods" : "GET,POST",
                // 'Authorization' : "Token " + token.slice(1,-1)
            }}
        )
        .then((response) => {
            console.log(response);
            setRestaurants(response.data);
        })
        .catch((error) => console.log(error));
    },[]);

    const handleCancle = () => {
        window.location.reload(false);
    }

    const handleClick = () => {
        history.push("");
    }

    const handleAdd = (e) => {
        e.preventDefault();
        const userData = {
            number: newPhone,
            name: newName,
            address: newAddress,
            rate: "" ,
            restaurant_image: "",
            data_of_establishment: "",
            description: ""
            };
            console.log(userData);
            axios.post(`http://5.34.195.16/restaurant/managers/${id}/restaurants/`, userData, {headers:{"Content-Type" : "application/json"}})
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("server responded");
                } 
                else if (error.request) {
                    setOpenNetwork(true);
                    console.log("network error");
                } 

            });  
        }

    return ( 
        <ThemeProvider theme={theme}>
        <Header />
        <IconButton onClick={handleSidebarOpen}>
                <MenuIcon/>
        </IconButton>
        <Grid container spacing={2} sx={{ paddingBottom:"1%"}} className='grid-homepage-restaurant'>
            <Grid item md={3}>
                <Drawer
                    anchor="left"
                    open={open}
                    onClose={handleSidebarOpen}
                    classes={{
                        paper: 'sidebar'
                      }}
                >
                    <div className="sidebar-header">
                        <h2>NoWaste</h2>
                        <IconButton>
                            <KeyboardDoubleArrowLeftIcon className='close-icon' onClick={handleSidebarClose}/>
                        </IconButton>
                    </div>
                    <Divider color="white" variant="middle"/>
                    <List className="sidebar-list">
                        <ListItem button className='list-item'>
                            <ListItemIcon >
                            <AddBusinessIcon className='list-icon'/>
                            </ListItemIcon>
                            <ListItemText primary="Add new restaurant" onClick={() => setShow(prev => !prev)}/>
                        </ListItem>
                        {show && <Box className='add-box'>
                            <TextField 
                                label="Name"
                                variant="outlined"
                                color="secondary"
                                style={{width: '100%', marginTop: '10px', borderColor: 'white'}}
                                // InputLabelProps={{ shrink: true }} 
                            />
                            <TextField 
                                label="Address"
                                variant="outlined"
                                color="secondary"
                                style={{width: '100%', marginTop: '10px', borderColor: 'white'}}
                                // InputLabelProps={{ shrink: true }} 
                            />
                            <PhoneInput
                                label="Phone number"
                                defaultCountry="ir"
                                color="secondary"
                                InputLabelProps={{ shrink: true }} 
                                className="phone-input"
                                style={{width: '100%'}}
                                variant="outlined"
                                                // focused={true}
                            />
                            <TextField 
                                label="Discount"
                                variant="outlined"
                                color="secondary"
                                style={{width: '100%', marginTop: '10px', borderColor: 'white'}}
                            />
                            <Grid container spacing={2} className="new-restaurant-button-grid" wrap="nowrap">
                                        <Grid item style={{paddingLeft: '20px'}}>
                                            <Button className="discard-button" id="edit-button" variant="contained" onClick={handleCancle}
                                            >Cancel</Button>
                                        </Grid>
                                        <Grid item style={{paddingRight: '5px'}}>
                                            <Button className="add-button" id="edit-button" variant="contained" onClick={handleAdd}
                                                disabled={!validInputs}
                                                // style={{marginRight: "-2%"}}
                                            >Add</Button>
                                    </Grid>
                            </Grid>
                        <BackToTop/>
                        </Box>
                        }
                        <ListItem button className='list-item'>
                            <ListItemIcon>
                                <DeleteIcon className='list-icon'/>
                            </ListItemIcon>
                            <ListItemText primary="Remove restaurant"/>
                        </ListItem>
                    </List>
                    <Divider color="white" variant="middle" className='divider'/>
                    <div className="sidebar-footer">
                    <PermPhoneMsgIcon className='sidebar-footer-icon'/>  Contact
                    </div>
                    <div className="sidebar-footer">
                    <InfoIcon className='sidebar-footer-icon'/> About us
                    </div>
                </Drawer>
                {/* <Footer/> */}
            </Grid>
            <Grid item md={9}>
                <Grid item>
                    <Masonry style={{paddingLeft: "0%"}} breakpointCols={breakpoints}>
                        {restaurants && restaurants.map((res, index) => (
                            <div  key={index} style={{ width: index % 2 === 0 ? '100%' : '' }}>
                                <Card className='homepage-restaurant-card-restaurant' onClick={() => {handleShow(res)}}>
                                <CardActionArea>
                                    <Grid container spacing={2}>
                                    <Grid item md={6}>
                                        <div style={{ position: 'relative' }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ height: 200, width: 200, marginLeft: 1, marginTop: 1, marginBottom: 1, borderRadius: 1 }}
                                            image="/mohsen.jpg"
                                        />
                                        </div>
                                    </Grid>
                                    <Grid item md={6}>
                                        <CardContent>
                                            <Grid container style={{color: "black"}}>
                                                <Grid item>
                                                    <Typography className='restaurant-name-hemepage-restaurant' gutterBottom>
                                                        {res.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item container alignItems="center">
                                                    {/* <LocationOnIcon sx={{ marginRight: '0.5rem' }} />
                                                    <Typography variant="body2">This is the address.</Typography> */}
                                                    <Chip
                                                        icon={<MdPhone/>}
                                                        sx={{mb:1, fontSize: "medium"}}
                                                        label={res.number}
                                                    />
                                                </Grid>
                                                <hr></hr>
                                                <Grid item container alignItems="center">
                                                    <StarRateIcon sx={{ marginRight: '0.5rem', marginLeft: '5px' }} style={{ color: '#faaf00' }} />
                                                    <Typography>{res.rate}</Typography>
                                                </Grid>
                                                <hr></hr>
                                                <Grid item container alignItems="center">
                                                    {/* <PhoneIcon sx={{ marginRight: '0.5rem' }} />
                                                    <Typography>09116705720</Typography> */}
                                                    <Chip
                                                        icon={<PlaceIcon />}
                                                        sx={{fontSize: "medium"}}
                                                        label={res.address}
                                                    />
                                                    <div>
                                                    <EditIcon title="Edit" onClick={() => {handleEdit(res)}} className='edit-icons-card-restaurant-homepage'/>
                                                    <DeleteForeverIcon title="Delete" onClick={() => {handleDelete(res)}} className='delete-icons-card-restaurant-homepage'/>
                                                </div>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Grid>
                                    </Grid>
                                </CardActionArea>
                                </Card>
                            </div>
                        ))}
                    </Masonry>
                </Grid>
            </Grid>
        </Grid>

        </ThemeProvider>
    );
}

export default HomepageRestaurant;