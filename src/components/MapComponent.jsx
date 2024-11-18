import React, { useState, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import resourcesData from '../data/resources1.json';
import zipCodesData from '../data/KingCountyZipCodes.json';

// Hook function for map components states and functions
const UseMapFunctions = () => {
    // State variables for user inputs and validation
    const [zipCodeInput, setZipCodeInput] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [selectedFilters, setSelectedFilters] = useState([]);

    // Indexes resources to ensure location data is correct for popups
    const resourcesDataWithNum = resourcesData.resources.map((resource, index) => ({
        ...resource,
        resourceNum: index,
    }));

    // Filters resrouces based on selected filters and maps each resource marker properties
    const filteredLocations = resourcesDataWithNum
        .filter((resource) => {
            const resourceTags = resource.properties.serviceType || [];
            return selectedFilters.every((filter) => resourceTags.includes(filter));
        })
        .map((resource) => ({
            coords: resource.geometry.coordinates,
            resourceName: resource.properties.resourceName,
            website: resource.properties.website,
            phoneNumber: resource.properties.phoneNumber,
            address: resource.properties.address,
            description: resource.properties.description,
            resourceNum: resource.resourceNum,
        }));

    // Grabs King County ZIP code data
    const handleZipCodeSubmit = () => setZipCode(zipCodeInput);

    // Handles search input restrictions, formats as #####-#### if user inputs a nine digit ZIP code
    const handleZipCodeChange = (e) => {
        let value = e.target.value.replace(/[^\d]/g, ''); // Only allows digit inputs
        if (value.length > 5 && value[5] !== '-') {
            value = value.slice(0, 5) + '-' + value.slice(5);
        }
        setZipCodeInput(value);
    };

    return {
        zipCodeInput,
        setZipCodeInput,
        zipCode,
        handleZipCodeChange,
        handleZipCodeSubmit,
        filteredLocations,
        selectedFilters,
        setSelectedFilters,
    };
};

// Function to change map view based on user input
const MapViewController = ({ zipCode }) => {
    const map = useMap(); // Access map
    const zipCodes = zipCodesData.features; // Load King County ZIP codes data

    // Grabs only first five digits of entered ZIP code and checks if it is a King County ZIP. 
    useEffect(() => {
        if (zipCode) {
            const zipCodeFive = zipCode.slice(0, 5);
            const zipCodePoint = zipCodes.find((zip) => zip.properties.ZIPCODE === zipCodeFive);

            // If the ZIP code is in King County, change map view to ZIP code coordinates.
            if (zipCodePoint) {
                const zipLatLng = L.latLng(zipCodePoint.geometry.coordinates[1], zipCodePoint.geometry.coordinates[0]);
                map.setView(zipLatLng, 13);
            }
        }
    }, [zipCode, zipCodes, map]);

    return null; // Only modifies map view
};

// Export hook function and map view controllor for map page
export { UseMapFunctions, MapViewController };
