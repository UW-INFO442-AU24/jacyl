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

// const geocodeZipCode = async (zipCode) => {
//     const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${zipCode}&key=YOUR_API_KEY`);
//     const data = await response.json();
//     if (data.results.length > 0) {
//         return data.results[0].geometry;
//     }
//     return null;
// };

const MapComponent = () => {
    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    // const [zipCode, setZipCode] = useState('');

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
                    setFilteredLocations(features);
                } else {
                    console.error("GeoJSON data is missing the 'resources' array.");
                }
            })
            .catch(error => console.error("Error loading GeoJSON data:", error));
    }, []);

    const handleZipCodeChange = async (e) => {
        const zip = e.target.value;
        setZipCode(zip);

        if (zip.length === 5) {
            const coordinates = await geocodeZipCode(zip);
            if (coordinates) {
                setFilteredLocations(
                    locations.filter(location =>
                        L.latLng(location.geometry.coordinates).distanceTo(L.latLng(coordinates)) < 5000 // 5km radius
                    )
                );
            }
        } else {
            setFilteredLocations(locations);
        }
    };
    
return (
    <div>
        {/* Zip Code */}
        {/* <div>
            <label htmlFor="zipCode">Find Resources Near You: </label>
            <input
                type="text"
                id="zipCode"
                value={zipCode}
                // onChange={handleZipCodeChange}
                placeholder="Enter ZIP code"
            />
        </div> */}
    
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