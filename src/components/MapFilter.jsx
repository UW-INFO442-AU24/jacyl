import React from 'react';

const tags = [
    "Asian", "LGBTQ+", "Latino", "Bilingual Services", "Assessment Services",
    "Individual Therapy", "Group Therapy", "Family Therapy", "Dyadic Therapy",
    "Peer Support", "Psychiatric Provider", "School-Based Services",  "All Age Groups",
    "Youth (Up to 24 Years Old)", "Case Management", "Crisis Hotline"
];

const MapFilter = ({ selectedFilters, setSelectedFilters }) => {
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
                        <label key={tag} className="filter-checkbox mx-2">
                            <input
                                type="checkbox"
                                checked={selectedFilters.includes(tag)}
                                onChange={() => handleTagClick(tag)}
                            />
                            {tag}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MapFilter;
