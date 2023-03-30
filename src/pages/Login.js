import { Box, Button, Container, createTheme, FormControlLabel, Icon, IconButton, InputAdornment, TextField, ThemeProvider, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material"
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";
import './Login-Signup.css'


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
})

export default function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [validInputs, setValidInputs] = useState(false);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            password: password,
            email: email
            };
            console.log(userData);
            axios.post("http://nowaste39.pythonanywhere.com/User/login/", userData, {headers:{"Content-Type" : "application/json"}})
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                // if (error.response) {
                //     console.log(error.response);
                //     console.log("server responded");
                // } 
                // else if (error.request) {
                //     console.log("network error");
                // } 
                // else {
                //     console.log(error);
                // }
                console.log(error);
                console.log(error.request.body);
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
                        <Typography variant="h4" 
                            color="textPrimary"
                            gutterBottom
                            className="text"
                            style={{textAlign: 'center', marginTop: '10%', marginBottom: '10%', fontWeight: 'bold'}}
                        >
                            Login 
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
                                style={{marginBottom: '10%'}}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Icon>
                                                <PersonIcon />
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
                                style={{marginBottom: '2%'}}
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
                            <FormControlLabel className = 'remember' control={<Checkbox sx={{color : '#f18b72','& .MuiSvgIcon-root': { fontSize: 22 }, '&.Mui-checked': {color: '#f18b72',},}}/>}
                                            //   label="Remember me" fontSize = '1em' style={{marginBottom:"8%"}}/>
                                            label={
                                                <Typography className = 'remember'>
                                                    Remember me
                                                </Typography>
                                            }/>
                            <Link to="/login" className="forgetpassword" >Forget password?</Link>
                            <Button 
                                variant="contained" 
                                type="submit" 
                                color="primary"
                                className="field"
                                id="submit"
                                onClick={handleSubmit}
                                disabled={!validInputs}
                            >
                                Login
                            </Button>
                        </form> 
                        <Typography 
                            style={{textAlign: 'center', marginBottom: '5%', marginTop: '5%', fontSize: '1em'}}
                            className="text"
                        >
                            Don't have an account? <Link to="/sign-up" className="link">Sign Up</Link>
                        </Typography>
                    </Box>
                </Container>
            </div>
        </ThemeProvider>
    )
}