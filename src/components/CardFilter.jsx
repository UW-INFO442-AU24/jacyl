import { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';



export function CardFilter(props) {
    // const [tagButtonLabel, setTagButtonLabel] = useState('All');

    const tagsList = ["Asian", "LGBTQ+", "Latino", "Bilingual Services",
        "Assessment Services", "Individual Therapy",
        "Group Therapy", "Family Therapy", "Dyadic Therapy", "Peer Support",
        "Psychiatric Provider", "School-Based Services",
        "All Age Groups", "Youth (Up to 24 Years Old)",
        "Case Management", "Crisis Hotline"];

    const [checkedTags, setCheckedTags] = useState([]);
    const [searchInput, setSearchInput] = useState("")


    // Runs whenever `checkedTags` or `searchInput` changes.
    // Sends the current filters (tags or search input) to the parent component through callbacks.
    useEffect(() => {
      if (checkedTags != []){
        props.applyTagFilterCallback(checkedTags)
      }
      if (searchInput.length > 0)
        props.applySearchFilterCallback(searchInput)
    }, [checkedTags, searchInput])

    // Updates the search input and sends it to the parent component for filtering.
    const handleSearchChange = (event) => {
        setSearchInput(event.target.value)
        props.applySearchFilterCallback(event.target.value);
    }

    const handleSubmission = (event) => {
        event.preventDefault();
    }

    // Send the current clicked tags to the resourcelist for filtering
    const handleTagChange = (tag) => {
        if (checkedTags.includes(tag.target.value)) {
            setCheckedTags(checkedTags.filter((t) => t !== tag.target.value));
        } else {
            setCheckedTags([...checkedTags, tag.target.value]);
        }
        // Toggles the selected state of a tag and updates with the new list.
        props.applyTagFilterCallback(checkedTags)
    };
    
    const tagButtons = tagsList.map((tag, index) => {
        // const tagButtonItem = <Dropdown.Item as="button" variant="secondary" value={tag} key={tag} onChange={handleTagFilterChange}>{tag}</Dropdown.Item>
        const tagButtonCheck =
            <Form.Check
                value={tag}
                type='checkbox'
                id={tag}
                key={index}
                label={`  ${tag} `}
                className='m-2'
                onChange={handleTagChange}
            />

        return tagButtonCheck;

    });



    return (
        <div>
            {/* SEARCH/FILTER FORMAT STYLE HERE */}
            <div className="d-flex bd-highlight">
                {/* SEARCH BAR STYLE HERE */}
                <div className="p-2 flex-grow-1 lg">
                    <Form name="Search" id='Search' onSubmit={handleSubmission} className="resourceInputContainer">
                        <Form.Control className='my-3 border border-secondary resourceInput' size="lg" type="text" placeholder="Search..." onChange={handleSearchChange} value={props.searchFilter} aria-label="search"/>
                        <button className="resourceSearchButton">Search</button>
                    </Form>
                </div>
            </div>

            {/* FILTER STYLE HERE */}
            <div className="d-flex p-2 m-1 border border-dark my-3">
                <h2> Filter</h2>
                <div className="d-inline-flex flex-wrap p-2 m-2">
                    {tagButtons}
                </div>
            </div>



        </div>
    )
}
