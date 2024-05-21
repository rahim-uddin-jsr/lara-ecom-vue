// Import Axios
import axios from 'axios';

// Set the base URL for your API
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

// Create an Axios instance with default configuration
const api = axios.create();

// Add a request interceptor to include the token in the headers
api.interceptors.request.use(
    (config) => {
        // Retrieve the token from local storage or wherever you store it
        const token = localStorage.getItem('token');

        // If a token exists, set it in the Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    });

// Export the configured Axios instance for use in your application
export default api;
