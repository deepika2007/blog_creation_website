import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import RatingSection from './Rating';
import { ratePost } from '../../api/api';

// Mock the ratePost function
jest.mock('../../api/api', () => ({
    ratePost: jest.fn(),
}));

describe('RatingSection Component', () => {
    let handleClose;

    beforeEach(() => {
        handleClose = jest.fn();
    });

    test('renders RatingSection with dialog open', () => {
        render(<RatingSection postId="123" isOpen={true} handleClose={handleClose} />);

        // Check if the dialog is open
        expect(screen.getByText(/Add rating/i)).toBeInTheDocument();
        expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
        expect(screen.getByText(/Submit/i)).toBeInTheDocument();
    });

    test('handles rating selection and submit', async () => {
        render(<RatingSection postId="123" isOpen={true} handleClose={handleClose} />);

        // Mock the ratePost function to resolve immediately
        ratePost.mockResolvedValueOnce({});
        
        // Simulate Submit button click
        fireEvent.click(screen.getByText('Submit'));

        // Verify that ratePost was called with the correct arguments
        await waitFor(() => {
            expect(ratePost).toHaveBeenCalledWith({
                post_id: '123',
                rating: expect.any(Number), // Replace with specific number if needed
            });

            // Verify that handleClose is called after submit
            expect(handleClose).toHaveBeenCalled();
        });
    });

    test('calls handleClose when Cancel button is clicked', () => {
        render(<RatingSection postId="123" isOpen={true} handleClose={handleClose} />);

        // Click the Cancel button
        fireEvent.click(screen.getByText(/Cancel/i));

        // Verify that handleClose was called
        expect(handleClose).toHaveBeenCalled();
    });

    test('does not render dialog when isOpen is false', () => {
        render(<RatingSection postId="123" isOpen={false} handleClose={handleClose} />);

        // The dialog should not be in the document
        expect(screen.queryByRole('dialog')).toBeNull();
    });
});
