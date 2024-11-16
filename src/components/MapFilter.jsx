import React, { useEffect, useState } from 'react';

const tags = ["Asian", "LGBTQ+", "Latino", "Bilingual Services",
    "Assessment Services", "Individual Therapy", 
    "Group Therapy", "Family Therapy", "Dyadic Therapy", "Peer Support", 
    "Psychiatric Provider", "School-Based Services",
    "Bilingual Services", "All Age Groups", "Youth (Up to 24 Years Old)",
    "Case Management", "Crisis Hotline"
];

function mapFilter({ selectedFilters, setSelectedFilters }) {
   // const [selectedFilters, setSelectedFilters] = useState([]);
    const handleTagClick = (tag) => {
        if (selectedTags.includes(tag)) {
          setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else {
          setSelectedTags([...selectedTags, tag]);
        }
      };

    useEffect(() => {
        if (selectedTags.length === 0) {
            setFilteredTags(tags);
        } else {
            setFilteredTags(
            tags.filter((tag) => selectedTags.includes(tag))
            );
        }
        }, [selectedTags]);

    return (
        <div>
          {}
          <div className="filter-section">
            {tags.map((tag) => (
              <label key={tag} className="filter-checkbox">
              <input
                type="checkbox"
                checked={selectedFilters.includes(tag)}
                onChange={() => handleCheckboxChange(tag)}
              />
              {tag}
            </label>
          ))}
        </div>
  
          {}
          {/* <div className="filtered-results">
            {filteredTags.map((tag) => (
              <div key={tag} className="filtered-item">
                {tag}
              </div>
            ))}
          </div> */}
        </div>
      );
    };
    
export default mapFilter;