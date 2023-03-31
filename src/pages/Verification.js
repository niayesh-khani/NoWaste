import { Box, Button, Container, createTheme, Icon, IconButton, InputAdornment, TextField, ThemeProvider, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CodeIcon from '@mui/icons-material/Code';
import { Link } from "react-router-dom";
import './Login-Signup.css'
import { tr } from "date-fns/locale";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


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

export default function Verification(){

    const [code, setCode] = useState('');
    const [codeError, setCodeError] = useState(false);

    const handleCode = (e) => {
        setCode(e.target.value);
        if(!/^\d{6}$/.test(e.target.value)){
            setCodeError(true);
        } else {
            setCodeError(false);
        }
    }

    const [validInputs, setValidInputs] = useState(false);
    useEffect(() => {
        let isValid = !codeError;
        setValidInputs(isValid);
    }, [code]);

    function setHeight() {
        const box = document.querySelector('.box');
        const boxHeight = box.offsetHeight;
        const image = document.querySelector('.background');
        image.style.height = `${boxHeight}px`;
    }
    const history = useHistory();

    const handleSubmit = () => {
        history.push("/");
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
            <div className="root">
                <Container className="container">
                    <img
                        className="background"
                        src="/f2.jpg"
                        alt="NoWaste"
                    />
                    <Box className="box">
                        <Typography variant="h4" 
                            color="textPrimary"
                            gutterBottom
                            className="text"
                            style={{fontWeight: 'bold'}}
                        >
                            Verification
                        </Typography>
                        <Typography 
                            className="verification"
                            style={{marginBottom: "5%"}}
                        >
                            Enter the verification code we just sent you on your email address.
                        </Typography>
                        <form noValidate autoComplete="off" style={{textAlign: 'center'}}>
                            <TextField 
                                label="Code"
                                variant="outlined"
                                color="secondary"
                                required
                                className="field"
                                value={code}
                                onChange={handleCode}
                                error={codeError}
                                helperText={ 
                                    <div className="error" id="verify">
                                        {codeError && "Code must have 6 numbers."}
                                    </div>
                                }
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Icon>
                                                <CodeIcon />
                                            </Icon> 
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button 
                                variant="contained" 
                                type="submit" 
                                color="primary"
                                className="field"
                                id="submit"
                                disabled={!validInputs}
                                onClick={handleSubmit}
                            >
                                Verify code
                            </Button>
                        </form> 
                        <Typography 
                            style={{fontSize: '1em'}}
                            className="text"
                        >
                        <Link to="/" className="link-pass">Resend code?</Link>
                        </Typography>
                    </Box>
                </Container>
            </div>
        </ThemeProvider>
    )
}