// import React from 'react';
// import { render, screen, waitFor } from '@testing-library/react';
// import App from './App';
// import * as api from './api/api';
// import '@testing-library/jest-dom';

// // Mock the API and localStorage
// jest.mock('./api/api');
// Storage.prototype.getItem = jest.fn();
// Storage.prototype.setItem = jest.fn();

// describe('App Component', () => {
//   beforeEach(() => {
//     // Clear any previous localStorage mocks
//     localStorage.getItem.mockClear();
//     localStorage.setItem.mockClear();
//   });

//   it('should render the SignupComponent when there is no token', async () => {
//     localStorage.getItem.mockReturnValueOnce(null); // Simulate no token

//     render(<App />);

//     // Check if SignupComponent (login page) is rendered
//     const signupButton = screen.getByRole('button', { name: /sign up/i });
//     expect(signupButton).toBeInTheDocument();
//     // await expect(await screen.getByText(/sign up/i)).toBeInTheDocument(); // Adjust based on actual text in SignupComponent
//   });

//   // it('should navigate to the PostList when token exists', async () => {
//   //   localStorage.getItem.mockReturnValueOnce('fake_token'); // Simulate token

//   //   render(<App />);

//   //   // Expect PostList (main content) to render
//   //   await waitFor(() => {
//   //     const createPostButton = screen.getByRole('button', { name: /post list/i });
//   //     expect(createPostButton).toBeInTheDocument();
//   //   });
//   //   // expect(await screen.findByText(/post list/i)).toBeInTheDocument(); // Adjust based on actual content of PostList
//   // });

//   it('should validate the user on initial render and update localStorage', async () => {
//     const mockResponse = { token: 'new_token' };
//     api.getUser.mockResolvedValueOnce(mockResponse); // Mock API response

//     render(<App />);

//     // Check that the validateUser function sets the token in localStorage
//     await waitFor(() => {
//       expect(localStorage.setItem).toHaveBeenCalledWith('blog_token', 'new_token');
//     });
//   });

//   it('should redirect to login if no valid token is present', () => {
//     localStorage.getItem.mockReturnValueOnce(null); // Simulate no token

//     render(<App />);

//     // Check if user is redirected to login page
//     const signupForm = screen.getByRole('button', { name: /sign up/i });
//     expect(signupForm).toBeInTheDocument();
//   });
// });



import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { getUser,getPosts } from './api/api';
import '@testing-library/jest-dom';

// Mock the getUser API call
jest.mock('./api/api', () => ({
  getUser: jest.fn(),
  getPosts: jest.fn(),
}));

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('App Component', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });
  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test to prevent state leakage
  });

  test('renders the login page when no token is present', async () => {

    render(<App />);
    const signupButton = await screen.findByRole('button', { name: /sign up/i });
    expect(signupButton).toBeInTheDocument();

  });

  test('renders PostList when token is present', async () => {
    const mockPosts = [{ _id: 1, title: 'Post 1' }, { _id: 2, title: 'Post 2' }];
    getPosts.mockResolvedValueOnce(mockPosts);
    localStorageMock.setItem('blog_token', 'valid_token');

    render(<App />);
    const postListElement = await screen.findByTestId('post-list');
    expect(postListElement).toBeInTheDocument();

  });

  test('calls validateUser on load and updates localStorage with token', async () => {
    getUser.mockResolvedValue({ token: 'new_token' });

    render(<App />);
    await waitFor(() => expect(getUser).toHaveBeenCalledTimes(1), { timeout: 3000 });
    expect(localStorageMock.setItem).toHaveBeenCalledWith('blog_token', 'new_token');
  });

  test('navigates to login if trying to access a protected route without token', async () => {
    render(<App />);
    const signupButton = await screen.findByRole('button', { name: /sign up/i });
    expect(signupButton).toBeInTheDocument();
  });
});
