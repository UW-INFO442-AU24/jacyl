import React from 'react';
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { UseMapFunctions, MapViewController } from './MapComponent';
import MapFilter from './MapFilter';

const MapPage = () => {
    const {
        zipCodeInput,
        handleZipCodeChange,
        handleZipCodeSubmit,
        zipCode,
        filteredLocations,
        selectedFilters,
        setSelectedFilters,
    } = UseMapFunctions();

    const kingCountyBounds = [
        [46.972060, -122.750396],
        [49.088447, -121.084384],
    ];

    return (
        <div className="mapContainer">
            <div className="zipCodeSection">
                <h1 htmlFor="zipCode" className="zipSearchLabel">Find Resources Near You:</h1>
                <div className="zipCodeInputContainer">
                    <input
                        type="text"
                        className="zipInput"
                        id="zipCode"
                        value={zipCodeInput}
                        onChange={handleZipCodeChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleZipCodeSubmit();
                            }
                        }}
                        placeholder="Enter ZIP code"
                        inputMode="numeric"
                        maxLength="10"
                    />
                    <button className="zipSearchButton" onClick={handleZipCodeSubmit}>
                        Search
                    </button>
                </div>
                <span className="form-text">
                    Must be a King County Zip Code in the format ##### or #####-####. Find your ZIP Code{' '}
                    <a href="https://www.unitedstateszipcodes.org/">here</a>.
                </span>
                <MapFilter selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
                <h2 className="mapAbout">About the Map</h2>
                <p>
                    This map was created using{' '}
                    <a href="https://data.kingcounty.gov/Health-Wellness/King-County-Mental-Health-and-Substance-Use-Disord/sep3-3pj3/about_data">
                        King County open data
                    </a>{' '}
                    about mental health resources and was manually cleaned to find resources that fit our demographic of youth adults aged 16-20 years old.
                </p>
            </div>

            {/* Map Section */}
            <div className="mapSection">
                <MapContainer
                    center={[47.5567, -122.3066]}
                    zoom={10}
                    style={{ height: '75vh', width: '100%' }}
                    maxBounds={kingCountyBounds}
                    maxBoundsViscosity={1.0}
                    minZoom={8}
                    maxZoom={15}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <MapViewController zipCode={zipCode} />

                    {filteredLocations.map((location, index) => (
                        <Marker key={index} position={location.coords}>
                            <Popup>
                            <div>
                                <h3>{location.resourceName}</h3>
                                <p><strong>Website:</strong> <a href={location.website} target="_blank" rel="noopener noreferrer">{location.website}</a></p>
                                <p><strong>Phone:</strong> {location.phoneNumber}</p>
                                <p><strong>Address:</strong> {location.address}</p>
                                <p><strong>Description:</strong> {location.description}</p>
                                <p>Want more details? <Link to={"/resources/" + location.resourceNum}>Click here.</Link></p>
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
    return(<MapPage />)
}