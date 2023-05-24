import * as React from 'react';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import './Map.css';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import GeoSearchField from './GeoSearch';


const Map = () => {
    // const [lat, setLat] = useState(51.505);
    // const [lng, setLng] = useState(-0.09);
    const [location, setLocation] = useState({});
    const RecenterAutomatically = ({lat, lng}) => {
        const map = useMap();
        useEffect(() => {
            map.setView([lat, lng]);
        }, [lat, lng]);
        return null;
    }

    const SetViewToCurrentLocation = ({location, setLocation}) => {
        const map = useMap();
        function getGeo() {
            if (!location.lat && !location.lng) {
                console.log("+++++++++++++++++ TRY TO GET LOCATION FROM BROWSER +++++++++++++++++++");
                navigator.geolocation.getCurrentPosition( 
                    (position) =>  {
                        setLocation({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                    }, 
                    (error) => {
                        console.log("--------- ERROR WHILE FETCHING LOCATION ----------- ", error);
                        console.log("THE LOCATION.LAT ", location.lat);
                        console.log("THE LOCATION.LNG ", location.lng);
                        setLocation({lat: 51.505, lng: -0.09});
        
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
                    ) ;
            }
        }
    
        useEffect(() => {
            if (location) {
                console.log("LATITUDE IS: ", location.lat);
                console.log("LONGTITUDE IS: ", location.lng);
                console.log("THE LOCATIONS IS ", location);
                getGeo();
            }
        }, [location, location]);
    
        useEffect(() => {
            if (location.lat && location.lng) {
                console.log("THE LOCATION IN USEEFFECT IS: ", location);
                map.setView([location.lat, location.lng]);
            }
        }, [location]);
    
        return null;
    };

    const CustomizeMarker = ({location, setLocation}) => {
        const [draggable, setDraggable] = useState(false);
        console.log("*************** THE INPUT LOCATION IS ***************** ", location);
        let lat = location.lat;
        let lng = location.lng;
        const markerRef = useRef(null);
        const eventHandlers = useMemo(
            () => ({
                dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    console.log("THE OUTPUT OF getLatLng IS:", marker.getLatLng());
                    setLocation(marker.getLatLng());
                    setDraggable(false);
                }
                },
            }),
            [],
        );
    
        const toggleDraggable = useCallback(() => {
            setDraggable((d) => !d)
        }, []);
    
        const saveLocation = () => {
            if (markerRef.current)
            {
                console.log(
                    "THE NEW LATLONG AFTER SUBMIT IS:",
                    markerRef.current.getLatLng()
                );
            }
        };
    
    
        return (
            <>
                <Marker
                    draggable={draggable}
                    eventHandlers={eventHandlers}
                    position={[location.lat, location.lng]}
                    ref={markerRef}>
                    <Popup minWidth={100}>
                        <Typography>You can save your location after clicking on submit button.</Typography>
                        <Button onClick={saveLocation} type='button' variant='contained' sx={{ position: 'center'}}>Submit</Button>
                    </Popup>
                </Marker>
                <Tooltip title='click here to make the marker draggable' arrow placement='top'>
                    <Button  onClick={toggleDraggable} variant='contained' className='edit-location-button' type='button'>Edit Your Location</Button>
                </Tooltip> 
            </>
        );
    }

    return ( 
        <div>
            <MapContainer center={[45.4, -75.7]} zoom={12}scrollWheelZoom={true}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <GeoSearchField />
                {/* <Marker position={[lat,lng]}>
                    <Popup>
                        Your Home Location on The Map.
                    </Popup>
                </Marker>
                <RecenterAutomatically lat={lat} lng={lng} /> */}

                <SetViewToCurrentLocation location={location} setLocation={setLocation}/> 
                {location.lat && location.lng && (<CustomizeMarker location={location} setLocation={setLocation} />)}
            </MapContainer>
        </div>
    );
}

export default Map;