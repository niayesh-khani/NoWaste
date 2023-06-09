import React, { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet/dist/leaflet.css';
import './Map.css';

function Map() {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // Initialize map
    const map = L.map(mapRef.current).setView([51.505, -0.09], 13);

    // Add tile layer (e.g., OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add draggable marker with default icon
    const marker = L.marker([51.505, -0.09], { draggable: true }).addTo(map);
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

  return <div ref={mapRef} style={{ height: '400px' }} />;
}

export default Map;
