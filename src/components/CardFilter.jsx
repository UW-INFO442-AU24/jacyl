import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';



export function CardFilter(props) {
    const [tagButtonLabel, setTagButtonLabel] = useState('All');
    
    const tags = ["Asian", "LGBTQ+", "Latino", "Bilingual Services",
        "Assessment Services", "Individual Therapy", 
        "Group Therapy", "Family Therapy", "Dyadic Therapy", "Peer Support", 
        "Psychiatric Provider", "School-Based Services",
        "Bilingual Services", "All Age Groups", "Youth (Up to 24 Years Old)",
        "Case Management", "Crisis Hotline"];

    const handleTagFilterClick = (event) => {
        console.log(event.target.value)
        props.applyTagFilterCallback(event.target.value)
        setTagButtonLabel(event.target.value)
    }

    const handleSearchChange = (event) => {
        console.log(event.target.value)
        props.applySearchFilterCallback(event.target.value)
    }

    const tagButtons = tags.map((tag, index) => {
        const tagButtonItem = <Dropdown.Item as="button" variant="secondary" value={tag} key={tag} onClick={handleTagFilterClick}>{tag}</Dropdown.Item>
        return tagButtonItem;
    });



    return (
        <div>
            {/* SEARCH/FILTER FORMAT STYLE HERE */}
            <div className="d-flex bd-highlight">
                {/* SEARCH BAR STYLE HERE */}
                <div className="p-2 flex-grow-1 lg">
                    <Form name="Search" id='Search'>
                        <Form.Control className='my-3 border border-secondary' size="lg" type="text" placeholder="Search..." onChange={handleSearchChange} />
                    </Form></div>
                
                {/* FILTER STYLE HERE */}
                <div className="p-2 m-1">
                    <DropdownButton id="dropdown-item-button" variant="secondary" title={tagButtonLabel} className="m-1 py-2" size='lg'>
                        <Dropdown.Item as="button" variant="secondary" value="All" key="1" onClick={handleTagFilterClick}>All</Dropdown.Item>
                        {tagButtons}
                    </DropdownButton></div>
            </div>


        </div>
    )
}
