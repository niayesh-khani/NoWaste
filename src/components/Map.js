import { AppBar, Toolbar, styled, Menu, alpha, InputBase, IconButton, Badge, MenuItem, Modal } from '@mui/material';
import * as React from 'react';
import {useHistory } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AccountCircle } from '@material-ui/icons';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import './Map.css';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Logout from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import axios from "axios";
import GeoSearchField from './GeoSearch';

import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';


const Map = () => {
    const position = [51.505, -0.09];
    const RecenterAutomatically = ({lat, lng}) => {
        const map = useMap();
        useEffect(() => {
            map.setView([lat, lng]);
        }, [lat, lng]);
        return null;
    }
    return ( 
        <div>
            <MapContainer center={[45.4, -75.7]} zoom={12}scrollWheelZoom={true}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {/* <GeoSearchField /> */}
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

export default Map;