import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreatePostDialog from './CreatePost';
import { createPost } from '../../api/api';

// Mock the createPost API function
jest.mock('../../api/api', () => ({
    createPost: jest.fn(() => Promise.resolve()),
}));

describe('CreatePostDialog', () => {
    test('renders dialog when open prop is true', async () => {
        render(<CreatePostDialog open={true} handleClose={jest.fn()} />);
        await act(async () => {
            const createPostElements = screen.getAllByText('Create Post');
            expect(createPostElements[1]).toBeInTheDocument();
            expect(createPostElements.length).toBeGreaterThan(0);
        });
    });

    test('does not render dialog when open prop is false', async () => {
        render(<CreatePostDialog open={false} handleClose={jest.fn()} />);
        await act(async () => {
            expect(screen.queryByText('Create Post')).not.toBeInTheDocument();
        });
    });

    // test('shows validation errors when form is submitted with empty fields', async () => {
    //     render(<CreatePostDialog open={true} handleClose={jest.fn()} />);

    //     // Click the submit button without filling out the form
    //     const submitButton = screen.getByRole('button', { name: /Create Post/i });
    //     await act(async () => {
    //         fireEvent.click(submitButton);
    //     });

    //     await waitFor(() => {
    //         expect(screen.getByText('Title is required')).toBeInTheDocument();
    //         expect(screen.getByText('Content is required')).toBeInTheDocument();
    //     });
    // });

    test('submits the form with valid data and closes the dialog', async () => {
        const handleClose = jest.fn();
        render(<CreatePostDialog open={true} handleClose={handleClose} />);

        await act(async () => {
            await userEvent.type(screen.getByLabelText(/Title/i), 'Test Title');
            await userEvent.type(screen.getByLabelText(/Content/i), 'Test Content');
            const submitButton = screen.getByRole('button', { name: /Create Post/i });
            await userEvent.click(submitButton);
        });

        await waitFor(() => {
            expect(createPost).toHaveBeenCalledWith({ title: 'Test Title', content: 'Test Content' });
            expect(handleClose).toHaveBeenCalled();
        });
    });

    test('closes the dialog when cancel button is clicked', async () => {
        const handleClose = jest.fn();
        render(<CreatePostDialog open={true} handleClose={handleClose} />);

        await act(async () => {
            await userEvent.click(screen.getByText('Cancel'));
        });

        expect(handleClose).toHaveBeenCalled();
    });

    test('updates form fields correctly when typed into', async () => {
        render(<CreatePostDialog open={true} handleClose={jest.fn()} />);
        const titleInput = await screen.findByLabelText(/Title/i);
        const contentInput = await screen.findByLabelText(/Content/i);

        // Simulate user typing into the fields
        await act(async () => {
            await userEvent.type(titleInput, 'New Title');
            await userEvent.type(contentInput, 'New Content');
        });

        // Assert that the input values are updated correctly
        await waitFor(() => {
            expect(titleInput).toHaveValue('New Title');
            expect(contentInput).toHaveValue('New Content');
        });
    });
});
