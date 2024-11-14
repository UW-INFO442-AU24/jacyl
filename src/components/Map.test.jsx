import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; 
import Map from './Map';

test("validates ZIP code input format", async () => {
    render(<Map/>);

    const zipInput = screen.getByPlaceholderText("Enter ZIP code");

    const validZipCode = "98011";
    await userEvent.type(zipInput, validZipCode); 
    expect(zipInput.value).toBe(validZipCode); 

    const invalidZipCode = "97011";
    await userEvent.clear(zipInput); 
    await userEvent.type(zipInput, invalidZipCode);
    expect(zipInput.value).toBe(invalidZipCode); 
});