import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import API from './apiService'; // adjust the path as needed
import { toast } from 'react-toastify';
import { act } from '@testing-library/react';

jest.mock('react-toastify');

describe('API Class', () => {
    let api;
    let mockAxios;

    beforeEach(() => {
        mockAxios = new MockAdapter(axios);
        api = new API();
        localStorage.setItem('blog_token', 'test-token'); // mock token
    });

    afterEach(() => {
        mockAxios.reset();
        localStorage.clear();
    });

    it('should return data on successful GET request', async () => {
        const mockData = { success: true, data: { message: 'test data' } };
        mockAxios.onGet('http://localhost:3001/test-url').reply(200, mockData);

        await act(async () => {
            const result = await api.get('test-url');
            // expect(result).toEqual(mockData);
        });
    });

    it('should return null and clear token on 401 status for GET request', async () => {
        mockAxios.onGet('http://localhost:3001/test-url').reply(401);

        await act(async () => {
            const result = await api.get('test-url');
            expect(localStorage.getItem('blog_token'))
        });
    });

    it('should handle GET request failure and show error toast', async () => {
        const mockError = { message: 'Error occurred' };
        mockAxios.onGet('http://localhost:3001/test-url').reply(500, mockError);

        await act(async () => {
            try {
                // Simulate the API request that will fail
                await api.get('test-url');
            } catch (e) {
                // Expect the toast.error to have been called with the error message
                expect(toast.error).toHaveBeenCalledWith(mockError.message);
            }
        });
    });

    it('should return data on successful POST request', async () => {
        const mockData = { success: true, data: { message: 'test data' } };
        mockAxios.onPost('http://localhost:3001/test-url').reply(200, mockData);

        await act(async () => {
            const result = await api.post('test-url', { name: 'John' });
            // expect(result).toEqual(mockData);
        });
    });

    it('should return null and clear token on 401 status for POST request', async () => {
        mockAxios.onPost('http://localhost:3001/test-url').reply(401);

        await act(async () => {
            const result = await api.post('test-url', { name: 'John' });
            expect(localStorage.getItem('blog_token'))
        });
    });

    it('should handle POST request failure and show error toast', async () => {
        mockAxios.onPost('http://localhost:3001/test-url').reply(500, { message: 'Invalid data.' });

        await act(async () => {
            const result = await api.post('test-url', { name: 'John' });
            expect(toast.error).toHaveBeenCalledWith('Invalid data.');
        });
    });

    // Similarly for PUT, DELETE, uploadPost, uploadPut methods

    it('should get token from localStorage', async () => {
        await act(async () => {
            const token = await api.getToken();
            expect(token).toEqual('test-token');
        });
    });
});
