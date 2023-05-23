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
    const [balance, setBalance] = useState(localStorage.getItem('wallet_balance'));
    const val = JSON.parse(localStorage.getItem('email'));

    const handleCheckAdd = () => {
        setCheckAdd(!checkAdd);
    }
    const handleCheckPay = (e) => {
        setCheckPay(e.target.checked);
    }


    const restaurantId = localStorage.getItem('restaurantId');
    console.log(restaurantId);
    const userId = localStorage.getItem('id');
    console.log("user:", userId);
    // const restaurantId =1;
    // const userId=5;
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

    const handlePayment = (e) => {
        e.preventDefault();
        const userData = {
          email: val,
          amount: prices[1]
        };
        console.log(userData);
        console.log(val)
        axios.post("http://5.34.195.16/user/withdraw-wallet/", userData, { headers: { "Content-Type": "application/json" } })
          .then((response) => {
            console.log(response);
            const newBalance = response.data.wallet_balance;
            localStorage.setItem('wallet_balance', newBalance);
            setBalance(newBalance);
          })
          .catch((error) => {
            if (error.response) {
              console.log(error);
            }
          });
      };
  

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
                                    <Typography className="order-food">{order_list.name_and_price.name}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography className="order-food">
                                        <span className="order-food" style={{color: '#8a8686'}}>{order_list.quantity} × </span>
                                        {order_list.name_and_price.price}</Typography>
                                </Grid>
                            </Grid>))
                            }
                        </div>
                        <hr className="hr-tag" />
                        <Grid container spacing={2} className="orderpage-grid">
                            <Grid item>
                                <Typography className="order-food">Subtotal</Typography>
                            </Grid>
                            <Grid item>
                                <Typography className="order-food"> {prices[0]}$ </Typography>        
                            </Grid>
                        </Grid>
                        <hr className="hr-tag" />
                        <Grid container spacing={2} className="orderpage-grid">
                            <Grid item>
                                <Typography className="order-food">Discount</Typography>
                            </Grid>
                            <Grid item >
                                {/* <Typography> {"15"+"%"} </Typography> */}
                                <Typography className="order-food"> {prices[2]*100}% </Typography>     

                            </Grid>
                        </Grid>
                        <hr className="hr-tag" />
                        <Grid container spacing={2} className="orderpage-grid">
                            <Grid item>
                                <Typography className="order-food">Grand total</Typography>
                            </Grid>
                            <Grid item>
                                {/* <Typography> {205*0.85} </Typography> */}
                                <Typography className="order-food" id="grand-total"> {prices[1]}$ </Typography>          
                            </Grid>
                        </Grid> 
                        <Button id='order-submit' onClick={handlePayment} disabled={prices[1] > balance} className={prices[1] > balance ? '' :'order-submit'}>
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
                                    style={{alignSelf: 'flex-start', fontSize: '19px', marginLeft:'10%'}}
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
                            <Grid container spacing={2}>
                                <Grid item xs={10}>
                                <Typography style={{ display: "flex", marginLeft:'1px'}}>
                                    <PlaceIcon className="icon-order-page" style={{paddingLeft:"6px"}}/>
                                    <span style={{ flex: 1 , marginLeft: '-50%'}}>{shoppingCard.userAddress}</span>
                                </Typography>
                                </Grid>
                                <Grid item xs={1.5} justifyContent="flex-end">
                                <Checkbox
                                    style={{ color: "green" , marginTop:"-22%"}}
                                    className="checkbox-orderpage"
                                    defaultChecked
                                    onClick={handleCheckAdd}
                                />
                                </Grid>
                            </Grid>
                        </Box>
                        <Typography
                            style={{alignSelf: 'flex-start', fontSize: '19px', marginTop: "30px", marginLeft:'1%'}}
                        >
                            Payment method
                        </Typography>
                        <Box className="orderpage-shopinfo-box">
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <Typography style={{ display: "flex", marginLeft:'2px'}}>
                                        <WalletIcon className="icon-order-page" style={{paddingRight:"8px" , paddingLeft:"8px"}}/>
                                        <span style={{ flex: 1 }}>Wallet</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>
                                        <span className="order-balance" style={{ flex: 1 , marginLeft: '-115%'}}>Balance: {balance}$</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.5} justifyContent="flex-end">
                                <Checkbox
                                    style={{ color: "green" , marginTop:"-22%"}}
                                    className="checkbox-orderpage"
                                    defaultChecked
                                    onClick={handleCheckAdd}
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