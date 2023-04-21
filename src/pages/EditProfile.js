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
import { Link, useHistory } from "react-router-dom";


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
    const [update, setUpdate] = useState('');

    const handleFullname = (e) => {
        setUpdate({...update, name: e.target.value})
        if(!/^[a-zA-Z]+\s[a-zA-Z]+$/gm.test(e.target.value)){
            setFullnameError(true);
        } else {
            setFullnameError(false);
        }
    };
    // const handleEmail = (e) => {
    //     // setData({...data, email: e.target.value})
    //     if(!/[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(e.target.value)) {
    //         setEmailError(true);
    //     } else{
    //         setEmailError(false);
    //     }
    // }
    useEffect(() => {
        if(!localStorage.getItem('avatarColor')) {
            localStorage.setItem('avatarColor', color);
        }
    }, [])
    const [phone, setPhone] = useState('');

    const handlePhoneChange = (value) => {
        setUpdate({...update, phone_number : value});
        localStorage.setItem('phone', value);
        setPhone(value);
    };
    const handleBirthdate = (date) => {
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        setUpdate({...update, date_of_birth : formattedDate});
    }
    const handleGender = (e) => {
        setUpdate({...update, gender: e.target.value});
    }
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const handleCity = (e) => {
        setCity(e.target.value);
    }
    const handleCountry = (e) => {
        setCountry(e.target.value);
    }
    const handleAddress = (e) => {
        setAddress(e.target.value);
    }
    useEffect(() => {
        if(country===''){
            setCountry('-');
        }
        if(city===''){
            setCity('-');
        }
        if(address==='-'){
            setAddress('-');
        }
        const temp = country + '$' + city + '$' + address;
        setUpdate({...update, address : temp})
    }, [country, city, address])
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    const [data, setData] = useState('')
    // console.log(id);
    useEffect(() =>{
        axios.get(
            `http://nowaste39.pythonanywhere.com/user/customer_profile/${id}/` , 
            {headers :{
                'Content-Type' : 'application/json',
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Methods" : "GET,PATCH",
                'Authorization' : "Token " + token.slice(1,-1)
            }}
        )
        .then((response) => {
            console.log(response);
            setData(response.data)
        })
        .catch((error) => console.log(error));
    },[]);
    useEffect(() => {
        const arr = data?.address?data?.address.split("$"):"";
        if(arr[0]==='-'){
            setCountry('');
        } else {
            setCountry(arr[0])
        }
        if(arr[1]==='-'){
            setCity('-')
        } else{
            setCity(arr[1]);
        }
        if(arr[2]==='-'){
            setAddress('');
        } else {
            setAddress(arr[2]);
        }
    }, [data.address])
    const history = useHistory();
    const handleChange = () => {
        history.push('./change-password')
    };
    // if(data.name){
    const firstChar = data?.name?data.name.charAt(0) : "UN";
    // }
    const handleUpdate = (e) => {
        e.preventDefault();
        axios.patch(
            `http://nowaste39.pythonanywhere.com/user/customer_profile/${id}/`, update,
            {headers: {
                'Content-Type' : 'application/json',
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Methods" : "GET,PATCH",
                'Authorization' : "Token " + token.slice(1,-1)   
            }}
        )
        .then((response)=> {
            console.log(response);
            console.log("succesfully updated");
        })
        .catch((error) => console.log(error));
    }

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
                        sx={{width:'15rem', height:'12rem'}}
                    >
                        {firstChar}
                        {/* {!firstChar ? firstChar : "H"} */}
                    </Avatar>
                    {/* <Link to="/change-password">Change password</Link> */}
                    <FormControl className="edit-field">
                        <TextField
                            label="Full name"
                            variant="outlined"
                            color="secondary"
                            value={data.name}
                            InputLabelProps={{ shrink: true }}
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
                            // onChange={handleEmail}
                            InputLabelProps={{ shrink: true }}
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
                            InputLabelProps={{ shrink: true }}
                        />
                    </FormControl>
                    <FormControl className="edit-field">
                        <TextField
                            select
                            label="Gender"
                            color="secondary"
                            variant="outlined"
                            defaultValue={data.gender}
                            InputLabelProps={{ shrink: true }}
                            style= {{textAlign: 'left', width:'100%'}}
                            onChange={handleGender}
                        >
                            <MenuItem value="select" disabled>
                                <em>Select gender</em>
                            </MenuItem>
                            <MenuItem value="male">
                                Male
                            </MenuItem>
                            <MenuItem value="female">
                                Female
                            </MenuItem>
                        </TextField>
                    </FormControl>
                    <FormControl className="edit-field">
                        <LocalizationProvider dateAdapter={AdapterDayjs} style={{width: '150%'}} InputLabelProps={{ shrink: true }}>
                            <DemoContainer components={['DatePicker']} >
                                <DatePicker
                                    label="Date of birth"
                                    views={['year', 'month', 'day']}
                                    sx={{width: '100%'}}
                                    maxDate={dayjs()}
                                    onChange={handleBirthdate}
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
                                    value={country}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={handleCountry}
                                /> 
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <TextField
                                    label="City"
                                    variant="outlined"
                                    color="secondary"
                                    value={city}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={handleCity}
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
                            InputLabelProps={{ shrink: true }}
                            // rows={5}
                            value={address}
                            // className="edit-field"
                            onChange={handleAddress}
                        /> 
                    </FormControl>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Button id="edit-button" variant="contained" onClick={handleChange}>Change Password</Button>
                        </Grid>
                        <Grid item>
                            <Button type="submit" id="edit-update" variant="contained" onClick={handleUpdate}>Update</Button>
                        </Grid>
                    </Grid>
                </Box>

            </div>
        </ThemeProvider>

    )
}

export default withStyles(styles)(Edit);