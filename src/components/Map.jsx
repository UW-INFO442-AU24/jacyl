import React from 'react';
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { UseMapFunctions, MapViewController } from './MapComponent';
import MapFilter from './MapFilter';
import { useState } from "react";

// Map page component 
const MapPage = ({user, savedResources, saveResource, deleteResource}) => {
    const [confirm, setConfirm] = useState(""); //not sure if confirmation is possible... without making marker a component

    // Extracts map functions from custom hook
    const {
        zipCodeInput,
        handleZipCodeChange,
        handleZipCodeSubmit,
        zipCode,
        filteredLocations,
        selectedFilters,
        setSelectedFilters,
    } = UseMapFunctions();

    // Defines King County bounds for map view
    const kingCountyBounds = [
        [46.972060, -122.750396],
        [49.088447, -121.084384],
    ];

    // Map page structure
    return (
        <div className="mapContainer">
            {/* ZIP code search and filters */}
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

            {/* Map section with Leaflet*/}
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

                    {/* Component for controlling map view based on ZIP code */}
                    <MapViewController zipCode={zipCode} />
                    
                    {/* Renders markers for filtered locations */}
                    {filteredLocations.map((location, index) => {

                    let saveButton = ""
                    if (user && savedResources) {
                        saveButton = <button className="btn btn-success" onClick={() => {saveResource(location.resourceNum); setConfirm(<p className="mt-2">"{location.resourceName}" has been successfully added to your <Link to="/user">profile</Link>.</p>)}}>Save Resource</button>
                        savedResources.forEach((resource) => {
                            if (resource.resourceNum == location.resourceNum) {
                                saveButton = <button className="btn btn-danger" onClick={() => {deleteResource(location.resourceNum); setConfirm(<p className="mt-2">"{location.resourceName}" has been successfully removed from your <Link to="/user">profile</Link>.</p>)}}>Delete Saved Resource</button>
                                //if wanted faster performance, use break + for loop so it doesn't loop through everything
                            }
                        });
                    }
                    return (
                    <Marker key={index} position={location.coords}>
                        <Popup>
                        <div>
                            <h3>{location.resourceName}</h3>
                            <p><strong>Website:</strong> <a href={location.website} target="_blank" rel="noopener noreferrer">{location.website}</a></p>
                            <p><strong>Phone:</strong> {location.phoneNumber}</p>
                            <p><strong>Address:</strong> {location.address}</p>
                            {/* <p><strong>Description:</strong> {location.description}</p> */}
                            <p>Want more details? <Link to={"/resources/" + location.resourceNum}>Click here.</Link></p>
                            {user && saveButton}
                        </div>
                        </Popup>
                    </Marker>
                    )
                    })}
            </MapContainer>
            {confirm}
        </div>
    </div>
    );
};

// Exports map page to app with passed properties
export function Map({user, savedResources, saveResource, deleteResource}) {
    return(<MapPage user={user} saveResource={saveResource} deleteResource={deleteResource} savedResources={savedResources}/>)
}