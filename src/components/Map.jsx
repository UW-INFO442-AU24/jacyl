import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
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

const MapViewController = ({ zipCode, zipCodes }) => {
    const map = useMap(); 

    useEffect(() => {
        if (zipCode) {
            const zipCodePoint = zipCodes.find(zip => zip.properties.ZIPCODE === zipCode);

            if (zipCodePoint) {
                const zipLatLng = L.latLng(zipCodePoint.geometry.coordinates[1], zipCodePoint.geometry.coordinates[0]); 
                map.setView(zipLatLng, 13);
            }
        }
    }, [zipCode, zipCodes, map]);

    return null; 
};

const MapComponent = () => {
    const [locations, setLocations] = useState([]);
    const [zipCodes, setZipCodes] = useState('');
    const [zipCode, setZipCode] = useState('');

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

        fetch('./KingCountyZipCodes.geojson')
            .then(response => response.json())
            .then(data => {
                if (data && data.features) {
                    setZipCodes(data.features);
                }
            })
            .catch(error => console.error("Error loading zipcodes GeoJSON data:", error));
    }, []);

    const handleZipCodeChange = (e) => {
        setZipCode(e.target.value);
    };
    
return (
    <div className="mapContainer">
        <div className="zipCodeSection">
            <h1 htmlFor="zipCode" className='zipSearchLabel'>Find Resources Near You: </h1>
            <input
                type="text"
                id="zipCode"
                value={zipCode}
                onChange={handleZipCodeChange}
                placeholder="Enter ZIP code"
            />

            <h2 className='mapAbout'>About the Map</h2>
            <p>This map was created using King County Open data about mental health resources...</p>
        </div>

        <div className='mapSection'>
            <MapContainer center={[47.5567, -122.3066]} zoom={10} style={{ height: "75vh", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapViewController zipCode={zipCode} zipCodes={zipCodes} />

                {locations.map((location, index) => (
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