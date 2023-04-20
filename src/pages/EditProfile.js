import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Badge, BottomNavigation, Box, Button, Container, createTheme, FormControl, FormControlLabel, FormLabel, Grid, Icon, IconButton, InputAdornment, makeStyles, MenuItem, Radio, RadioGroup, TextField, ThemeProvider, Typography, withStyles } from "@material-ui/core";
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import './EditProfile.css';
import { Toolbar } from '@mui/material';
import Header from '../components/Header';
import './Login-Signup.css';
import './Restaurant-View.css';
// import PhoneInput from 'react-phone-input-2';
import PhoneInput from 'material-ui-phone-number';
import 'react-phone-input-2/lib/style.css';
import { DatePicker } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import AdapterDayjs from '@date-io/dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import DateFnsAdapter from "@date-io/date-fns";
import axios from "axios";
import { Link } from "react-router-dom";

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
    },
    // overrides: {
    //     MuiFormLabel: {
    //         asterisk: {
    //             color: '#db3131',
    //             '&$error': {
    //             color: '#db3131'
    //             }
    //         }
    //     }
    // }
})
function getRandomColor() {
    const colors = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#00BCD4', '#009688', '#4CAF50', '#FFC107', '#FF5722'];
    return colors[Math.floor(Math.random() * colors.length)];
}
function Edit(props){
    const { value, defaultCountry, onChange, classes } = props;

    // const data = {
    //     fullname: 'hni asadi',
    //     email: 'hniasadi@gamil.com',
    //     phonenumber: '',
    //     gender: 'Male',
    //     address: '',
    // }
    // const [formData, setFormData] = useState(data);
    const [fullnameError, setFullnameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [color, setColor] = useState(localStorage.getItem('avatarColor') || getRandomColor());

    const handleFullname = (e) => {
        setData({...data, fullname: e.target.value})
        if(!/^[a-zA-Z]+\s[a-zA-Z]+$/gm.test(e.target.value)){
            setFullnameError(true);
        } else {
            setFullnameError(false);
        }
    };
    const handleEmail = (e) => {
        setData({...data, email: e.target.value})
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
    const token = localStorage.getItem('token');
    const id = token.id;
    const [data, setData] = useState( {fullname: 'hni asadi',
    email: 'hniasadi@gamil.com',
    phonenumber: '3549953382',
    gender: 'Male',
    address: ''})

    useEffect(() =>{
        axios.get(`http://nowaste39.pythonanywhere.com/user/customer_profile/${id}/`)
    }, [])

    return(
        <ThemeProvider theme={theme}>
            <Header/>
            <div className="edit-root">
                <Box className='edit-box'>
                    <Typography
                        variant='h4'
                        color="textPrimary"
                        gutterBottom
                        className='text'
                        // disabled
                        // style={{textAlign: 'center', marginTop: '10%', marginBottom: '10%', fontWeight: 'bold'}}
                    >
                        Profile
                    </Typography>
                    <Avatar
                        className="edit-avatar"
                        style={{backgroundColor: color}}
                        src="public/3.jpg"
                        // sx={{width:'200px', height:'100px'}}
                    >
                        H
                    </Avatar>
                    <Link to="/change-password">Change password</Link>
                    <FormControl className="edit-field">
                        <TextField
                            label="Full name"
                            variant="outlined"
                            color="secondary"
                            value={data.name}
                            // className="edit-field"
                            // onChange={(e) => setFormData({...formData, fullname: e.target.value})}
                            onChange={handleFullname}
                            error={fullnameError}
                            helperText={
                                <div className="edit-error">
                                    {fullnameError && 'Your full name should have at least two words.'}
                                </div>
                            }
                        />
                    </FormControl>
                    <FormControl className="edit-field">
                        <TextField
                            label="Email address"
                            variant="outlined"
                            color="secondary"
                            value={data.email}
                            // className="edit-field"
                            onChange={handleEmail}
                            // disabled
                            
                            InputProps={{
                                readOnly: true
                            }}
                        />
                    </FormControl>
                    <FormControl className="edit-field">
                        <PhoneInput
                            label="Phone number"
                            value={data.phonenumber}
                            defaultCountry="ir"
                            color="secondary"
                            onChange={handlePhoneChange}
                            inputClass={classes.field}
                            style={{width: '100%'}}
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl className="edit-field">
                        <TextField
                            select
                            label="Gender"
                            color="secondary"
                            variant="outlined"
                            defaultValue={data.gender}
                            style= {{textAlign: 'left', width:'100%'}}
                        >
                            <MenuItem value="select" disabled>
                                <em>Select gender</em>
                            </MenuItem>
                            <MenuItem value="Male">
                                Male
                            </MenuItem>
                            <MenuItem value="Female">
                                Female
                            </MenuItem>
                        </TextField>
                    </FormControl>
                    <FormControl className="edit-field">
                        <LocalizationProvider dateAdapter={AdapterDayjs} style={{width: '150%'}}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                label="Date of birth"
                                views={['year', 'month', 'day']}
                                sx={{width: '100%'}}
                                maxDate={dayjs()}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl className="edit-field">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} >
                                <TextField
                                    label="Country"
                                    variant="outlined"
                                    color="secondary"
                                    value={data.address}
                                    onChange={(e) => setData({...data, address: e.target.value})}
                                /> 
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <TextField
                                    label="City"
                                    variant="outlined"
                                    color="secondary"
                                    value={data.address}
                                    onChange={(e) => setData({...data, address: e.target.value})}
                                /> 
                            </Grid>
                        </Grid>
                    </FormControl>
                    <FormControl className="edit-field">
                        <TextField
                            label="Address"
                            variant="outlined"
                            color="secondary"
                            multiline
                            // rows={5}
                            value={data.address}
                            // className="edit-field"
                            onChange={(e) => setData({...data, address: e.target.value})}
                        /> 
                    </FormControl>
                    <Button
                        variant="contained"
                        type="submit"
                        // color="secondary"
                        id="edit-button"
                    >
                        Update
                    </Button>
                </Box>

            </div>
        </ThemeProvider>

    )
}

export default withStyles(styles)(Edit);