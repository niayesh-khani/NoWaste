import { Box, Button, Container, createTheme, FormControlLabel, Icon, InputAdornment, TextField, ThemeProvider, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useHistory } from "react-router-dom";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import './Login-Signup.css';
import Checkbox from '@mui/material/Checkbox';

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

export default function SignUp(){

    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if(!/\S+@\S+\.\S+/.test(e.target.value)) {
            setEmailError(true);
        } else{
            setEmailError(false);
        }
    };
    
    const [fullname, setFullname] = useState('')
    const [fullnameError, setFullnameError] = useState(false);

    const handleFullname = (e) => {
        setFullname(e.target.value);
        if(!/^\S*\s+[a-zA-Z]/gm.test(e.target.value) || e.target.value.length > 256) {
            setFullnameError(true);
        } else {
            setFullnameError(false);
        }
    };

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

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
    }, [password, confirmPassword]);

    const [validInputs, setValidInputs] = useState(false);

    useEffect(() => {
        let isValid = !fullnameError && !emailError && !passwordError && passwordMatch 
                        && password.trim().length > 0 && confirmPassword.trim().length > 0;
        setValidInputs(isValid);
    }, [fullnameError, emailError, passwordError, passwordMatch, password, confirmPassword]);

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
    
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push("/");
    }

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
                            style={{textAlign: 'center', marginTop: '5%', marginBottom: '5%', fontWeight: 'bold', fontSize: '30px'}}
                        >
                            Sign Up 
                        </Typography>
                        <form noValidate autoComplete="off" style={{textAlign: 'center'}} onSubmit={handleSubmit}>
                            <TextField 
                                className="field"
                                label="Full name"
                                variant="outlined"
                                color="secondary"
                                required
                                value={fullname}
                                onChange={handleFullname}
                                error={fullnameError}
                                helperText={
                                    <div className="error">
                                        {fullnameError && 'Your full name should have at least two words.'}
                                    </div>
                                }
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
                                className="field"
                                label="Email address"
                                variant="outlined"
                                color="secondary"
                                required
                                value={email}
                                onChange={handleEmailChange}
                                error={emailError}
                                helperText={
                                    <div className="error">
                                      {emailError && 'Invalid email Address!'}
                                    </div>
                                }
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Icon>
                                                <AlternateEmailIcon />
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
                                name="password"
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
                                    )
                                }}
                            />
                            <TextField 
                                label="Confirm password"
                                variant="outlined"
                                color="secondary"
                                required
                                className="field"
                                name="confirmPassword"
                                onChange={handleChangeConfirmPass}
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
                                                <LockIcon />
                                            </Icon> 
                                        </InputAdornment>
                                    )
                                }}
                            />
                            
                            <FormControlLabel className='checkbox' control={<Checkbox sx={{color : '#f18b72', '&.Mui-checked': {color: '#f18b72',},}}/>}
                                              label={
                                <Typography className = 'checkbox' style={{fontSize: "1.1em"}}>
                                    sign up as restaurant
                                </Typography>
                            }/>
                            <Button 
                                variant="contained" 
                                type="submit" 
                                color="primary"
                                className="field"
                                id="submit"
                                disabled={!validInputs}
                            >
                                Sign up
                            </Button>
                        </form> 
                        <Typography
                            style={{textAlign: 'center', marginBottom: '5%', fontSize: '0.9em'}}
                            className="text"
                        >
                            Already have an account? <Link to="/login" className="link">Log in</Link>
                        </Typography>
                    </Box>
                </Container>
            </div>
        </ThemeProvider>
    )
}