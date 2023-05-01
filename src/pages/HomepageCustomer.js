import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Restaurant-View.css';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ExpandMore, ExpandLess} from '@mui/icons-material';
import { AccountCircle } from '@material-ui/icons';
import Masonry from 'react-masonry-css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Food from '../components/Food';
import BackToTop from '../components/BackToTop';
import Footer from '../components/Footer';
import NavigationIcon from '@material-ui/icons/Navigation';
import { Button, InputLabel, FormControl } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useHistory } from "react-router-dom";
import Header from '../components/Header';
import Slider from '@mui/material/Slider';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ShowComment from '../components/ShowComment';
import { useEffect } from 'react';
import { react } from '@babel/types';
import { Collapse, Grid, MenuItem, TextField, createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import "./HomepageCustomer.css";

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

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
            backgroundColor:'#dd9d46',
            opacity: 1,
            border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.5,
        },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#dd9d46',
        border: '6px solid #dd9d46',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
        color:
            theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
        duration: 500,
        }),
    },
    }));

const HomepageCustomer = () => {
    const [valueR, setValueR] = React.useState([0, 5]);
    const [valueD, setValueD] = React.useState([0, 100]);
    const [expandRating, setExpandRating] = React.useState(false);
    const [expandDiscount, setExpandDiscount] = React.useState(false);
    const [sort, setSort] = React.useState('');

    const handleChange = (event) => {
        setSort(event.target.value);
    };

    const handleChangeRate = (event, newValue) => {
        setValueR(newValue);
    };
    const handleChangeDiscount = (event, newValue) => {
        setValueD(newValue);
    };
    const handleExpandRating = () => {
        setExpandRating((prevExpand) => !prevExpand);
    }
    const handleExpandDiscount = () => {
        setExpandDiscount((prevExpand) => !prevExpand);
    }
    return ( 
        // <div>
        <ThemeProvider theme={theme}>
            <Header />
            <Grid container spacing={2} sx={{ paddingTop:"2%" }}
                className='grid-homepage-customer'
            >
                <Grid item md={3}>
                    <Box className="filter-hompage-customer">
                        <Typography variant='h5'> 
                            Filters
                        </Typography>
                        <Grid container spacing={2} className='grid' id='grid-margin'
                            // alignItems="center"
                            >
                                <Grid item>
                                    <Typography 
                                    className='filter-type'
                                    >
                                        Rating
                                    </Typography>
                                </Grid>
                                <Grid item lg={2} md={3}>
                                    <IconButton onClick={handleExpandRating} aria-label='Show more' aria-expanded={setExpandRating}>
                                        {expandRating ? <ExpandLess /> : <ExpandMore />}
                                    </IconButton>
                                </Grid>
                                <Grid item lg={12} style={{
                                    marginTop: '-10px', marginLeft: '10px',
                                    //  width: '90%'
                                    }}>
                                    {expandRating ? (
                                        <Collapse in={expandRating} timeout="auto" unmountOnExit 
                                        // style={{ width: '100%' }}
                                        >
                                        <Slider
                                            getAriaLabel={() => 'rate range'}
                                            value={valueD}
                                            onChange={handleChangeDiscount}
                                            valueLabelDisplay="off"
                                            max={5}
                                            step={0.1}
                                            className="range-homepage-customer"
                                        />
                                        </Collapse>
                                    ) : null}
                                </Grid> 
                            </Grid>
                            <hr className='hr-tag' />
                            <Grid container spacing={2} className='grid' id='grid-margin'
                            // alignItems="center"
                            >
                                <Grid item>
                                    <Typography 
                                    className='filter-type'
                                    >
                                        Discount
                                    </Typography>
                                </Grid>
                                <Grid item lg={2} md={3}>
                                    <IconButton onClick={handleExpandDiscount} aria-label='Show more' aria-expanded={setExpandDiscount}>
                                        {expandDiscount ? <ExpandLess /> : <ExpandMore />}
                                    </IconButton>
                                </Grid>
                                <Grid item lg={12} style={{
                                    marginTop: '-10px', marginLeft: '10px',
                                    //  width: '90%'
                                    }}>
                                    {expandDiscount ? (
                                        <Collapse in={expandDiscount} timeout="auto" unmountOnExit 
                                        // style={{ width: '100%' }}
                                        >
                                        <Slider
                                            getAriaLabel={() => 'rate range'}
                                            value={valueD}
                                            onChange={handleChangeDiscount}
                                            valueLabelDisplay="off"
                                            max={100}
                                            step={1}
                                            className="range-homepage-customer"
                                        />
                                        </Collapse>
                                    ) : null}
                                </Grid> 
                            </Grid>
                            <hr className='hr-tag'/>
                            <Grid container spacing={2} className='grid'>
                                <Grid item>
                                    <Typography>
                                        Iranian
                                    </Typography>
                                </Grid>
                                <Grid item lg={3} md={4}>
                                    <FormControlLabel
                                        control={<IOSSwitch />}
                                        labelPlacement="start"
                                    />
                                </Grid>
                            </Grid>
                            <hr className='hr-tag'/>
                            <Grid container spacing={2} className='grid'>
                                <Grid item>
                                    <Typography>
                                        Foriegn
                                    </Typography>
                                </Grid>
                                <Grid item lg={3} md={4}>
                                    <FormControlLabel
                                        control={<IOSSwitch />}
                                        labelPlacement="start"
                                    />
                                </Grid>
                            </Grid>
                            <hr className='hr-tag'/>
                            <Grid container spacing={2} className='grid'>
                                <Grid item>
                                    <Typography >
                                        Drink
                                    </Typography>
                                </Grid>
                                <Grid item lg={3} md={4}>
                                    <FormControlLabel 
                                        control={<IOSSwitch />}
                                        labelPlacement="start"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item md={9}>
                        <Grid container spacing={2}>
                            <Grid item md={9}></Grid>
                            <Grid item md={3}>
                            <FormControl className='formcontrol-sorting'style={{width: "100%"}}>
                                <TextField
                                    select
                                    label="Sort"
                                    color="secondary"
                                    variant="outlined"
                                    value={sort}
                                    // InputLabelProps={{ shrink: true }}
                                    // style= {{textAlign: 'left', width:'100%'}}
                                    style={{width: '100%'}}
                                    onChange={handleChange}
                                        >
                                <MenuItem value="Item1">Newest</MenuItem>
                                <MenuItem value="Item2">Latest</MenuItem>
                                <MenuItem value="Item3">Rate</MenuItem>
                                <MenuItem value="Item4">Discount</MenuItem>
                                </TextField>
                            </FormControl>
                            </Grid>
                        </Grid>
                </Grid>
            <BackToTop/>
            </Grid>
        {/* <Footer/> */}
        </ThemeProvider>
    );
}

export default HomepageCustomer;