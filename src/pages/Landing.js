import { Box, Button, Container, createTheme, FormControlLabel, Icon, InputAdornment, TextField, ThemeProvider, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import './Landing.css';


export default function Landing(){
    
    return ( 
        <div className="landback">
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
                            Good food shouldn't cost a fortune . Try us and see
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