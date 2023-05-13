import React, { useEffect, useState } from "react";
import './OrderPage.css';
import Header from "../components/Header";
import { ThemeProvider } from "@mui/styles";
import { Button, Box, Grid, Typography, createTheme } from "@material-ui/core";
import Footer from "../components/Footer";
import { KeyboardArrowRightIcon } from '@mui/icons-material';
import PlaceIcon from '@mui/icons-material/Place';
import WalletIcon from '@mui/icons-material/Wallet';
import CircleChecked from '@mui/icons-material/CheckCircleOutline';
import { CheckBox, CircleCheckedFilled, CircleUnchecked } from "@material-ui/icons";
import axios from 'axios';

const theme = createTheme({
    palette: {
        primary: {
            main: '#dd9d46',
        },
        secondary: {
            main: '#a44704',
        }
    },
})

export default function OrderPage(){
    const [shoppingCard, setShoppingCard] = useState([]);  
    const [menu, setMenu] = useState([]);
    useEffect(()=>{                                                 //
        axios.get(``)
            .then((response) => {
                setShoppingCard(response.data);
                setMenu(shoppingCard.menu);
            })
            .catch((error) => {
            console.log(error.response);
            });
    },[])


    return(
        <ThemeProvider theme={theme}>
            <Header />
            <Grid container spacing={2} sx={{paddingBottom: "1%"}} className="orderpage-root">
                <Grid item lg={4} md={4} sm={12} style={{paddingLeft: "3%"}}>
                    <Box className="orderpage-box" style={{justifyContent: 'space-between'}}>
                        <Typography variant="h5"
                            gutterBottom
                            className="orderpage-title"
                        >
                            Shopping Card
                            <span style={{color:"#E74C3C"}}>(2)</span>
                        </Typography>
                        <div className="orderpage-details-div">

                            <Grid container spacing={2} className="orderpage-grid">      //
                                {menu.map((item, index) => (
                                    <div key={index}>
                                        <Grid item>
                                            <Typography>{item.name}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography><span style={{color: '#8a8686'}}>{item.quantity}×</span>{item.price}$</Typography>
                                        </Grid>
                                    </div>
                                ))}
                            </Grid>


                            <Grid container spacing={2} className="orderpage-grid">
                                <Grid item>
                                    <Typography>Ghormeh sabzi</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography> <span style={{color: '#8a8686'}}>2×</span>18$ </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} className="orderpage-grid">
                                <Grid item>
                                    <Typography>Fesenjoon</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography> <span style={{color: '#8a8686'}}>1×</span>18$ </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} className="orderpage-grid">
                                <Grid item>
                                    <Typography>Zereshk polo</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography> <span style={{color: '#8a8686'}}>1×</span>18$ </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} className="orderpage-grid">
                                <Grid item>
                                    <Typography>Gheymeh</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography> <span style={{color: '#8a8686'}}>5×</span>18$ </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} className="orderpage-grid">
                                <Grid item>
                                    <Typography>Polo</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography> <span style={{color: '#8a8686'}}>2×</span>18$</Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} className="orderpage-grid">
                                <Grid item>
                                    <Typography>Polo</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography> <span style={{color: '#8a8686'}}>2×</span>18$</Typography>
                                </Grid>
                            </Grid>
                        </div>
                        <hr className="hr-tag" />
                        <Grid container spacing={2} className="orderpage-grid">
                            <Grid item>
                                <Typography>Subtotal</Typography>
                            </Grid>
                            <Grid item>
                                <Typography> 205$ </Typography>
                                {/* <Typography> {shoppingCard.subtotal}$ </Typography>        // */}
                            </Grid>
                        </Grid>
                        <hr className="hr-tag" />
                        <Grid container spacing={2} className="orderpage-grid">
                            <Grid item>
                                <Typography>Discount</Typography>
                            </Grid>
                            <Grid item >
                                <Typography> {"15"+"%"} </Typography>
                                {/* <Typography> {shoppingCard.discount }% </Typography>     // */}

                            </Grid>
                        </Grid>
                        <hr className="hr-tag" />
                        <Grid container spacing={2} className="orderpage-grid">
                            <Grid item>
                                <Typography>Grand total</Typography>
                            </Grid>
                            <Grid item>
                                <Typography> {205*0.85} </Typography>
                                {/* <Typography> {shoppingCard.total} </Typography>          //*/}
                            </Grid>
                        </Grid> 
                        <Button className="order-submit">
                            Pay
                        </Button>
                    </Box>
                </Grid>
                <Grid item lg={8} md={8} sm={12} style={{paddingLeft: "2%"}}>
                    <Box className="orderpage-box">
                        <Typography variant="h5"
                            gutterBottom
                            className="orderpage-title"
                        >
                            Shopping Info
                        </Typography>
                        <Typography
                            style={{alignSelf: 'flex-start', fontSize: '20px'}}
                        >
                            Address
                        </Typography>
                        <Box className="orderpage-shopinfo-box">
                            <Typography style={{display: "flex", alignSelf: 'flex-start', justifyContent: 'center'}}>
                                <PlaceIcon className="icon-order-page" />
                                Iran, Tehran, IUST
                                {/* {shoppingCard.adress}         //*/}
                                <CheckBox className="checkbox-orderpage" defaultChecked/>
                            </Typography>
                            
                        </Box>
                        <Typography
                            style={{alignSelf: 'flex-start', fontSize: '20px', marginTop: "30px"}}
                        >
                            Payment method
                        </Typography>
                        <Box className="orderpage-shopinfo-box">
                            <Typography style={{display:'flex', alignSelf: 'flex-start', justifyContent: 'center'}}>
                                <WalletIcon className="icon-order-page"/>
                                Wallet
                                <CheckBox className="checkbox-orderpage" defaultChecked/>
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Footer />
        </ThemeProvider>
    )
}