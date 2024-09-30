import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import PostList from './PostList';
import { getPosts } from '../../api/api';
import CreatePostDialog from '../createPost/CreatePost';
import PostLayout from '../review/Review';
import RatingSection from '../rating/Rating';

// Mock the API call
jest.mock('../../api/api', () => ({
    getPosts: jest.fn(),
}));

describe('PostList Component', () => {
    beforeEach(() => {
        // Mock implementation of getPosts
        getPosts.mockResolvedValueOnce([
            { _id: '1', title: 'Post 1', content: 'Content 1', averageRating: 4 },
            { _id: '2', title: 'Post 2', content: 'Content 2', averageRating: 5 },
        ]);
    });

    test('renders PostList and fetches posts', async () => {
        render(<PostList />);

        // Ensure the "Create Post" button is present
        expect(screen.getByText('Create Post')).toBeInTheDocument();

        // Wait for posts to be rendered
        await waitFor(() => {
            expect(screen.getByText('Post 1')).toBeInTheDocument();
            expect(screen.getByText('Post 2')).toBeInTheDocument();
        });
    });
});
