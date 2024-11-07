import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const MapComponent = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetch('./resources.geojson') 
            .then(response => response.json())
            .then(data => {
                console.log(data); 

                if (data && data.resources) { 
                    const features = data.resources.map(resource => ({
                        coords: resource.geometry.coordinates,
                        resourceName: resource.properties.resourceName,
                        website: resource.properties.website,
                        phoneNumber: resource.properties.phoneNumber,
                        address: resource.properties.address,
                        description: resource.properties.description
                    }));
                    setLocations(features);
                } else {
                    console.error("GeoJSON data is missing the 'resources' array.");
                }
            })
            .catch(error => console.error("Error loading GeoJSON data:", error));
    }, []);
    
return (
    <div>
    
         <MapContainer center={[47.6567, -122.3066]} zoom={11} style={{ height: "75vh", width: "80%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {locations.map((location, index) => (
                //Marker Popup represents the pins that will appear on the map.
                <Marker key={index} position={location.coords}>
                    <Popup>
                    <div>
                        <h3>{location.resourceName}</h3>
                        <p><strong>Website:</strong> <a href={location.website} target="_blank" rel="noopener noreferrer">{location.website}</a></p>
                        <p><strong>Phone:</strong> {location.phoneNumber}</p>
                        <p><strong>Address:</strong> {location.address}</p>
                        <p><strong>Description:</strong> {location.description}</p>
                    </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    </div>
    );
};
 
export function Map() {
    return (
        <div className="map-container">
        <div className="content">
            <MapComponent/>
        </div>
        </div>
    );
}