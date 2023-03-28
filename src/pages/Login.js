import { Box, Button, Container, createTheme, FormControlLabel, Icon, IconButton, InputAdornment, TextField, ThemeProvider, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material"
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import './Login-Signup.css'

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

export default function Login(){

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
    
    return ( 
        <ThemeProvider theme={theme}>
            <div className="root" style={{paddingTop: '8%'}}>
                <Container className="container">
                    <img
                        className="background"
                        src="/Log.jpg"
                        alt="NoWaste"
                    />
                    <Box className="box">
                        <Typography variant="h5" 
                            color="textPrimary"
                            gutterBottom
                            style={{textAlign: 'center', marginTop: '5%', marginBottom: '5%', fontWeight: 'bold'}}
                        >
                            Login 
                        </Typography>
                        <form noValidate autoComplete="off" style={{textAlign: 'center'}}>
                            <TextField 
                                label="Email Address"
                                variant="standard"
                                color="secondary"
                                required
                                className="field"
                                style={{marginBottom: '4%'}}
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
                                variant="standard"
                                color="secondary"
                                required
                                className="field"
                                style={{marginBottom: '4%'}}
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
                            <FormControlLabel control={<Checkbox />} label="Remember me"/>

                            <Link to="/login">Forget password?</Link>
                            <Button 
                                variant="contained" 
                                type="submit" 
                                color="primary"
                                className="field"
                                id="submit"
                                style={{backgroundColor: '#dd9d46'}}
                            >
                                Login
                            </Button>
                        </form> 
                        <Typography variant="h6"
                            style={{textAlign: 'center', marginBottom: '5%', marginTop: '5%'}}
                        >
                            Don't have an account? <Link to="/sign-up">Sign up</Link>
                        </Typography>
                    </Box>
                </Container>
            </div>
        </ThemeProvider>
    )
}