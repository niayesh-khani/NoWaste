import * as React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Grid, Typography, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarRateIcon from '@mui/icons-material/StarRate';
import PhoneIcon from '@mui/icons-material/Phone';
import PlaceIcon from '@mui/icons-material/Place';
import MdPhone from '@mui/icons-material/Phone';
import DoneIcon from '@mui/icons-material/Done';
import './OwnRestaurantCard.css';

const OwnRestaurantCard = (props) => {
    const [phoneCopied, setPhoneCopied] = React.useState(false);
    const [addressCopied, setAddressCopied] = React.useState(false);
    const restaurant = props;
    const phone = restaurant.number;
    const address = restaurant.address;

    const handlePhoneChip = (text) => {
        navigator.clipboard.writeText("09116705720");
        setPhoneCopied(true);
        setTimeout(() => {
            setPhoneCopied(false);
        }, 1000);
    };

    const handleAddressChip = () => {
        navigator.clipboard.writeText("This is the address.");
        setAddressCopied(true);
        setTimeout(() => {
            setAddressCopied(false);
        }, 1000);

    };
    const handlePhoneCopied = () => {
        setPhoneCopied(false);
    };
    const handleAddressCopied = () => {
        setAddressCopied(false);
    };
    const handleShow = () => {
        // Handle the show event
    };

    return (
        <Card className='homepage-restaurant-card-restaurant' onClick={handleShow}>
        <CardActionArea>
            <Grid container spacing={2}>
            <Grid item md={6}>
                <div style={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    sx={{ height: 180, width: 200, marginLeft: 1, marginTop: 1, marginBottom: 1, borderRadius: 1 }}
                    image="/mohsen.jpg"
                />
                </div>
            </Grid>
            <Grid item md={6}>
                <CardContent>
                    <Grid container style={{color: "black"}}>
                        <Grid item>
                            <Typography className='restaurant-name-hemepage-restaurant' gutterBottom>
                                {restaurant.name}
                            </Typography>
                        </Grid>
                        <Grid item container alignItems="center">
                            {/* <LocationOnIcon sx={{ marginRight: '0.5rem' }} />
                            <Typography variant="body2">This is the address.</Typography> */}
                            <Chip
                                icon={<MdPhone/>}
                                sx={{mb:1, fontSize: "medium"}}
                                onClick={handlePhoneChip}       
                                label={phoneCopied ? "Copied!" : phone}
                                clickable
                                className={phoneCopied ? "copied" : ""}
                                onDelete={phoneCopied ? handlePhoneCopied : null}
                                deleteIcon={<DoneIcon />}
                            />
                        </Grid>
                        <hr></hr>
                        <Grid item container alignItems="center">
                            <StarRateIcon sx={{ marginRight: '0.5rem', marginLeft: '5px' }} style={{ color: '#faaf00' }} />
                            <Typography>{restaurant.rate}</Typography>
                        </Grid>
                        <hr></hr>
                        <Grid item container alignItems="center">
                            {/* <PhoneIcon sx={{ marginRight: '0.5rem' }} />
                            <Typography>09116705720</Typography> */}
                            <Chip
                                icon={<PlaceIcon />}
                                onClick={handleAddressChip}
                                sx={{fontSize: "medium"}}
                                label={addressCopied ? "Copied!" : address}
                                clickable
                                className={addressCopied ? "copied" : ""}
                                onDelete={addressCopied ? handleAddressCopied : null}
                                deleteIcon={<DoneIcon />}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Grid>
            </Grid>
        </CardActionArea>
        </Card>
    );
};

export default OwnRestaurantCard;
