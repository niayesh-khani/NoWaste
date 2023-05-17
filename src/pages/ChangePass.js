import React, { useEffect, useState } from "react";
import './EditProfile.css';
import Header from '../components/Header';
import './Login-Signup.css';
import './Restaurant-View.css';
import 'react-phone-input-2/lib/style.css';
import { Link, useHistory } from "react-router-dom";
import { Box, Button, Container, createTheme, Icon, IconButton, InputAdornment, TextField, ThemeProvider, Typography, FormControl, FormControlLabel } from "@material-ui/core";
import { Password, Visibility, VisibilityOff } from "@mui/icons-material"
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PasswordIcon from '@mui/icons-material/Password';
import './Login-Signup.css'
import axios from "axios";


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

export default function ChangePass(){
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [currentpassword, setCurrentPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    const handleCurrentPassword = (e) => {
        setCurrentPassword(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
        if(e.target.value.length < 8 || !/[a-zA-Z]+/.test(e.target.value)){
            setPasswordError(true)
        } else {
            setPasswordError(false)
        }
    };
    const handleChangeConfirmPass = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
    };
    useEffect(() => {
        setPasswordMatch(password === confirmPassword);
    }, [confirmPassword]);

    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(
            `http://nowaste39.pythonanywhere.com/user/customer_profile/${id}/`, {"old_password": currentpassword, "password": password, "password2": confirmPassword},
            {headers: {
                'Content-Type' : 'application/json',
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Methods" : "PUT,PATCH",
                'Authorization' : "Token " + token.slice(1,-1)   
            }}
        )
        .then((response)=> {
            console.log(response);
            history.push("/edit-profile");
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
                        Change Password
                    </Typography>
                    <FormControl className="edit-field">
                        <TextField
                            label="Current Passsword"
                            variant="outlined"
                            color="secondary"
                            onClick={handleCurrentPassword}
                            type= {showPassword ? 'text' : 'password'}
                                InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Icon>
                                            <LockIcon />
                                        </Icon> 
                                    </InputAdornment>
                                ),
                            }}

                        />
                    </FormControl>
                    <FormControl className="edit-field">
                        <TextField
                            label="New Password"
                            variant="outlined"
                            color="secondary"
                            onChange={handleChangePassword}
                            error={passwordError}
                            helperText={
                                <div className="error">
                                    {passwordError && 'Password must be mixture of letters and numbers.'}
                                </div>
                            }
                            type= {showPassword ? 'text' : 'password'}
                                InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Icon>
                                            <LockIcon />
                                        </Icon> 
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>
                    <FormControl className="edit-field">
                        <TextField
                            label="Confirm New Password"
                            onChange={handleChangeConfirmPass}
                            variant="outlined"
                            error={passwordMatch === false}
                            helperText={
                                <div className="error">
                                    {!passwordMatch && 'Password do not match!'}
                                </div>
                            }
                            type= {showPassword ? 'text' : 'password'}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Icon>
                                            <LockOpenIcon />
                                        </Icon> 
                                    </InputAdornment>
                                ),
                            }}

                        />
                    </FormControl>
                    <Button 
                        variant="contained"
                        type="submit"
                        required
                        className="field"
                        style={{marginTop:'0%', marginBottom: '10%'}}
                        id = "submit"
                        onClick={handleSubmit}
                    >
                        Change Password
                    </Button>

                </Box>

            </div>
        </ThemeProvider>

    )
}