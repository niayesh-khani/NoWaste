import { Box, Button, Container, createTheme, Icon, IconButton, InputAdornment, TextField, ThemeProvider, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material"
import SyncLockIcon from '@mui/icons-material/SyncLock';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import { Link } from "react-router-dom";
import axios from "axios";
import './Login-Signup.css'
import { Alert, AlertTitle } from "@mui/material";

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

export default function ForgotPass(){

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    const handleEmail = (e) => {
        setEmail(e.target.value);
        if(!/\S+@\S+\.\S+/.test(e.target.value) || e.target.value.trim().length === 0)   {
            setEmailError(true);
        } else{
            setEmailError(false);
        }
    };

    const handleNewPassword = (e) => {
        setNewPassword(e.target.value);
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    const [open, setOpen] = useState(null);

    const handleClick = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const [validInputs, setValidInputs] = useState(false);
    useEffect(() => {
        let isValid = email.trim().length > 0 && !emailError && newPassword.trim().length >0;
        setValidInputs(isValid);
    }, [email, newPassword]);
    

    function setHeight() {
        const box = document.querySelector('.box-forgot');
        const boxHeight = box.offsetHeight;
        const image = document.querySelector('.desktop');
        image.style.height = `${boxHeight}px`;
    }

    useEffect(() => {
        setHeight(); 
        window.addEventListener('resize', setHeight);
        window.onpopstate = () => {
          setHeight();
        };
        return () => {
          window.removeEventListener('resize', setHeight);
          window.onpopstate = null;
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email: email
            };
            axios.post("http://nowaste39.pythonanywhere.com/user/forgot-password/", userData, {headers:{"Content-Type" : "application/json"}})
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("server responded");
                } 
                else if (error.request) {
                    console.log("network error");
                } 
                else {
                    console.log(error);
                }
            });
        };

    return ( 
        <ThemeProvider theme={theme}>
            <div className="root">
                <Container className="container">
                <div className="alert">
                    {open && <Alert severity="success"  open={open} onClose={handleClose}>
                        <AlertTitle>Success</AlertTitle>
                            We've just sent you an email including your new password. Enter your new password to continue.
                    </Alert>}
                    </div>

                    <img
                        className="desktop"
                        src="/f2.jpg"
                        alt="NoWaste"
                    />
                    <Box className="box-forgot">
                        <Typography variant="h4" 
                            color="textPrimary"
                            gutterBottom
                            className="text"
                            style={{fontWeight: 'bold'}}
                        >
                            Forgot Your Password?
                        </Typography>
                        <form noValidate autoComplete="off" style={{textAlign: 'center'}}>
                            <TextField 
                                label="Email Address"
                                variant="outlined"
                                color="secondary"
                                required
                                className="field"
                                value={email}
                                onChange={handleEmail}
                                error={emailError}
                                helperText={ 
                                    <div className="error" id="forget">
                                        {emailError && "Email is invalid!"}
                                    </div>
                                }
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Icon>
                                                <EmailIcon />
                                            </Icon> 
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClick} disabled={emailError || email.length ===0}>
                                                <SendIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <TextField 
                                label="New password"
                                variant="outlined"
                                color="secondary"
                                required
                                className="field"
                                value={newPassword}
                                onChange={handleNewPassword}
                                type= {showPassword ? 'text' : 'password'}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Icon>
                                                <SyncLockIcon />
                                            </Icon> 
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton 
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Button 
                                variant="contained" 
                                type="submit" 
                                color="primary"
                                className="field"
                                id="submit"
                                onClick={handleSubmit}
                                disabled={!validInputs}
                            >
                                Continue
                            </Button>
                        </form> 
                        <Typography 
                            style={{fontSize: '1em'}}
                            className="text"
                        >
                        <Link to="/login" className="link">back to Login</Link>
                        </Typography>
                    </Box>
                </Container>
            </div>
        </ThemeProvider>
    )
}