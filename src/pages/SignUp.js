import { Box, Button, Container, createTheme, FormControlLabel, Icon, InputAdornment, TextField, ThemeProvider, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useHistory } from "react-router-dom";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import './Login-Signup.css';
import axios from "axios";
import Checkbox from '@mui/material/Checkbox';
import { SpinningBubbles } from "react-loading";

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
    const [role, setRole] = useState('customer');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [fullname, setFullname] = useState('');
    const [fullnameError, setFullnameError] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [validInputs, setValidInputs] = useState(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      window.addEventListener("load", () => {
        setLoading(false);
      })
    }, []);  

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if(!/[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(e.target.value)) {
            setEmailError(true);
        } else{
            setEmailError(false);
        }
    };
    
    const handleFullname = (e) => {
        setFullname(e.target.value);
        if(!/^[a-zA-Z]+\s[a-zA-Z]+$/gm.test(e.target.value)){
            setFullnameError(true);
        } else {
            setFullnameError(false);
        }
    };

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
        const userData = {
            name: fullname,
            email: email
        };
        axios.post("http://nowaste39.pythonanywhere.com/user/signup/", userData, {headers:{"Content-Type" : "application/json"}})
        .then((response) => {
            console.log(response);
            history.push("/verification");
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

    useEffect(() => {
        localStorage.setItem('email', JSON.stringify(email));
        localStorage.setItem('role', JSON.stringify(role));
        localStorage.setItem('password', JSON.stringify(password));
        localStorage.setItem('fullname', JSON.stringify(fullname));
    }, [email, role, password, fullname]);

    return ( 
        <ThemeProvider theme={theme}>
            <div className="root">
                <Container className="container">
                    <img
                        className="background"
                        src="/3.jpg"
                        alt="NoWaste"
                    />
                    <Box className="box">
                        <Typography variant="h5" 
                            color="textPrimary"
                            gutterBottom
                            className="text"
                            style={{fontWeight: 'bold', fontSize: '30px'}}
                        >
                            Sign Up 
                        </Typography>
                        <form noValidate autoComplete="off" style={{textAlign: 'center'}}>
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
                            
                            <FormControlLabel className='checkbox' 
                                control={<Checkbox 
                                            sx={{color: '#f18b72', '&.Mui-checked': {color: '#f18b72',},}}
                                        />}
                                label={
                                <Typography className="text" id="signupcheck"
                                        onClick={() => setRole("restaurant")}>
                                    Sign up as restaurant
                                </Typography>
                            }/>
                            <Button 
                                variant="contained" 
                                type="submit" 
                                color="primary"
                                className="field"
                                id="submit"
                                disabled={!validInputs}
                                onClick={handleSubmit}
                            >
                                Sign up
                            </Button>
                        </form> 
                        <Typography
                            style={{fontSize: '0.9em'}}
                            className="text"
                        >
                            Already have an account? <Link to="/login" className="link" id="login">Log in</Link>
                        </Typography>
                    </Box>
                </Container>
            </div>
        </ThemeProvider>        
    )
}