import { Box, Button, Container, createTheme, FormControlLabel, Icon, IconButton, InputAdornment, TextField, ThemeProvider, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material"
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import { Link, useHistory } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";
import './Login-Signup.css'
import { Alert, AlertTitle } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#E74C3c',
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

export default function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [id, setId] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [validInputs, setValidInputs] = useState(false);
    const [open, setOpen] = useState(null);
    
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        let isValid = email.trim().length > 0 && password.trim().length > 0;
        setValidInputs(isValid);
    }, [email, password]);

    function setHeight() {
        const box = document.querySelector('.box');
        const boxHeight = box.offsetHeight;
        const image = document.querySelector('.background');
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

    useEffect(() => {
        localStorage.setItem('token', JSON.stringify(token));
        console.log(token);
    }, [token]);
    useEffect(() => {
        localStorage.setItem('id', JSON.stringify(id));
        console.log(id);
    }, [id]);
    const handleClose = () => {
        setOpen(false);
        setHeight();
    }

    useEffect(() => {
        setHeight();
    }, [open]);

    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            password: password,
            email: email
            };
            console.log(userData);
            axios.post("http://5.34.195.16/user/login/", userData, {headers:{"Content-Type" : "application/json"}})
            .then((response) => {
                console.log(response);
                setToken(response.data.token);
                setId(response.data.id);
                console.log(token);
                console.log(id);
                history.push("/homepage-customer");
            })
            .catch((error) => {
                setOpen(true);
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
                    <img
                        className="background"
                        src="/3.jpg"
                        alt="NoWaste"
                        borderRadius="25px"
                    />
                    <Box className="box">
                        <Typography variant="h5" 
                            color="textPrimary"
                            gutterBottom
                            className="text"
                            style={{fontWeight: 'bold', fontSize: '30px'}}
                        >
                            Login 
                        </Typography>
                        <form noValidate autoComplete="off" style={{textAlign: 'center'}}>
                            {open && <Alert severity="error" open={open} onClose={handleClose} variant="outlined" className="alert-error filed">
                                    Incorrect email address or password!
                                </Alert>
                            } 
                            <TextField 
                                label="Email address"
                                variant="outlined"
                                color="secondary"
                                required
                                className="field"
                                value={email}
                                onChange={handleEmail}
                                
                                style={{marginBottom: '10%'}}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Icon>
                                                <EmailIcon />
                                            </Icon> 
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <TextField 
                                label="Password"
                                variant="outlined"
                                color="secondary"
                                required
                                className="field"
                                value={password}
                                onChange={handlePassword}
                                type= {showPassword ? 'text' : 'password'}
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
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            {/* <FormControlLabel className="remember"
                                control={<Checkbox 
                                    sx={{color: '#f18b72', '&.Mui-checked': {color: '#f18b72'},}}
                                    />}
                                    label={
                                        <Typography className = 'text'>
                                            Remember me
                                        </Typography>
                                    }
                            /> */}
                            <Link to="/forgot-password" className="forgetpassword">
                                <Typography style={{ fontFamily: 'Montserrat, sans-serif'}}>
                                    Forgot password?
                                </Typography>
                            </Link>
                            <Button 
                                variant="contained" 
                                type="submit" 
                                // color="primary"
                                className="field"
                                id="submit"
                                onClick={handleSubmit}
                                disabled={!validInputs}
                            >
                                Login
                            </Button>
                        </form> 
                        <Typography 
                            style={{marginBottom: '5%', fontSize: '0.9em'}}
                            className="text"
                        >
                            Don't have an account? <Link to="/sign-up" className="link" id="signup">Sign Up</Link>
                        </Typography>
                    </Box>
                </Container>
            </div>
        </ThemeProvider>
    )
}