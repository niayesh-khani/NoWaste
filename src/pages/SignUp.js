import { Box, Button, Container, createTheme, FormControl, Icon, InputAdornment, TextField, ThemeProvider, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useHistory } from "react-router-dom";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import './Login-Signup.css';

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

export default function SignUp(){

    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if(!/\S+@\S+\.\S+/.test(e.target.value) && e.target.value.length >256) {
            setEmailError(true);
        } else{
            setEmailError(false);
        }
    };
    
    const [fullname, setFullname] = useState('')
    const [fullnameError, setFullnameError] = useState(false);

    const handleFullname = (e) => {
        setFullname(e.target.value);
        if(!/^\S*\s+[a-zA-Z]/gm.test(e.target.value)) {
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
                            style={{textAlign: 'center', marginTop: '5%', marginBottom: '5%', fontWeight: 'bold' , borderRadius : '25px'}}
                        >
                            Sign up 
                        </Typography>
                        <form noValidate autoComplete="off" style={{textAlign: 'center'}} onSubmit={handleSubmit}>
                            <FormControl style={{width: '100%'}}>
                            <TextField
                                select
                                label="Select your role"
                                defaultValue="Customer"
                                color="secondary"
                                required
                                className="field"
                                style= {{textAlign: 'left', marginBottom: "5%", marginLeft: "15%"}}
                            >
                                <MenuItem value="" disabled>
                                    <em>Select role</em>
                                </MenuItem>
                                <MenuItem value="Restaurant" className="menuItem">
                                    <RestaurantIcon /> Restaurant
                                </MenuItem>
                                <MenuItem value="Customer" className="menuItem">
                                    <AccountCircleIcon /> Customer
                                </MenuItem>
                            </TextField></FormControl>
                            <TextField 
                                className="field"
                                label="Full name"
                                variant="standard"
                                color="secondary"
                                required
                                value={fullname}
                                onChange={handleFullname}
                                error={fullnameError}
                                helperText={
                                    <div style={{height: fullnameError ? '2.2em' : '2.2em', lineHeight: '1em'}}>
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
                                variant="standard"
                                color="secondary"
                                required
                                value={email}
                                onChange={handleEmailChange}
                                error={emailError}
                                helperText={
                                    <div style={{height: emailError ? '1.5em' : '1.5em'}}>
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
                                variant="standard"
                                color="secondary"
                                required
                                className="field"
                                name="password"
                                onChange={handleChangePassword}
                                error={passwordError}
                                helperText={
                                    <div style={{height: passwordError ? '2em' : '2em'}}>
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
                                variant="standard"
                                color="secondary"
                                required
                                className="field"
                                name="confirmPassword"
                                onChange={handleChangeConfirmPass}
                                error={passwordMatch === false}
                                helperText={
                                    <div style={{height: !passwordMatch ? '1em' : '1em'}}>
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
                            <Button 
                                variant="contained" 
                                type="submit" 
                                color="primary"
                                className="field"
                                id="submit"
                                style={{backgroundColor: '#C4714B'}}
                                disabled={!validInputs}
                            >
                                Sign up
                            </Button>
                        </form> 
                        <Typography
                            style={{textAlign: 'center', marginBottom: '2%', fontSize: '14px'}}
                        >
                            Already have an account? <Link to="/login" style={{color:'#C4714B'}}>Log in</Link>
                        </Typography>
                    </Box>
                </Container>
            </div>
        </ThemeProvider>
    )
}