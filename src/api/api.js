import API from './apiService';

const api = new API()
export const getUser = async () => {
    try {
        const response = await api.get(`user/`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const signup = async (user) => {
    try {
        const response = await api.post(`user/auth`, user);
        return response;
    } catch (error) {
        console.error('Error during signup:', error);
        throw error;
    }
};

export const createPost = async (post) => {
    try {
        const response = await api.post(`posts`, post);
        return response?.data;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};

export const getPosts = async () => {
    try {
        const response = await api.get(`posts`);
        return response?.data;
    } catch (error) {
        throw error;
    }
};

export const ratePost = async (rating) => {
    try {
        const response = await api.post(`ratings`, rating);
        return response?.data;
    } catch (error) {
        console.error('Error rating post:', error);
        throw error;
    }
};

export const getRatings = async (postId) => {
    try {
        const response = await api.get(`ratings/${postId}`);
        return response?.data || [];
    } catch (error) {
        console.error('Error fetching ratings:', error);
        throw error;
    }
};
