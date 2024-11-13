import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; 
import { act } from 'react-dom/test-utils';

import { Map } from "./src/components/Map";
import { Navbar } from "./src/components/Navbar";
import { Home } from "./src/components/Home"
import { MemoryRouter } from 'react-router';
import { BrowserRouter } from "react-router-dom";
import fetchMock from 'jest-fetch-mock';



require('jest-fetch-mock').enableMocks()

// test("validates ZIP code input format", async () => {
//     render(<MemoryRouter><Map/></MemoryRouter>);

//     const zipInput = screen.getByPlaceholderText("Enter ZIP code");

//     const validZipCode = "98011";
//     await userEvent.type(zipInput, validZipCode); 
//     expect(zipInput.value).toBe(validZipCode); 

//     const invalidZipCode = "97011";
//     await userEvent.clear(zipInput); 
//     await userEvent.type(zipInput, invalidZipCode);
//     expect(zipInput.value).toBe(validZipCode); 
// });

test("The 'Home' component renders", () => {
    render(
    <BrowserRouter>
        <Home />
    </BrowserRouter>);
})

test("1+1", async() => {
    expect(1 + 1).toBe(2);
}) 

test("2+2", async() => {
    expect(2 + 2).toBe(4);
}) 

