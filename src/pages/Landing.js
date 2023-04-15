import { Box, Button, Container, createTheme, FormControlLabel, Grid, Icon, InputAdornment, TextField, ThemeProvider, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Typical from "react-typical";
import './Landing.css';



export default function Landing(){
    const history = useHistory();
    const handlelogin = () => {
        history.push('./login')
    };
    const handlesignup = () => {
        history.push('./sign-up')
    };

        return ( 
        <div className="landback">
            <nav className="navbar">
                <form>
                    <button className="buttonland" role="button" onClick={handlelogin} >Log in</button>
                    <button className="buttonland signup" role="button" onClick={handlesignup}>Sign up</button>
                </form>
            </nav>


            <Container className="container">
                <Box className="landbox">
                    <Typography variant="h2" 
                        color="textPrimary"
                        gutterBottom
                        className="landtext"
                        style={{fontSize: '50px', color: 'black'}}
                    >
                        Craving Something? 
                    </Typography>
                    <Typography variant="h2" 
                        color="textPrimary"
                        gutterBottom
                        className="landtext"
                        style={{ fontSize: '20px', color: 'black'}}
                        >
                            <Typical
                            loop={Infinity}
                            wrapper="b"
                            steps={['Delicious food that won\'t break the bank.', 3000,'Affordable meals that won\'t sacrifice taste.',3000,'Good food shouldn\'t cost a fortune.',3000]}
                            />
                            <br></br>
                            Try us and see
                            <span role="img" aria-label="eye"> 👀</span>
                    </Typography>
                    <form>
                    <button class="button-order" role="button" formAction="./login">
                        Let's Order !
                    </button>
                    </form>
                </Box>
            </Container>
        </div>
    )
}