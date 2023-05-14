import React, { useEffect, useState } from "react";
import './EditRestaurant.css';
import Header from '../components/Header';
import axios from "axios";
import Footer from "../components/Footer";
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Alert, AlertTitle } from "@mui/material";
import { useHistory } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import PhoneInput from 'material-ui-phone-number';
import LockIcon from '@mui/icons-material/Lock';
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Box, Button, createTheme, Divider, FormControl, Grid, Icon, IconButton, InputAdornment, TextField, ThemeProvider, Typography, withStyles } from "@material-ui/core";
import ClearIcon from '@mui/icons-material/Clear';

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
const theme = createTheme({
    palette: {
        primary: {
            main: '#dd9d46',
        },
        secondary: {
            main: '#a44704',
        }
    }
})
function getRandomColor() {
    const colors = ['#FFA600', '#fff2bf', '#ffe480', '#a2332a' , '#E74C3C' , '#690000' , '#595959', '#3e3e3e' , '#C6C6C6', '#ABABAB', '#B9B9B9'];
    return colors[Math.floor(Math.random() * colors.length)];
}
const EditRestaurant = () => {
    const [fullname, setFullname] = useState('');
    const [fullnameError, setFullnameError] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openButton = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };   
    const [dob, setDob] = useState(null);
    // const [emailError, setEmailError] = useState(false);
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
    const handleFullname = (e) => {
        setFullname(e.target.value);
        setUpdate({...update, name: e.target.value})
        if(!/^[a-zA-Z]+\s[a-zA-Z]+$/gm.test(e.target.value)){
            setFullnameError(true);
        } else {
            setFullnameError(false);
        }
    };
    const history = useHistory();
    const handleChange = () => {
        history.push('./change-password')
    };
    const handleCloseNetwork = () => {
        setOpenNetwork(false);
    };
    const handleCloseWrongPass = () => {
        setOpenWrongPass(false);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handlePhoneChange = (value) => {
        setUpdate({...update, phone_number : value});
        localStorage.setItem('phone', value);
        setPhone(value);
    };
    const handleBirthdate = (date) => {
        setDob(date);
        console.log(data.date_of_birth);
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        setUpdate({...update, date_of_birth : formattedDate});
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };
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
    const handleOpenMenu = () => {
        setOpenMenu(!openMenu);
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
                                {"UD"}
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
                                Account Details 
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
                                            value={data.phone_number}
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
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={6}>
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
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} style={{width: '150%'}}
                                            InputLabelProps={{ shrink: true }}
                                        >
                                            <DemoContainer components={['DatePicker']} >
                                                <DatePicker
                                                    label="Date of birth"
                                                    views={['year', 'month', 'day']}
                                                    sx={{width: '100%'}}
                                                    maxDate={dayjs()}
                                                    onChange={handleBirthdate}
                                                    value={dob ? dayjs(dob) : null }
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
                                        /> 
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <TextField
                                            label="City"
                                            variant="outlined"
                                            color="secondary"
                                            value={city}
                                            style={{width: '100%'}}
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
                                {/* {!openMenu && 
                                    <Button 
                                        color="secondary"
                                        // id="basic-button"
                                        // aria-controls={open ? 'basic-menu' : undefined}
                                        // aria-haspopup="true"
                                        // aria-expanded={open ? 'true' : undefined}
                                        // onClick={handleClick}
                                        onClick={handleOpenMenu}
                                        className="hidemenu-button"
                                    >
                                        Hide Menu
                                    </Button>
                                } */}
                                {!openMenu && 
                                    <Box className="menu-box">
                                        <Grid container spacing={1} style={{position: 'absolute', justifyContent: 'flex-end', marginRight: '20px', marginLeft: '-20px', marginBottom: '10px'}}>
                                            <IconButton>
                                                <ClearIcon style={{color: 'red'}} />
                                            </IconButton>
                                        </Grid>
                                        <Box className="food-box">
                                            <Grid container spacing={3}>
                                                <Grid item lg={2} md={2} sm={2} className="food-detail">
                                                    <img src="/food2.jpg" className="food-image"/>
                                                </Grid>
                                                <Grid item lg={7} md={6} sm={8} className="food-detail">
                                                    <Typography>
                                                        Pizza
                                                    </Typography>
                                                    <Typography>
                                                        Flour, yeast, mozzarella cheese, white sugar, tomatoes and onion
                                                    </Typography>
                                                </Grid>
                                                <Grid item lg={2} md={3} sm={2}>
                                                    <Button>
                                                        Edit
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box className="food-box">
                                            <Grid container spacing={3}>
                                                <Grid item lg={2} md={2} sm={2} className="food-detail">
                                                    <img src="/food2.jpg" width="90" height="60"/>
                                                </Grid>
                                                <Grid item lg={7} md={6} sm={8} className="food-detail">
                                                    <Typography>
                                                        Pizza
                                                    </Typography>
                                                    <Typography>
                                                        Flour, yeast, mozzarella cheese, white sugar, tomatoes and onion
                                                    </Typography>
                                                </Grid>
                                                <Grid item lg={2} md={3} sm={2}>
                                                    <Button>
                                                        Edit
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box className="food-box">
                                            <Grid container spacing={3}>
                                                <Grid item lg={2} md={2} sm={2} className="food-detail">
                                                    <img src="/food2.jpg" width="90" height="60"/>
                                                </Grid>
                                                <Grid item lg={7} md={6} sm={8} className="food-detail">
                                                    <Typography>
                                                        Pizza
                                                    </Typography>
                                                    <Typography>
                                                        Flour, yeast, mozzarella cheese, white sugar, tomatoes and onion
                                                    </Typography>
                                                </Grid>
                                                <Grid item lg={2} md={3} sm={2}>
                                                    <Button>
                                                        Edit
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box className="food-box">
                                            <Grid container spacing={3}>
                                                <Grid item lg={2} md={2} sm={2} className="food-detail">
                                                    <img src="/food2.jpg" width="90" height="60"/>
                                                </Grid>
                                                <Grid item lg={7} md={6} sm={8} className="food-detail">
                                                    <Typography>
                                                        Pizza
                                                    </Typography>
                                                    <Typography>
                                                        Flour, yeast, mozzarella cheese, white sugar, tomatoes and onion
                                                    </Typography>
                                                </Grid>
                                                <Grid item lg={2} md={3} sm={2}>
                                                    <Button>
                                                        Edit
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box className="food-box">
                                            <Grid container spacing={3}>
                                                <Grid item lg={2} md={2} sm={2} className="food-detail">
                                                    <img src="/food2.jpg" width="90" height="60"/>
                                                </Grid>
                                                <Grid item lg={7} md={6} sm={8} className="food-detail">
                                                    <Typography>
                                                        Pizza
                                                    </Typography>
                                                    <Typography>
                                                        Flour, yeast, mozzarella cheese, white sugar, tomatoes and onion
                                                    </Typography>
                                                </Grid>
                                                <Grid item lg={2} md={3} sm={2}>
                                                    <Button>
                                                        Edit
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box className="food-box">
                                            <Grid container spacing={3}>
                                                <Grid item lg={2} md={2} sm={2} className="food-detail">
                                                    <img src="/food2.jpg" width="90" height="60"/>
                                                </Grid>
                                                <Grid item lg={7} md={6} sm={8} className="food-detail">
                                                    <Typography>
                                                        Pizza
                                                    </Typography>
                                                    <Typography>
                                                        Flour, yeast, mozzarella cheese, white sugar, tomatoes and onion
                                                    </Typography>
                                                </Grid>
                                                <Grid item lg={2} md={3} sm={2}>
                                                    <Button>
                                                        Edit
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Box>
                                }
                                {/* <Menu
                                    id="basic-menu"
                                    open={openButton}
                                    anchorEl={anchorEl}
                                    MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem>Food1</MenuItem>
                                    <MenuItem>Food2</MenuItem>
                                    <MenuItem>Food3</MenuItem>
                                </Menu> */}
                            </FormControl>
                            {show && <>
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
                                }
                            <Grid container spacing={2} className="edit-button-grid-restaurant" wrap="nowrap">
                                <Grid item>
                                    <Button className="edit-save-changepass-button-restaurant"  id="edit-button-restaurant" variant="contained" onClick={() => setShow(prev => !prev)}>Change password </Button>
                                </Grid>
                                <Grid item container lg={5} md={6} sm={12}
                                // style={{marginRight: "-10px"}}
                                justifyContent="flex-end"
                                >
                                    <Grid item style={{paddingRight: '5px'}}>
                                        <Button className="edit-discard-button-restaurant" id="edit-button-restaurant" variant="contained"
                                            // style={{marginRight: "2%"}}
                                            // style={{backgroundColor: '#E74C3C'}}
                                        >Discard</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button className="edit-save-changepass-button-restaurant" id="edit-button-restaurant" variant="contained"
                                            disabled={!validInputs}
                                            // style={{marginRight: "-2%"}}
                                        >Save changes</Button>
                                    </Grid>
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

export default EditRestaurant;