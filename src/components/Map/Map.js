import React, { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import axios from "axios";

function Map(props) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  setLat(props[0]);
  setLng(props[1]);
  const id = props[2];
  const type = props[3];
  const token = localStorage.getItem('token');

  //update the new location
  const handleSaveClick = () => {
    if (markerRef.current) {
      const { lat, lng } = markerRef.current.getLatLng();
      setLat(lat);
      setLng(lng);
      console.log('Marker saved position:', lat, lng);
      const userData = {
        "lat": lat,
        "lon": lng
      }
      if(type === "customer")
      {
        axios.post(`http://5.34.195.16/user/${id}/lat_long/`, userData,        
          {headers :
            {
              'Content-Type' : 'application/json',
              "Access-Control-Allow-Origin" : "*",
              "Access-Control-Allow-Methods" : "GET,POST",
              'Authorization' : "Token " + token.slice(1,-1)
            }})
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response);
            } 
        }); 
      }
      else
      {
        axios.post(`http://5.34.195.16/restaurant/${id}/lat_long/`, userData, 
          {headers :
          {
            'Content-Type' : 'application/json',
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Methods" : "GET,POST",
            'Authorization' : "Token " + token.slice(1,-1)
          }}
        )
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response);
            } 
        }); 
      }
    }
  };

  useEffect(() => {
    // Initialize map
    const map = L.map(mapRef.current).setView([35.6892, 51.3890], 13);

    // Add tile layer (e.g., OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Create a draggable marker with default icon
    const marker = L.marker([35.6892, 51.3890], { draggable: true }).addTo(map);
    markerRef.current = marker;

    // Update marker position on dragend
    marker.on('dragend', (event) => {
      const { lat, lng } = event.target.getLatLng();
      console.log('Marker position:', lat, lng);
    });

    // Cleanup function
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="map-container">
      <div ref={mapRef} className="leaflet-container" />
      <div className="edit-location-button">
        <button onClick={handleSaveClick}>Save Location</button>
      </div>
    </div>
  );
  
}

export default Map;
