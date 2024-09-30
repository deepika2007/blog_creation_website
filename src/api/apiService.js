import { toast } from "react-toastify";
import axios from 'axios';
class API {
    baseUrl = 'http://localhost:3001/';
    constructor() { }
    /**
     * This method user for create a wrapper to get api call to add Authorization
     * header for logged in user
     * @param url get api url
     */

    async get(url) {
        try {
            const token = await this.getToken();
            const config = {
                headers: { Authorization: token }
            };
            const request = await axios.get(`${this.baseUrl}${url}`, config);
            if (request?.data?.success) {
                return request?.data;
            } else if (request.status === '401') {
                localStorage.removeItem('blog_token');
                return null;
            } else if (!request.success || !request) {
                toast.error(request?.message);
                return null;
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    /**
     * This method user for create a wrapper to post api call to
     * add Authorization header for logged in user
     * @param url get api url
     * @param body request body
     */

    async post(url, body) {
        const token = await this.getToken();
        try {
            const config = { headers: { Authorization: token } };
            const request = await axios.post(`${this.baseUrl}${url}`, body, config);
            if (request?.data?.success) {
                return request?.data;
            } else if (request.status === 401) {
                localStorage.removeItem('blog_token');
                return null;
            }
            return null;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Invalid data.');
            return null;
        }
    }

    /**
     * This method user for create a wrapper to put api
     * call to add Authorization header for logged in user
     * @param url get api url
     * @param body request body
     */

    async put(url, body) {
        const token = await this.getToken();
        try {
            const headers = new Headers();
            headers.set('Content-Type', 'application/json');
            headers.set('Authorization', token);
            headers.set('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
            const request = await fetch(`${this.baseUrl}${url}`, {
                method: 'PUT',
                headers,
                body: JSON.stringify(body),
            });
            const response = await request.json();
            if (response && !response.statusCode) {
                return response;
            } else if (response.statusCode === 401) {
                localStorage.removeItem('blog_token');
                return null;
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    /**
     * This method user for create a wrapper to
     * delete api call to add Authorization header for logged in user
     * @param url get api url
     * @param body request body
     */
    async delete(url, body) {
        const token = await this.getToken();
        try {
            const headers = new Headers();
            headers.set('Content-Type', 'application/json');
            headers.set('Authorization', token);
            headers.set('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
            const request = await fetch(`${this.baseUrl}${url}`, {
                method: 'DELETE',
                headers,
                body: JSON.stringify(body),
            });
            const response = await request.json();
            if (response && !response.statusCode) {
                return response;
            } else if (response.statusCode === 401) {
                localStorage.removeItem('blog_token');
                return null;
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    /**
     * This method user for create a wrapper to
     * post api call to add Authorization header for logged in user for upload
     * @param url get api url
     * @param body request body
     */
    async uploadPost(url, body) {
        const token = await this.getToken();
        try {
            const headers = new Headers();
            headers.set('Authorization', token);
            headers.set('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
            const request = await fetch(`${this.baseUrl}${url}`, {
                method: 'POST',
                headers,
                body,
            });
            const response = await request.json();
            if (response && !response.statusCode) {
                return response;
            } else if (response.statusCode === 401) {
                localStorage.removeItem('blog_token');
                return null;
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    /**
     * This method user for create a wrapper to
     * put api call to add Authorization header for logged in user for upload
     * @param url get api url
     * @param body request body
     */
    async uploadPut(url, body) {
        const token = await this.getToken();
        try {
            const headers = new Headers();
            headers.set('Authorization', token);
            headers.set('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
            const request = await fetch(`${this.baseUrl}${url}`, {
                method: 'PUT',
                headers,
                body,
            });
            const response = await request.json();
            if (response && !response.statusCode) {
                return response;
            } else if (response.statusCode === 401) {
                localStorage.removeItem('blog_token');
                return null;
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    /**
     * This method user for get token using cookies
     */
    async getToken() {
        const token = localStorage.getItem("blog_token");
        return token ? `${token}` : '';
    }
}

export default API;
