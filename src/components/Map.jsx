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
            const zipCodeFive= zipCode.slice(0, 5);
            const zipCodePoint = zipCodes.find(zip => zip.properties.ZIPCODE === zipCodeFive);

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
    const [zipCodeInput, setZipCodeInput] = useState('');
    const [zipCode, setZipCode] = useState('');

    useEffect(() => {
        fetch('./resources.geojson') 
            .then(response => response.json())
            .then(data => {
                console.log(data); 
                const features = data.resources.map(resource => ({
                    coords: resource.geometry.coordinates,
                    resourceName: resource.properties.resourceName,
                    website: resource.properties.website,
                    phoneNumber: resource.properties.phoneNumber,
                    address: resource.properties.address,
                    description: resource.properties.description
                }));
                setLocations(features);
            })

        fetch('./KingCountyZipCodes.geojson')
            .then(response => response.json())
            .then(data => {
                setZipCodes(data.features);
            })
    }, []);

    const handleZipCodeChange = (e) => {
        let value = e.target.value;
        value = value.replace(/[^\d]/g, '');
        if (value.length > 5 && value[5] !== '-') {
            value = value.slice(0, 5) + '-' + value.slice(5);
        }
        setZipCodeInput(value);
    };

    const handleZipCodeSubmit = () => {
        setZipCode(zipCodeInput);
    };
    // here
    const kingCountyBounds = [
        46.972060, -122.750396],
        [48.088447, -121.084384]
    ];
    
return (
    <div className="mapContainer">
        <div className="zipCodeSection">
            <h1 htmlFor="zipCode" className="zipSearchLabel">Find Resources Near You: </h1>
            <div className="zipCodeInputContainer">
                <input
                    type="text"
                    className="zipInput"
                    id="zipCode"
                    value={zipCodeInput}
                    onChange={handleZipCodeChange}
                    placeholder="Enter ZIP code"
                    pattern="\d{5}-?(\d{4})?"
                    inputMode="numeric"
                    maxLength="10"
                />
                <button className="zipSearchButton" onClick={handleZipCodeSubmit}>Search</button>
            </div>
            <span id="passwordHelpInline" class="form-text"> Must be a King County Zip Code in the format ##### or #####-####. Find your ZIP Code <a href="https://www.unitedstateszipcodes.org/">here</a>.</span>
            <h2 className='mapAbout'>About the Map</h2>
            <p>This map was created using <a href="https://data.kingcounty.gov/Health-Wellness/King-County-Mental-Health-and-Substance-Use-Disord/sep3-3pj3/about_data">King County open data</a> about mental health resources and was manually cleaned to find resources that fit our demographic of youth adults aged 16-20 years old.</p>
        </div>

        <div className='mapSection'>
            <MapContainer 
                center={[47.5567, -122.3066]} 
                zoom={10} 
                style={{ height: "75vh", width: "100%" }}
                // here 
                maxBounds={kingCountyBounds}
                maxBoundsViscosity={1.0}
                minZoom={8}
                maxZoom={15} 
            >
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
    return(<MapComponent />)
}
