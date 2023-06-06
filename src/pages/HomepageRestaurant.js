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
import { Button, InputLabel, FormControl, Paper, TextareaAutosize, withStyles, ThemeProvider, Typography, TextField} from '@material-ui/core';
// import Typography from '@mui/material/Typography';
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
import { Collapse, Grid, MenuItem, createTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import "./HomepageRestaurant.css";
import RestaurantCard from '../components/RestaurantCard';
import { Container, Row } from 'react-bootstrap';
import StarRateIcon from '@mui/icons-material/StarRate';
import {InputBase} from '@mui/material';
import PhoneInput from 'material-ui-phone-number';
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
import PersonIcon from '@mui/icons-material/Person';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';

const theme = createTheme({
    palette: {
        primary: {
            main: '#dd9d46',
        },
        secondary: {
            main: '#a44704',
        }
    },
});
const styles = theme => ({
    field: {
      margin: '10px 0',
      width : "100px",
    },
    countryList: {
      ...theme.typography.body1,
      width : "100px",
    },
  });
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
    default: 3,
    1100: 2,
    700:1
};

function HomepageRestaurant(props){
    const { value, defaultCountry, onChange, classes } = props;
    const [show, setShow] = useState(false);
    const [validInputs, setValidInputs] = useState(false);
    const [newName, setNewName] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newAddress, setNewAddress] = useState('');
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
        axios.delete(`http://5.34.195.16/restaurant/managers/${id}/restaurants/${res.id}/`,
        {headers: {
            'Content-Type' : 'application/json',
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Methods" : "PUT,PATCH",
            'Authorization' : "Token " + token.slice(1,-1)   
        }})
        .then((response) => {
            window.location.reload(false);
        })
        .catch((error) => console.log(error));
    };
    const handleEdit = (res) => {
        history.push(`edit-restaurant/${id}/restaurants/${res.id}`);
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
            valid = false;
        setValidInputs(valid);
    }, [newAddress, newName, newDiscount, newPhone]);

    useEffect(() =>{
        console.log("i'm here to get the restaurants.");
        axios.get(
            `http://5.34.195.16/restaurant/managers/${id}/restaurants/` , 
            {headers :{
                'Content-Type' : 'application/json',
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Methods" : "GET,POST",
                'Authorization' : "Token " + token.slice(1,-1)
            }}
        )
        .then((response) => {
            console.log(response);
            setRestaurants(response.data);
        })
        .catch((error) => console.log(error));
    },[]);

    const handleAddName = (e) => {
        setNewName(e.target.value);
    }
    const handleAddPhone = (e) => {
        setNewPhone(e);
    }
    const handleAddDiscount = (e) => {
        setNewDiscount(e.target.value / 100);
    }
    const handleAddAddress = (e) => {
        setNewAddress(e.target.value);
    }

    const handleCancle = () => {
        window.location.reload(false);
    }

    const handleShowProfile = () => {
        history.push(`/edit-manager`);
    }

    const handleAdd = (e) => {
        e.preventDefault();
        const userData = {
            number: newPhone,
            name: newName,
            address: newAddress,
            rate: 0 ,
            restaurant_image: "",
            data_of_establishment: null,
            discount: newDiscount
            };
            console.log(userData);
            axios.post(`http://5.34.195.16/restaurant/managers/${id}/restaurants/`, userData, 
            {headers: {
                'Content-Type' : 'application/json',
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Methods" : "PUT,PATCH",
                'Authorization' : "Token " + token.slice(1,-1)   
            }})
            .then((response) => {
                console.log(response);
                window.location.reload(false);
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
        const [openModal, setOpenModal] = React.useState(false);
        const handleOpenModal = () => setOpenModal(true);
        const handleCloseModal = () => setOpenModal(false);

    return ( 
        <ThemeProvider theme={theme}>
            <Header />
            <h1 className='home-res-title'>Restaurants</h1>
            <div>
                <Fab
                    style={{ backgroundColor: "#ffa600", position: "fixed", right: "20px", bottom: "20px"}}
                    aria-label="add"
                    onClick={handleOpenModal}>
                    <AddBusinessIcon />
                </Fab>
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className="add_res_box">
                        <div className='add-title'>Add New Restaurant</div>
                        <TextField 
                            label="Name"
                            variant="outlined"
                            color="secondary"
                            onChange={handleAddName}
                            style={{width: '100%', marginTop: '10px'}}
                            InputLabelProps={{ shrink: true }} 
                        />
                        <TextField 
                            label="Address"
                            variant="outlined"
                            color="secondary"
                            onChange={handleAddAddress}
                            multiline
                            style={{width: '100%', marginTop: '10px'}}
                            InputLabelProps={{ shrink: true }} 
                        />
                        <PhoneInput
                            label="Phone number"
                            defaultCountry="ir"
                            color="secondary"
                            InputLabelProps={{ shrink: true }} 
                            className="phone-input"
                            inputClass={classes.field}
                            style={{marginTop: '10px'}}
                            variant="outlined"
                            // focused={true}
                            onChange={handleAddPhone}
                        />
                        <TextField 
                            label="Discount"
                            variant="outlined"
                            color="secondary"
                            onChange={handleAddDiscount}
                            style={{width: '100%', marginTop: '10px', borderColor: 'white'}}
                        />
                        <Grid container spacing={2} className="new-restaurant-button-grid" wrap="nowrap">
                                    <Grid item style={{paddingLeft: '20px'}}>
                                        <Button className="discard-button" id="add-buttons" variant="contained" onClick={handleCancle}
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>
                                    <Grid item style={{textAlign:"center"}}>
                                        <Button className="add-button" id="add-buttons" variant="contained" onClick={handleAdd}
                                            // disabled={!validInputs}
                                            // style={{marginRight: "-2%"}}
                                        >
                                            Add
                                        </Button>
                                </Grid>
                        </Grid>
                    </Box>
                </Modal>

            </div>      
            <Grid container  sx={{ paddingBottom:"1"}} className='grid-homepage-restaurant'>
                {/* <Grid item md={0.5}>
                </Grid> */}
                <Grid item md={12}>
                    <Grid item>
                        <Masonry style={{paddingLeft: "0%"}} breakpointCols={breakpoints}>
                            {restaurants && restaurants.map((res, index) => (
                                <div  key={index}>
                                    <Card className='homepage-restaurant-card-restaurant' style={{ marginRight: '-100px' }}>
                                    <CardActionArea>
                                        <Grid container spacing={3}>
                                        <Grid item md={6}>
                                            <div style={{ position: 'relative' }}>
                                            <CardMedia
                                                component="img"
                                                sx={{ height: 200, width: 200, marginLeft: 3, marginTop: 2, marginBottom: 2, borderRadius: 2 }}
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
                                                    <Grid item container alignItems="center" marginBottom={"2px"}>
                                                        <Chip
                                                            icon={<MdPhone sx={{ fontSize: 20 }}/>}
                                                            sx={{mb:1, fontSize: "15px"}}
                                                            label={res.number}
                                                        />
                                                    </Grid>
                                                    {/* <hr></hr> */}
                                                    <Grid item container alignItems="center" marginBottom={"8px"}>
                                                        {/* <PhoneIcon sx={{ marginRight: '0.5rem' }} />
                                                        <Typography>09116705720</Typography> */}
                                                        <Chip
                                                            icon={<PlaceIcon sx={{ fontSize: 20 }}/>}
                                                            sx={{fontSize: "15px"}}
                                                            label={res.address}
                                                        />

                                                    </Grid>
                                                    {/* <hr></hr> */}
                                                    <Grid item container alignItems="center" display= 'flex'>
                                                        <Grid item container alignItems="center" marginBottom={"15px"}>
                                                            <StarRateIcon sx={{ marginRight: '0.3rem', marginLeft: '5px', color: '#faaf00' }} />
                                                                <Typography style={{ marginRight: '0.2rem', marginTop:'2.5%' }}>{res.rate}</Typography>    
                                                        </Grid>
                                                        <div style={{marginLeft: '50%'}}>
                                                            <Grid container>
                                                                <Grid item >
                                                                    <IconButton title="Edit restaurant">
                                                                        <EditIcon  onClick={() => {handleEdit(res)}} className='edit-icons-card-restaurant-homepage'/>
                                                                    </IconButton>
                                                                </Grid>
                                                                <Grid item lg={0.2} >
                                                                    <IconButton title="Delete restaurant">
                                                                        <DeleteForeverIcon onClick={() => {handleDelete(res)}} className='delete-icons-card-restaurant-homepage'/> 
                                                                    </IconButton>
                                                                </Grid>
                                                            </Grid>
                                                        </div>
                                                        {/* <div className='two-icons-homepage'>
                                                        <EditIcon title="Edit" onClick={() => {handleEdit(res)}} className='edit-icons-card-restaurant-homepage'/>
                                                        <DeleteForeverIcon title="Delete" onClick={() => {handleDelete(res)}} className='delete-icons-card-restaurant-homepage'/>
                                                        </div> */}
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


export default withStyles(styles)(HomepageRestaurant);