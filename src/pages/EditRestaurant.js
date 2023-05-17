import React, { useEffect, useState } from "react";
import './EditRestaurant.css';
import Header from '../components/Header';
import axios from "axios";
import Footer from "../components/Footer";
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { useParams } from 'react-router-dom';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Alert, AlertTitle, Dialog, FormControlLabel, makeStyles } from "@mui/material";
import { useHistory } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import PhoneInput from 'material-ui-phone-number';
import LockIcon from '@mui/icons-material/Lock';
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Box, Button, createTheme, DialogContent, DialogTitle, Divider, FormControl, Grid, Icon, IconButton, InputAdornment, Paper, TextField, ThemeProvider, Typography, withStyles } from "@material-ui/core";
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import { Girl } from "@mui/icons-material";

const styles = theme => ({
    field: {
      margin: '10px 0',
      width : "100px",
    },
    countryList: {
      ...theme.typography.body1,
      width : "100px",
    },
    dialogRoot: {
        width: '100%',
        // height: 'auto',
        minHeight: '300px',
        maxHeight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflowY: 'scroll'
    },
});
const StyledDialog = withStyles(styles)(Dialog);
const useStyles = makeStyles((theme) => ({
    squareAvatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      borderRadius: 0,
    },
}));
const theme = createTheme({
    palette: {
        primary: {
            main: '#dd9d46',
        },
        secondary: {
            main: '#a44704',
        }
    },
    overrides: {
        MuiFormLabel: {
            asterisk: {
                color: '#db3131',
                '&$error': {
                color: '#db3131'
                },
            }
        }
    }
});
function getRandomColor() {
    const colors = ['#FFA600', '#fff2bf', '#ffe480', '#a2332a' , '#E74C3C' , '#690000' , '#595959', '#3e3e3e' , '#C6C6C6', '#ABABAB', '#B9B9B9'];
    return colors[Math.floor(Math.random() * colors.length)];
}
function EditRestaurant(props){
    const class_avatar = useStyles();
    const { value, defaultCountry, onChange, classes } = props;
    const [fullname, setFullname] = useState('');
    const [fullnameError, setFullnameError] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openButton = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };   
    const [doe, setDoe] = useState(null);
    const [color, setColor] = useState(localStorage.getItem('avatarColor') || getRandomColor());
    const [update, setUpdate] = useState('');
    const [phone, setPhone] = useState('');
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    const [data, setData] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [newPasswordMatch, setNewPasswordMatch] = useState(false);
    const [show, setShow] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [profileImg, setProfileImg] = useState('');
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const [open, setOpen] = useState(false);
    const [openNetwork, setOpenNetwork] = useState(false);
    const [openWrongPass, setOpenWrongPass] = useState(false);
    const [validInputs, setValidInputs] = useState(false);
    const [openMenu, setOpenMenu] = useState(true);
    const idM = localStorage.getItem('id');
    const {idR} = useParams();
    const [foodName, setFoodName] = useState('');
    const [foodNameError, setFoodNameError] = useState(false);
    const [foodIngredient, setFoodIngredient] = useState('');
    const [foodIngredientError, setFoodIngredientError] = useState(false);
    const [foodType, setFoodType] = useState('');
    const [foodPrice, setFoodPrice] = useState('');
    const [foodPriceError, setFoodPriceError] = useState(false);

    const handleFullname = (e) => {
        setFullname(e.target.value);
        setUpdate({...update, name: e.target.value})
        if(!/^[a-zA-Z]+\s[a-zA-Z]+$/gm.test(e.target.value)){
            setFullnameError(true);
        } else {
            setFullnameError(false);
        }
    };

    useEffect(() => {
        if(!localStorage.getItem('avatarColor')) {
            localStorage.setItem('avatarColor', color);
        }
    }, [])

    const handlePhoneChange = (value) => {
        setUpdate({...update, number : value});
        localStorage.setItem('phone', value);
        setPhone(value);
    };
    const handleEstablishdate = (date) => {
        setDoe(date);
        console.log(data.date_of_establishment);
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        setUpdate({...update, date_of_establishment : formattedDate});
    };
    const handleOpenMenu = () => {
        setOpenMenu(!openMenu);
    };
    const handleCity = (e) => {
        setCity(e.target.value);
    };
    const handleCountry = (e) => {
        setCountry(e.target.value);
    };
    const handleAddress = (e) => {
        setAddress(e.target.value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };
    const handlenewPassword = (e) => {
        setNewPassword(e.target.value);
        if(e.target.value.length < 8 || !/[a-zA-Z]+/.test(e.target.value)){
            setNewPasswordError(true);
        } else {
            setNewPasswordError(false);
        }
    };
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };
    useEffect(() => {
        setNewPasswordMatch(newPassword === confirmPassword);
    }, [newPassword, confirmPassword]);
    useEffect(() => {
        const temp = country + ', ' + city + ', ' + address;
        setUpdate({...update, address : temp})
    }, [country, city, address])
        const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);

    useEffect(() => {
        setFullname(data.name);
    }, [data.name]);

    useEffect(() => {
        setDoe(data.date_of_establishment);
    }, [data.date_of_establishment]);

    useEffect(() => {
        const arr = data?.address?data?.address.split(","):"";
        setCountry(arr[2])
        setCity(arr[1]);
        setAddress(arr[0]);
    }, [data.address]);

    const history = useHistory();
    // const handleChange = () => {
    //     history.push('./change-password')
    // };
    const handleCloseNetwork = () => {
        setOpenNetwork(false);
    };
    const handleCloseWrongPass = () => {
        setOpenWrongPass(false);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleProfileImg = (e) => {
        const file = e.target.files[0];
        const fileSize = file.size;
        if(fileSize > MAX_FILE_SIZE){
            setOpen(true);
            e.target.value = null;
            setProfileImg(null);
            return;
        } else{
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setProfileImg(reader.result);
            };
        }
        console.log(profileImg);
    };
    const handleFoodName = (e) => {
        setFoodName(e.target.value);
        if(e.target.value.length > 255){
            setFoodNameError(true);
        } else {
            setFoodNameError(false);
        }
    };
    const handleFoodIngredient = (e) => {
        setFoodIngredient(e.target.value);
        if(e.target.value.length > 255){
            setFoodIngredientError(true);
        } else {
            setFoodIngredientError(false);
        }
    };
    const handleFoodType = (e) => {
        setFoodType(e.target.value);
    };
    const handleFoodPrice = (e) => {
        setFoodPrice(e.target.value);
        if(!/^[0-9]+([.][0-9]+)?$/.test(e.target.value) || e.target.value.trim() === ''){
            setFoodPriceError(true);
        } else {
            setFoodPriceError(false);
        }
    } 
    
    useEffect(() => {
        let valid = !fullnameError && !newPasswordError && newPasswordMatch
                    // && password.trim().length > 0 && newPassword.trim().length > 0 && confirmPassword.trim().length > 0;
        setValidInputs(valid);
    }, [fullnameError, password, newPasswordError, confirmPasswordError, newPasswordMatch]);

    const handleClickShowCurrentPassword = () => setShowCurrentPassword(!showCurrentPassword);
    const handleMouseDownCurrentPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
    const handleMouseDownnewPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    const handleMouseDownconfirmPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() =>{
        axios.get(
            `http://5.34.195.16/restaurant/managers/${idM}/restaurants/${idR}/` , 
            {headers :{
                'Content-Type' : 'application/json',
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Methods" : "GET,PATCH,PUT,DELETE"
                // 'Authorization' : "Token " + token.slice(1,-1)
            }}
        )
        .then((response) => {
            console.log(response);
            setData(response.data)
        })
        .catch((error) => console.log(error));
    },[]);

    const firstChar = data?.name?data.name.charAt(0) : "UN";
    const handleUpdate = (e) => {
        e.preventDefault();
        axios.patch(
            `http://5.34.195.16/restaurant/managers/${idM}/restaurants/${idR}/`, update,
            {headers: {
                'Content-Type' : 'application/json',
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Methods" : "GET,PATCH"
                // 'Authorization' : "Token " + token.slice(1,-1)   
            }}
        )
        .then((response)=> {
            console.log(response);
            console.log("succesfully updated");
            window.location.reload(false);
        })
        .catch((error) => {
            console.log(error)
            if (error.request) {
                setOpenNetwork(true);
                console.log("network error");
            }
        });
    }

    const handleDiscard = () => {
        window.location.reload(false);
    }
    const handleOpenEdit = () => {
        setOpenEdit(!openEdit);
    };
    const handleOpenAdd = () => {
        setOpenAdd(!openAdd);
    };

    return ( 
        <ThemeProvider theme={theme}>
            <div className="edit-back-restaurant">
                <Header/>
                <Grid container spacing={2} className="edit-grid-restaurant">
                    <Grid item md={3} sm={12} xs={12}>
                        <Box className="edit-box-restaurant">
                            <Typography variant="h5" 
                                color="textPrimary"
                                gutterBottom
                                className="edit-title-restaurant"
                                // style={{fontWeight: 'bold', fontSize: '30px'}}
                            >
                                Profile Picture
                            </Typography>
                            <Avatar
                                className="edit-avatar-restaurant"
                                style={{backgroundColor: color, fontSize:"40px"}}
                                src={profileImg}
                            >
                                {firstChar}
                            </Avatar>
                            <Typography className="text-above-upload-restaurant">
                                JPG or PNG no larger than 5 MB
                            </Typography>
                            {open && <Alert severity="error" open={open} onClose={handleClose} className="image-alert-restaurant" variant="outlined" >
                                        File size is too large.
                                    </Alert>
                            }
                            <input
                                accept="image/*"
                                id="contained-button-file"
                                type="file"
                                onChange={handleProfileImg}
                                hidden      
                                MAX_FILE_SIZE={MAX_FILE_SIZE}                   
                            />
                            <label htmlFor="contained-button-file" className="input-label-restaurant">
                                <Button className="upload-button-restaurant"  component="span">
                                    Upload new image
                                </Button>
                            </label>
                        </Box>
                    </Grid>
                    <Grid item md={9} sm={12} xs={12}>
                        <Box className="edit-box-restaurant">
                            <Typography variant="h5" 
                                color="textPrimary"
                                gutterBottom
                                className="edit-title-restaurant"
                                // style={{fontWeight: 'bold', fontSize: '30px'}}
                            >
                                Restaurant Details 
                            </Typography>
                            <FormControl className="edit-field-restaurant">
                                <Grid container spacing={2}>
                                    {openNetwork && 
                                            <Grid item lg={12} sm={12} md={12}>
                                                {openNetwork && <Alert severity="error" onClose={handleCloseNetwork} variant="outlined"> 
                                                                    Network error!
                                                                </Alert>
                                                }
                                            </Grid> 
                                    }
                                    {openWrongPass && 
                                        <Grid item lg={12} sm={12} md={12}>
                                                {openWrongPass && <Alert severity="error" onClose={handleCloseWrongPass} variant="outlined">
                                                                    Current password is wrong!
                                                                </Alert> 
                                                }                                        
                                        </Grid>    
                                    }
                                    <Grid item xs={12} sm={6} md={6}>
                                        <TextField
                                            label="Full name"
                                            variant="outlined"
                                            color="secondary"
                                            value={fullname}
                                            onChange={handleFullname}
                                            style={{width: '100%'}}
                                            error={fullnameError}
                                            InputLabelProps={{ shrink: true }} 
                                            helperText={
                                                <div className="edit-error-restaurant">
                                                    {fullnameError && 'Your full name should have at least two words.'}
                                                </div>
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <PhoneInput
                                            label="Phone number"
                                            value={data.number}
                                            defaultCountry="ir"
                                            color="secondary"
                                            onChange={handlePhoneChange}
                                            InputLabelProps={{ shrink: true }} 
                                            className="phone-input-restaurant"
                                            style={{width: '100%'}}
                                            variant="outlined"
                                            // focused={true}
                                        />
                                    </Grid>
                                </Grid>
                            </FormControl>
                            <FormControl className="edit-field-restaurant">
                                <Grid container spacing={1}>
                                    {/* <Grid item xs={12} sm={6} md={6}>
                                        <TextField
                                            label="Email address"
                                            variant="outlined"
                                            color="secondary"
                                            value={data.email}
                                            InputLabelProps={{ shrink: true }}  
                                            InputProps={{
                                                readOnly: true
                                            }}
                                            style={{width: '100%', marginTop: '7px'}}
                                        />
                                    </Grid> */}
                                    <Grid item xs={12} sm={12} md={12}lg={12}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} style={{width: '150%'}}
                                            InputLabelProps={{ shrink: true }}
                                        >
                                            <DemoContainer components={['DatePicker']} >
                                                <DatePicker
                                                    label="Establish date"
                                                    views={['year', 'month', 'day']}
                                                    sx={{width: '100%'}}
                                                    maxDate={dayjs()}
                                                    onChange={handleEstablishdate}
                                                    value={doe ? dayjs(doe) : null }
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </Grid>
                                </Grid>
                            </FormControl>
                            <FormControl className="edit-field-restaurant">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <TextField
                                            label="Country"
                                            variant="outlined"
                                            color="secondary"
                                            value={country}
                                            style={{width: '100%'}}
                                            onChange={handleCountry}
                                        /> 
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <TextField
                                            label="City"
                                            variant="outlined"
                                            color="secondary"
                                            value={city}
                                            style={{width: '100%'}}
                                            onChange={handleCity}
                                        /> 
                                    </Grid>
                                </Grid>
                            </FormControl>
                            <FormControl className="edit-field-restaurant">
                                <TextField
                                    label="Address"
                                    variant="outlined"
                                    color="secondary"
                                    multiline
                                    value={address}
                                    onChange={handleAddress}
                                /> 
                            </FormControl>
                            <FormControl className="edit-field-restaurant">
                                {openMenu && 
                                    <Button 
                                        color="secondary"
                                        // id="basic-button"
                                        // aria-controls={open ? 'basic-menu' : undefined}
                                        // aria-haspopup="true"
                                        // aria-expanded={open ? 'true' : undefined}
                                        // onClick={handleClick}
                                        onClick={handleOpenMenu}
                                        className="showmenu-button"
                                    >
                                        Show Menu
                                    </Button>
                                }
                                {!openMenu && 
                                    <div style={{margin: '5px'}}>
                                        <Grid container spacing={1} style={{justifyContent: 'flex-end', padding: '1px'}}
                                        // style={{position: 'absolute', justifyContent: 'flex-end', paddingRight: "10px"}}
                                        >
                                            <IconButton title="Add food">
                                                <AddIcon style={{color: 'green'}} onClick={handleOpenAdd}/>
                                            </IconButton>
                                            <IconButton title="Hide menu" >
                                                <ClearIcon style={{color: 'red'}} onClick={handleOpenMenu}/>
                                            </IconButton>
                                        </Grid>
                                        <StyledDialog open={openAdd} classes={{ paper: classes.dialogRoot }} onClose={handleOpenAdd}>
                                            <DialogTitle className="dialog-title">Add Food</DialogTitle>
                                            {/* <FormControl> */}
                                            {/* <Avatar
                                                className="edit-avatar-restaurant"
                                                style={{backgroundColor: color, fontSize: "40px", width: "40px", height: "40px" }}
                                                src={profileImg}
                                            >
                                                {firstChar}
                                            </Avatar> */}
                                            {/* </FormControl> */}
                                            <FormControl className="edit-field-restaurant">
                                                <TextField
                                                    label="Name"
                                                    variant="outlined"
                                                    color="secondary"
                                                    required
                                                    value={foodName}
                                                    onChange={handleFoodName}
                                                    error={foodNameError}
                                                    helperText={
                                                        <div className="edit-error-restaurant">
                                                            {foodNameError && "Name should have at most 256 character."}
                                                        </div>
                                                    }
                                                />
                                            </FormControl>
                                            <FormControl className="edit-field-restaurant">
                                                <TextField
                                                    label="Ingredient"
                                                    variant="outlined"
                                                    color="secondary"
                                                    multiline
                                                    // required
                                                    onChange={handleFoodName}
                                                    error={foodNameError}
                                                    helperText={
                                                        <div className="edit-error-restaurant">
                                                            {foodNameError && "Name should have at most 256 character."}
                                                        </div>
                                                    }
                                                />
                                            </FormControl>
                                            <FormControl className="edit-field-restaurant">    
                                                <Grid container spacing={2}>
                                                    <Grid item lg={6} md={6} sm={12}>
                                                        <TextField
                                                            select
                                                            label="Type"
                                                            variant="outlined"
                                                            color="secondary"
                                                            required
                                                            style={{width: '100%'}}
                                                            value={foodType}
                                                            onChange={handleFoodType}
                                                        >
                                                            <MenuItem value="select" disabled>
                                                                <em>Select type</em>
                                                            </MenuItem>
                                                            <MenuItem value="Iranian">
                                                                Iranian
                                                            </MenuItem>
                                                            <MenuItem value="Foreign">
                                                                Foreign
                                                            </MenuItem>
                                                            <MenuItem value="Drink">
                                                                Drink
                                                            </MenuItem>
                                                        </TextField>
                                                    </Grid>
                                                    <Grid item lg={6} md={6} sm={12}>
                                                        <TextField
                                                            label="Price"
                                                            variant="outlined"
                                                            color="secondary"
                                                            required
                                                            value={foodPrice}
                                                            error={foodPriceError}
                                                            onChange={handleFoodPrice}
                                                            helperText={
                                                                <div className="edit-error-restaurant">
                                                                    {foodPriceError && "Price must be a number."}
                                                                </div>
                                                            }
                                                            style={{width: '100%'}}
                                                            InputProps={{
                                                                startAdornment: (
                                                                  <InputAdornment position="start">$</InputAdornment>
                                                                ),
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </FormControl>
                                            <Grid container spacing={2} className="edit-button-grid-restaurant">
                                                <Grid item>
                                                    <Button 
                                                        className="edit-discard-button-restaurant" 
                                                        id="edit-button-restaurant" 
                                                        variant="contained"
                                                        onClick={handleOpenAdd}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </Grid>
                                                <Grid item lg={2} md={2} sm={2} justifyContent="flex-end">
                                                    <Button 
                                                        className="edit-save-changepass-button-restaurant" 
                                                        id="edit-button-restaurant" 
                                                        variant="contained" 
                                                        style={{width: 'auto'}}
                                                    >
                                                        Add
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </StyledDialog>
                                        <Box className="menu-box">
                                            <Box className="food-box">
                                                <Grid container spacing={3}>
                                                    <Grid item lg={2} md={2} sm={2} className="food">
                                                        <img src="/food2.jpg" className="food-image"/>
                                                    </Grid>
                                                    <Grid item lg={5} md={5} sm={6}>
                                                        <Typography className="food-name">
                                                            Pizza
                                                        </Typography>
                                                        <Typography className="food-ingredient">
                                                            Flour, yeast, mozzarella cheese, white sugar, tomatoes and onion
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item lg={2} md={1} sm={1}>
                                                        <Typography className="food-type-price">
                                                            Foreign
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item lg={1} md={1} sm={1}>
                                                        <Typography className="food-type-price">
                                                            10$
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item lg={2} md={3} sm={2}>
                                                        <Button className="food-edit" id="food-edit-button" onClick={handleOpenEdit}>
                                                            Edit
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                            <StyledDialog open={openEdit} classes={{ paper: classes.dialogRoot }} onClose={handleOpenEdit}>
                                                <DialogTitle className="dialog-title">Edit Food</DialogTitle>
                                                <FormControl className="edit-field-restaurant">
                                                    <TextField
                                                        label="Name"
                                                        variant="outlined"
                                                        color="secondary"
                                                        required
                                                        onChange={handleFoodName}
                                                        error={foodNameError}
                                                        helperText={
                                                            <div className="edit-error-restaurant">
                                                                {foodNameError && "Name should have at most 256 character."}
                                                            </div>
                                                        }
                                                    />
                                                </FormControl>
                                                <FormControl className="edit-field-restaurant">
                                                    <TextField
                                                        label="Ingredient"
                                                        variant="outlined"
                                                        color="secondary"
                                                        multiline
                                                        value={foodIngredient}
                                                        // required
                                                        onChange={handleFoodIngredient}
                                                        error={foodIngredientError}
                                                        helperText={
                                                            <div className="edit-error-restaurant">
                                                                {foodIngredientError && "Ingredients should have at most 256 character."}
                                                            </div>
                                                        }
                                                    />
                                                </FormControl>
                                                <FormControl className="edit-field-restaurant">    
                                                    <Grid container spacing={2}>
                                                        <Grid item lg={6} md={6} sm={12}>
                                                            <TextField
                                                                select
                                                                label="Type"
                                                                variant="outlined"
                                                                color="secondary"
                                                                required
                                                                style={{width: '100%'}}
                                                                value={foodType}
                                                                onChange={handleFoodType}
                                                            >
                                                                <MenuItem value="select" disabled>
                                                                    <em>Select type</em>
                                                                </MenuItem>
                                                                <MenuItem value="Iranian">
                                                                    Iranian
                                                                </MenuItem>
                                                                <MenuItem value="Foreign">
                                                                    Foreign
                                                                </MenuItem>
                                                                <MenuItem value="Drink">
                                                                    Drink
                                                                </MenuItem>
                                                            </TextField>
                                                        </Grid>
                                                        <Grid item lg={6} md={6} sm={12}>
                                                            <TextField
                                                                label="Price"
                                                                variant="outlined"
                                                                color="secondary"
                                                                required
                                                                style={{width: '100%'}}
                                                                InputProps={{
                                                                    startAdornment: (
                                                                      <InputAdornment position="end">$</InputAdornment>
                                                                    ),
                                                                }}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </FormControl>
                                                <Grid container spacing={2} className="edit-button-grid-restaurant">
                                                    <Grid item>
                                                        <Button 
                                                            className="edit-discard-button-restaurant" 
                                                            id="edit-button-restaurant" 
                                                            variant="contained"
                                                            onClick={handleOpenEdit}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </Grid>
                                                    <Grid item lg={2} md={2} sm={2} justifyContent="flex-end">
                                                        <Button 
                                                            className="edit-save-changepass-button-restaurant" 
                                                            id="edit-button-restaurant" 
                                                            variant="contained" 
                                                            style={{width: 'auto'}}
                                                        >
                                                            Apply
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </StyledDialog>
                                            <Box className="food-box">
                                                <Grid container spacing={3}>
                                                    <Grid item lg={2} md={2} sm={2} className="food">
                                                        <img src="/food2.jpg" className="food-image"/>
                                                    </Grid>
                                                    <Grid item lg={5} md={5} sm={6}>
                                                        <Typography className="food-name">
                                                            Pizza
                                                        </Typography>
                                                        <Typography className="food-ingredient">
                                                            Flour, yeast, mozzarella cheese, white sugar, tomatoes and onion
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item lg={2} md={1} sm={1}>
                                                        <Typography className="food-type-price">
                                                            Foreign
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item lg={1} md={1} sm={1}>
                                                        <Typography className="food-type-price">
                                                            10$
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item lg={2} md={3} sm={2}>
                                                        <Button className="food-edit" id="food-edit-button" onClick={handleOpenEdit}>
                                                            Edit
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                            {/* <StyledDialog open={openEdit} classes={{ paper: classes.dialogRoot }} onClose={handleOpenEdit}>
                                                <DialogTitle className="dialog-title">Edit Food</DialogTitle>
                                                <FormControl className="edit-field-restaurant">
                                                    <TextField
                                                        label="Name"
                                                        variant="outlined"
                                                        color="secondary"
                                                        required
                                                    />
                                                </FormControl>
                                                <FormControl className="edit-field-restaurant">
                                                    <TextField
                                                        label="Ingredient"
                                                        variant="outlined"
                                                        color="secondary"
                                                        multiline
                                                        required
                                                    />
                                                </FormControl>
                                                <FormControl className="edit-field-restaurant">    
                                                    <Grid container spacing={2}>
                                                        <Grid item lg={6} md={6} sm={12}>
                                                            <TextField
                                                                label="Type"
                                                                variant="outlined"
                                                                color="secondary"
                                                                required
                                                                style={{width: '100%'}}
                                                            />
                                                        </Grid>
                                                        <Grid item lg={6} md={6} sm={12}>
                                                            <TextField
                                                                label="Price"
                                                                variant="outlined"
                                                                color="secondary"
                                                                required
                                                                style={{width: '100%'}}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </FormControl>
                                                <Grid container spacing={2} className="edit-button-grid-restaurant">
                                                    <Grid item>
                                                        <Button 
                                                            className="edit-discard-button-restaurant" 
                                                            id="edit-button-restaurant" 
                                                            variant="contained"
                                                            onClick={handleOpenEdit}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </Grid>
                                                    <Grid item lg={2} md={2} sm={2} justifyContent="flex-end">
                                                        <Button 
                                                            className="edit-save-changepass-button-restaurant" 
                                                            id="edit-button-restaurant" 
                                                            variant="contained" 
                                                            style={{width: 'auto'}}
                                                        >
                                                            Apply
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </StyledDialog> */}
                                        </Box>
                                    </div>
                                }
                            </FormControl>
                            {/* {show && <>
                                <FormControl className="edit-field-restaurant">
                                    <TextField
                                        label="Current passsword"
                                        variant="outlined"
                                        color="secondary"
                                        onChange={handlePassword}
                                        type= {showCurrentPassword ? 'text' : 'password'}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Icon>
                                                        <LockIcon />
                                                    </Icon> 
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton 
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowCurrentPassword}
                                                        onMouseDown={handleMouseDownCurrentPassword}
                                                    >
                                                        {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}

                                    />
                                </FormControl>
                                <FormControl className="edit-field-restaurant">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <TextField
                                                label="New password"
                                                variant="outlined"
                                                style={{width: '100%'}}
                                                color="secondary"
                                                onChange={handlenewPassword}
                                                type= {showNewPassword ? 'text' : 'password'}
                                                error={newPasswordError}
                                                helperText= {
                                                    <div className="edit-error-restaurant">
                                                        {newPasswordError && 'Password must be mixture of letters and numbers.'}
                                                    </div>
                                                }
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Icon>
                                                                <LockIcon />
                                                            </Icon> 
                                                        </InputAdornment>
                                                    ),
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton 
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowNewPassword}
                                                                onMouseDown={handleMouseDownnewPassword}
                                                            >
                                                                {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <TextField
                                                label="Confirm new password"
                                                variant="outlined"
                                                style={{width: '100%'}}
                                                color="secondary"
                                                onChange={handleConfirmPassword}
                                                error={newPasswordMatch === false}
                                                helperText={
                                                    <div className="edit-error-restaurant">
                                                        {!newPasswordMatch && 'Password do not match!'}
                                                    </div>
                                                }
                                                type= {showConfirmPassword ? 'text' : 'password'}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Icon>
                                                                <LockOpenIcon />
                                                            </Icon> 
                                                        </InputAdornment>
                                                    ),
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton 
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowConfirmPassword}
                                                                onMouseDown={handleMouseDownconfirmPassword}
                                                            >
                                                                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </FormControl>
                                </>
                                } */}
                            <Grid container spacing={2} className="edit-button-grid-restaurant" wrap="nowrap">
                                <Grid item>
                                    <Button 
                                        className="edit-discard-button-restaurant" 
                                        id="edit-button-restaurant" 
                                        variant="contained" 
                                        onClick={handleDiscard}
                                    >
                                        Discard
                                    </Button>              
                                </Grid>  
                                <Grid item lg={3} md={5} sm={4} justifyContent="flex-end">
                                    <Button 
                                        className="edit-save-changepass-button-restaurant" 
                                        id="edit-button-restaurant" 
                                        variant="contained" 
                                        onClick={handleUpdate}
                                        disabled={!validInputs}
                                        style={{width: 'auto', marginLeft: '60px'}}
                                        // style={{marginRight: "-2%"}}
                                    >
                                        Save changes
                                    </Button>
                                </Grid>
                            </Grid>

                        </Box>
                    </Grid>
                </Grid> 
                <Footer/>
            </div>
        </ThemeProvider>
    );
}

export default withStyles(styles)(EditRestaurant);