import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; 
import { ResourceList } from './ResourceList';
import React from 'react';

test("validates ZIP code input format", async () => {
    render(<ResourceList/>);

    const searchInput = screen.getByPlaceholderText("Search");

    // const correctSearch = "Childhaven - Burien";
    // await userEvent.type(searchInput, correctSearch); 
    // expect(searchInput.value).toBe(validZipCode); 

    const emptySearch = "Nonsense123";
    await userEvent.clear(searchInput); 
    await userEvent.type(searchInput, emptySearch);
    expect(searchInput.value).toBe(emptySearch); 
    expect(screen.getAllByRole('carditem').length).toBe(0);
    
    // const filteredItems = screen.getAllByRole('carditem'); 
    
    // Check that the filtered list length is correct expect(filteredItems).toHaveLength(4); // e.g., expecting 4 items
});