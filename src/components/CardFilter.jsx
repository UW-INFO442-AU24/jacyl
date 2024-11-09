import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';



export function CardFilter(props) {
    const [tagButtonLabel, setTagButtonLabel] = useState('All');
    const [tagValue, setTagValue] = useState('')

    const tags = ["Tag1", "Tag2", "Tag3", "Tag4"];

    const handleFilterClick = (event) => {
        console.log(event.target.value)
        setTagButtonLabel(event.target.value)
    }

    const handleSearchChange = (event) => {
        console.log(event.target.value)
    }

    const tagButtons = tags.map((tag, index) => {
        const tagButtonItem = <Dropdown.Item as="button" variant="secondary" value={tag} key={tag} onClick={handleFilterClick}>{tag}</Dropdown.Item>
        return tagButtonItem;
    });



    return (
        <div>
            <h1>CardFilter</h1>

            <div className="d-flex bd-highlight">
                <div className="p-2 flex-grow-1">
                    <Form name="Search" id='Search'>
                        <Form.Control className='my-3 border border-secondary' size="lg" type="text" placeholder="Search..." onChange={handleSearchChange} />
                    </Form></div>
                <div className="p-2">
                    <DropdownButton id="dropdown-item-button" variant="secondary" title={tagButtonLabel} className="m-1 py-2" size='lg'>
                        <Dropdown.Item as="button" variant="secondary" value="All" key="1" onClick={handleFilterClick}>All</Dropdown.Item>
                        {tagButtons}
                    </DropdownButton></div>
            </div>


        </div>
    )
}
