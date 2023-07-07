import React from 'react'
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


export const Map = () => {

  const [markerPosition, setMarkerPosition] = useState([15.7835, -90.2308]);

  const handleMapClick = (e) => {
    setMarkerPosition([e.latlng.lat, e.latlng.lng]);
  }
  return (
    <div>
      <MapContainer center={markerPosition} zoom={7} style={{ height: "600px", width: '100%'}} onClick={handleMapClick}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={markerPosition}>
          <Popup>Ubicación actual</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
