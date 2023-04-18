// import * as React from 'react';
import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Badge, BottomNavigation, Box, Button, Container, createTheme, FormControl, FormControlLabel, Icon, IconButton, InputAdornment, makeStyles, MenuItem, Radio, RadioGroup, TextField, ThemeProvider, Typography } from "@material-ui/core";
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import './EditProfile.css';
import { Toolbar } from '@mui/material';
import Header from './Header';
import './Login-Signup.css';
import './Restaurant-View.css';
// import PhoneInput from 'react-phone-input-2';
import PhoneInput from 'material-ui-phone-number';
import 'react-phone-input-2/lib/style.css';

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
                }
            }
        }
    }
})
function getRandomColor() {
    const colors = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#00BCD4', '#009688', '#4CAF50', '#FFC107', '#FF5722'];
    return colors[Math.floor(Math.random() * colors.length)];
}

export default function EditProfile(){
    const data = {
        fullname: 'hni asadi',
        email: 'hniasadi@gamil.com',
        phonenumber: '',
        gender: '',
        address: '',
    }
    const [formData, setFormData] = useState(data);
    const [fullnameError, setFullnameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [color, setColor] = useState(localStorage.getItem('avatarColor') || getRandomColor());

    const handleFullname = (e) => {
        setFormData({...formData, fullname: e.target.value})
        if(!/^[a-zA-Z]+\s[a-zA-Z]+$/gm.test(e.target.value)){
            setFullnameError(true);
        } else {
            setFullnameError(false);
        }
    };
    const handleEmail = (e) => {
        setFormData({...formData, email: e.target.value})
        if(!/[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(e.target.value)) {
            setEmailError(true);
        } else{
            setEmailError(false);
        }
    }
    useEffect(() => {
        if(!localStorage.getItem('avatarColor')) {
            localStorage.setItem('avatarColor', color);
        }
    }, [])
    const [phone, setPhone] = useState('');

    const handlePhoneChange = (value) => {
        setPhone(value);
    };

    return ( 
        // <div>
        <ThemeProvider theme={theme}>
            <Header />
            <div 
            className='edit-root'
            >
                <Box className='edit-box'>
                    <Typography
                        variant='h4'
                        color="textPrimary"
                        gutterBottom
                        className='text'
                        // style={{textAlign: 'center', marginTop: '10%', marginBottom: '10%', fontWeight: 'bold'}}
                    >
                        Profile
                    </Typography>
                    <Avatar
                        className="edit-avatar"
                        // color={getRandomColor()}
                        style={{backgroundColor: color}}
                    >
                        H
                    </Avatar>
                    <TextField
                        label="Full name"
                        variant="outlined"
                        color="secondary"
                        value={formData.fullname}
                        className="edit-field"
                        // onChange={(e) => setFormData({...formData, fullname: e.target.value})}
                        onChange={handleFullname}
                        error={fullnameError}
                        helperText={
                            <div className="edit-error">
                                {fullnameError && 'Your full name should have at least two words.'}
                            </div>
                        }
                    />
                    {/* <TextField
                        label="Email address"
                        variant="outlined"
                        color="secondary"
                        value={formData.email}
                        className="edit-field"
                        // onChange={(e) => setFormData({...formData, email: e.target.value})}
                        onChange={handleEmail}
                        error={emailError}
                        helperText={
                            <div className="edit-error">
                                {emailError && 'Invalid email Address!'}
                            </div>
                        }
                    /> */}
                    {/* <PhoneInput
                        label="Phone number"
                        value={phone}
                        // variant="outlined"
                        // countryCodeEditable
                        // defaultCountry="ir"
                        country={"ir"}
                        onChange={handlePhoneChange}
                        // placeholder="Enter phone number"
                        // className="edit-field"
                        // autoFormat
                        // color="secondary"
                        inputClass="MuiOutlinedInput-root"
                        inputProps={{
                            variant: 'outlined',
                            label: 'Phone number',

                            className: "edit-field"
                        }}
                    /> */}
                    <PhoneInput
                        label="Phone number"
                        value={phone}
                        defaultCountry="ir"
                        onChange={handlePhoneChange}
                        
                        
                    />
                    <FormControl style={{width: '100%'}}>
                        <TextField
                            select
                            label="Gender"
                            color="secondary"
                            className="edit-field"
                            variant="outlined"
                            style= {{textAlign: 'left', marginBottom: "5%", marginLeft: "15%"}}
                        >
                            <MenuItem value="select" disabled>
                                <em>Select gender</em>
                            </MenuItem>
                            <MenuItem value="Male" className="menuItem">
                                Male
                            </MenuItem>
                            <MenuItem value="Female" className="menuItem">
                                Female
                            </MenuItem>
                        </TextField>    
                    </FormControl>
                    <TextField
                        label="Address"
                        variant="outlined"
                        color="secondary"
                        multiline
                        rows={5}
                        value={formData.address}
                        className="edit-field"
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        // color="secondary"
                        // className="edit-button"
                        id="edit-button"
                    >
                        Update
                    </Button>
                </Box>
            </div>
        </ThemeProvider>
        // </div>
    )
}