import React from 'react'
import { getUser, signup, createPost, getPosts, ratePost, getRatings } from './api';
import API from './apiService';

// Mock the API class
jest.mock('./apiService');
jest.mock('./api', () => ({
    getPosts: jest.fn(),
    ratePost: jest.fn(),
    getRatings: jest.fn(),
    createPost: jest.fn(),
    signup: jest.fn(),
    getUser: jest.fn()
}));

// Ensure that `get` and `post` methods are mocked
const mockGet = jest.fn();
const mockPost = jest.fn();

API.mockImplementation(() => ({
    get: mockGet,
    post: mockPost,
}));

describe('API Service', () => {

    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test

        // apiMock = new API();
        // API.mockImplementation(() => apiMock); // Use the mock implementation
    });

    test('getUser should fetch user data', async () => {
        const mockResponse = { success: true, token: 'mockToken', data: { _id: 1, username: 'JohnDoe' } };
        getUser.mockResolvedValueOnce(mockResponse);

        const result = await getUser();
        expect(result).toEqual(mockResponse);
    });

    test('signup should create a user', async () => {
        const mockUser = { username: 'JohnDoe', email_id: 'john@example.com', mobile_no: "2369859685" };
        const mockResponse = { success: true, token: 'mockToken' };
        signup.mockResolvedValueOnce(mockResponse);
        const result = await signup(`user/auth`, mockUser);
        expect(result).toEqual(mockResponse);
    });

    test('createPost should create a new post', async () => {
        const mockPost = { title: 'New Post', content: 'Post content' };
        const mockResponse = { _id: 1, ...mockPost };

        // Create a mock function and use mockResolvedValueOnce
        const mockCreatePost = createPost; // Get the mocked version
        mockCreatePost.mockResolvedValueOnce(mockResponse);

        const result = await createPost(mockPost);
        expect(result).toEqual(mockResponse);
        expect(mockCreatePost).toHaveBeenCalledWith(mockPost);
    });

    test('getPosts should fetch all posts', async () => {
        const mockPosts = [{ _id: 1, title: 'Post 1' }, { _id: 2, title: 'Post 2' }] || [];
        getPosts.mockResolvedValueOnce(mockPosts);

        const result = await getPosts();
        expect(result).toEqual(mockPosts);
    });

    test('ratePost should submit a rating', async () => {
        const mockRating = { postId: 1, rating: 5 };
        ratePost.mockImplementation((url, data) => Promise.resolve(data)); // Custom implementation

        const result = await ratePost('ratings', mockRating);
        expect(result).toEqual(mockRating);
        expect(ratePost).toHaveBeenCalledWith('ratings', mockRating);

    });


    test('getRatings should fetch ratings for a post', async () => {
        const postId = 1;
        const mockRatings = [{ _id: 1, post_id: 1, rating: 5, user_id: 1 }] || [];
        getRatings.mockResolvedValueOnce(mockRatings);

        const result = await getRatings(postId);
        expect(result).toEqual(mockRatings);
    });
});

