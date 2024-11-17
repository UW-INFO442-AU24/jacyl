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
        "Bilingual Services", "All Age Groups", "Youth (Up to 24 Years Old)",
        "Case Management", "Crisis Hotline"];

    const [checkedTags, setCheckedTags] = useState([]);


    useEffect(() => {
      if (checkedTags != []){
        props.applyTagFilterCallback(checkedTags)
      }
    }, [checkedTags])
    
        // IGNORE
    // const handleTagFilterChange = (event) => {
    //     const value = event.target.value;
    //     const isChecked = event.target.checked;

    //     if (isChecked) {
    //         setCheckedTags([...checkedTags, value])
    //         props.applyTagFilterCallback(checkedTags)
    //     }
    //     else {
    //         setCheckedTags(checkedTags.filter((tag) => tag !== value));
    //         props.applyTagFilterCallback(checkedTags)
    //     }

    //     console.log("filter")
    //     console.log(event.target.checked)
    //     console.log(checkedTags)
    //     // setTagButtonLabel(event.target.value)
    // }

    const handleSearchChange = (event) => {
        // console.log(event.target.value)
        props.applySearchFilterCallback(event.target.value)
    }

    // Send the current clicked tags to the resourcelist for filtering
    const handleTagChange = (tag) => {
        if (checkedTags.includes(tag.target.value)) {
            setCheckedTags(checkedTags.filter((t) => t !== tag.target.value));
        } else {
            setCheckedTags([...checkedTags, tag.target.value]);
        }
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
                    <Form name="Search" id='Search' >
                        <Form.Control className='my-3 border border-secondary' size="lg" type="text" placeholder="Search..." onChange={handleSearchChange} />
                    </Form></div>

            </div>

            {/* FILTER STYLE HERE */}
            <div className="d-flex p-2 m-1 border border-dark my-3">
                <h2> Filter</h2>
                <div className="d-inline-flex flex-wrap p-2 m-2">
                    {tagButtons}
                </div>

                {/* <DropdownButton id="dropdown-item-button" variant="secondary" title={tagButtonLabel} className="m-1 py-2" size='lg'>
                        <Dropdown.Item as="button" variant="secondary" value="All" key="1" onClick={handleTagFilterClick}>All</Dropdown.Item>
                        {tagButtons}
                    </DropdownButton> */}
            </div>



        </div>
    )
}
