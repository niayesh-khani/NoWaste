import React, { useEffect, useState } from "react";
import './OrderPage.css';
import Header from "../components/Header";
import { ThemeProvider } from "@mui/styles";
import { Button, Box, Grid, Typography, createTheme, Checkbox } from "@material-ui/core";
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
    const [orderItems, setOrderItems] = useState([]);
    const [checkAdd, setCheckAdd] = useState(true);
    const [checkPay, setCheckPay] = useState(true);
    const [prices, setPrices] = useState([]);
    const handleCheckAdd = () => {
        setCheckAdd(!checkAdd);
    }
    const handleCheckPay = (e) => {
        setCheckPay(e.target.checked);
    }


    // const restaurantId = localStorage.getItem('restaurantId');
    // console.log(restaurantId);
    // const userId = localStorage.getItem('id');
    // console.log("user:", userId);
    const restaurantId =1;
    const userId=5;
    useEffect(()=>{
        axios.get(`http://5.34.195.16/restaurant/restaurant_view/${restaurantId}/${userId}/order/`)
            .then((response) => {
                console.log("oredrs",response.data);
                setShoppingCard(response.data);
                setOrderItems(response.data.orderItems);
                setPrices(response.data.Subtotal_Grandtotal_discount);
                console.log("prices", response.data.Subtotal_Grandtotal_discount);
            
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

                            <Grid container spacing={2} className="orderpage-grid">      
                            </Grid>
                            {orderItems.map((order_list)=>(<Grid container spacing={2} className="orderpage-grid">
                                <Grid item>
                                    <Typography>{order_list.name_and_price.name}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography> <span style={{color: '#8a8686'}}>{order_list.quantity} ×</span> {order_list.name_and_price.price}</Typography>
                                </Grid>
                            </Grid>))
                            }
                        </div>
                        <hr className="hr-tag" />
                        <Grid container spacing={2} className="orderpage-grid">
                            <Grid item>
                                <Typography>Subtotal</Typography>
                            </Grid>
                            <Grid item>
                                <Typography> {prices[0]}$ </Typography>        
                            </Grid>
                        </Grid>
                        <hr className="hr-tag" />
                        <Grid container spacing={2} className="orderpage-grid">
                            <Grid item>
                                <Typography>Discount</Typography>
                            </Grid>
                            <Grid item >
                                {/* <Typography> {"15"+"%"} </Typography> */}
                                <Typography> {prices[2]*100}% </Typography>     

                            </Grid>
                        </Grid>
                        <hr className="hr-tag" />
                        <Grid container spacing={2} className="orderpage-grid">
                            <Grid item>
                                <Typography>Grand total</Typography>
                            </Grid>
                            <Grid item>
                                {/* <Typography> {205*0.85} </Typography> */}
                                <Typography> {prices[1]}$ </Typography>          
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
                        <Grid container spacing={2} >
                            <Grid item>
                                <Typography
                                    style={{alignSelf: 'flex-start', fontSize: '20px'}}
                                >
                                    Address
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button className="button-change-address">
                                    Change Address
                                </Button>
                            </Grid>
                        </Grid>
                        <Box className="orderpage-shopinfo-box">
                            <Grid constainer spacing={2}>
                                    <Grid item>
                                    <Typography style={{display: "flex", alignSelf: 'flex-start', justifyContent: 'center', marginLeft: "-280%"}}>
                                        <PlaceIcon className="icon-order-page" />
                                        {shoppingCard.userAddress}
                                    </Typography>
                                    </Grid>
                                    <Grid item justifyContent="flex-end" >
                                        <Checkbox 
                                            style={{color: "green", marginLeft: "210%", marginTop: "-30%"}} 
                                            className="checkbox-orderpage" 
                                            defaultChecked
                                            onClick={handleCheckAdd}
                                        />
                                    </Grid>
                            </Grid>
                        </Box>
                        <Typography
                            style={{alignSelf: 'flex-start', fontSize: '20px', marginTop: "30px"}}
                        >
                            Payment method
                        </Typography>
                        <Box className="orderpage-shopinfo-box">
                            <Grid constainer spacing={2}>
                                <Grid item>
                                    <Typography style={{display: "flex", alignSelf: 'flex-start', justifyContent: 'center', marginLeft: "-700%"}}>
                                        <WalletIcon className="icon-order-page"/>
                                        Wallet
                                    </Typography>
                                    </Grid>
                                    <Grid item justifyContent="flex-end" >
                                        <Checkbox 
                                            style={{color: "green", marginLeft: "390%", marginTop: "-60%"}} 
                                            className="checkbox-orderpage" 
                                            defaultChecked
                                            disabled
                                            // onChange={handleCheckPay}
                                        />
                                    </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Footer />
        </ThemeProvider>
    )
}