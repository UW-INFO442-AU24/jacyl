import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'; 
import { act } from 'react-dom/test-utils';

import { Map } from "./src/components/Map";
import { Navbar } from "./src/components/Navbar";
import { Home } from "./src/components/Home";
// import { App } from "./components/App";
import { MemoryRouter } from 'react-router';
import { BrowserRouter } from "react-router-dom";
import fetchMock from 'jest-fetch-mock';



require('jest-fetch-mock').enableMocks()

test("The 'Home' component renders", () => {
    render(
    <BrowserRouter>
        <Home />
    </BrowserRouter>);
})

test("The 'Home' component contains navigaion to Map of Resources", () => {
    render(<BrowserRouter><Home /></BrowserRouter>);
    const linkElement = screen.getByRole('link', { name: /Connect with Us\./i });
    expect(linkElement).toBeInTheDocument();
})