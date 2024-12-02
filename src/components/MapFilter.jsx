// File contains the filter object for the map component, which filters
// The map pins by the categories they contain

import React from 'react';

// static array of all of our resource tags
const tags = [
    "Asian", "LGBTQ+", "Latino", "Bilingual Services", "Assessment Services",
    "Individual Therapy", "Group Therapy", "Family Therapy", "Dyadic Therapy",
    "Peer Support", "Psychiatric Provider", "School-Based Services",  "All Age Groups",
    "Youth (Up to 24 Years Old)", "Case Management", "Crisis Hotline"
];

const MapFilter = ({ selectedFilters, setSelectedFilters }) => {
    // Toggles the inclusion of a tag in the 'selectedFilters' array. If the tag is already selected, it removes it by filtering it out.
    // Otherwise, it adds the tag to the array
    const handleTagClick = (tag) => {
        if (selectedFilters.includes(tag)) {
            setSelectedFilters(selectedFilters.filter((t) => t !== tag));
        } else {
            setSelectedFilters([...selectedFilters, tag]);
        }
    };

    return (
        <div className="filter-section">
            <div className="d-flex p-2 m-1 border border-dark my-3">
                <h2> Filter</h2>
                <div className="d-inline-flex flex-wrap p-2 m-2">
                    {tags.map((tag) => (
                        <label key={tag} className="filter-checkbox mx-2 mapFilterBoxes">
                            <input
                                type="checkbox"
                                className="checkboxInput"
                                // Sets the checkbox state based on whether the tag is in the 'selectedFilters' array.
                                checked={selectedFilters.includes(tag)}
                                onChange={() => handleTagClick(tag)}
                            />
                            <span className="checkboxLabel">{tag}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MapFilter;
