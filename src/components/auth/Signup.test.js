
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../api/api';
import SignupComponent from './Signup';
import userEvent from '@testing-library/user-event';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

// Mock the signup API call
jest.mock('../../api/api', () => ({
    signup: jest.fn(),
}));

describe('SignupComponent', () => {
    let navigate = jest.fn();

    beforeEach(() => {
        navigate = jest.fn();
        useNavigate.mockReturnValue(navigate);
    });

    test('renders SignupComponent and performs form submission', async () => {
        // Mock the API response
        signup.mockResolvedValue({
            success: true,
            token: 'mockToken',
        });

        // Render the SignupComponent
        render(<SignupComponent validateUser={jest.fn()} />);

        await act(async () => {
            expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();

            // Check for the Sign Up button
            expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
            expect(await screen.findByLabelText(/username/i)).toBeInTheDocument();
            expect(await screen.findByLabelText(/email/i)).toBeInTheDocument();
            expect(await screen.findByLabelText(/mobile number/i)).toBeInTheDocument();
            expect(await screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();

            // Simulate user input
            fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
            fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'testuser@example.com' } });
            fireEvent.change(screen.getByLabelText(/mobile number/i), { target: { value: '1234567890' } });
            fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

        })

        // Wait for the API call and navigation
        await waitFor(() => {
            expect(signup).toHaveBeenCalledWith({
                username: 'testuser',
                email_id: 'testuser@example.com',
                mobile_no: '1234567890',
            });

            // Check if the token is stored in localStorage
            expect(localStorage.getItem('blog_token')).toBe('mockToken');

        });
    });

    // test('displays validation errors for invalid input', async () => {
    //     // Render the SignupComponent
    //     render(<SignupComponent validateUser={jest.fn()} />);

    //     const submitButton = screen.getByRole('button', { name: /sign up/i });
    //     fireEvent.click(submitButton);
    //     // Submit the form without filling out fields
    //     // userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    //     // Check for validation errors
    //     expect(await screen.findByText('Username is required')).resolves.toBeInTheDocument();
    //     expect(await screen.findByText('Email is required')).resolves.toBeInTheDocument();
    //     expect(await screen.findByText('Mobile number is required')).resolves.toBeInTheDocument();
    // });

    test('displays validation errors for invalid email and mobile number', async () => {
        // Render the SignupComponent
        render(<SignupComponent validateUser={jest.fn()} />);

        // Simulate user input with invalid values
        // await act(async () => {
            await userEvent.type(screen.getByLabelText(/Username/i), 'testuser');
            await userEvent.type(screen.getByLabelText(/Email/i), 'invalid-email');
            await userEvent.type(screen.getByLabelText(/Mobile Number/i), '12345');

            // Submit the form
            await userEvent.click(screen.getByRole('button', { name: /sign up/i }));
        // });

        // Await validation errors
        await waitFor(() => {
            expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();

            // Use a function matcher to handle potential issues with the exact text
            expect(screen.getByText((content, element) =>
                content.startsWith('Mobile number') &&
                content.includes('10 digits')
            )).toBeInTheDocument();
        });
    })
});
