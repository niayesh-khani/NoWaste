import { Box, Button, Container, createTheme, FormControlLabel, Icon, InputAdornment, TextField, ThemeProvider, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Typical from "react-typical";
import './Landing.css';



export default function Landing(){
    
    return ( 
        <div className="landback">

            <nav className="navbar navbar-expand-lg">
                <form>
                    <button className="button-order login" role="button" formAction="./login">Login</button> 
                    <button className="button-order" role="button" formAction="./sign-up">Sign up</button>
                </form>
            </nav>


            <Container className="container">
                <Box className="landbox">
                    <Typography variant="h2" 
                        color="textPrimary"
                        gutterBottom
                        className="landtext"
                        style={{fontWeight: 'bold', fontSize: '60px', color: 'white'}}
                    >
                        Craving Something? 
                    </Typography>
                    <Typography variant="h2" 
                        color="textPrimary"
                        gutterBottom
                        className="landtext"
                        style={{ fontSize: '18px', color: 'white'}}
                        >
                            <Typical
                            loop={Infinity}
                            wrapper="b"
                            steps={['Delicious food that wont break the bank.', 3000,'Affordable meals that wont sacrifice taste.',3000,'Good food shouldnt cost a fortune.',3000]}
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