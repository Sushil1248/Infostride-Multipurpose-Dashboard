import axios from 'axios';

import { toast } from 'react-toastify';
import { GET_PROFILE, CREATE_OR_EDIT_USER, GET_USER_LISTING, GET_WEBSITE_LISTING, CREATE_OR_EDIT_WEBSITE, GET_WEBSITE_LISTING_WITH_MENUS } from './endpoints';


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Function to retrieve the bearer token 
const getBearerToken = () => {
    const token = localStorage.getItem('token');
    return token;
};

// Set authorization header for all requests
api.interceptors.request.use(
    (config) => {
        const token = getBearerToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            const error = new Error('Session Expired or You have been logged out! Please try logging in again.');
            toast.info(error.message);
            return Promise.reject(error);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

const AuthenticatedService = {
    getProfile: async () => {
        try {
            const response = await api.get(GET_PROFILE);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    createUser: async (user) => {
        try {
            const response = await api.post(CREATE_OR_EDIT_USER, user);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    getUserListing: async () => {
        try {
            const response = await api.get(GET_USER_LISTING);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    createWebsite: async (website) => {
        try {
            const response = await api.post(CREATE_OR_EDIT_WEBSITE, website);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    getWebsiteListing: async () => {
        try {
            const response = await api.get(GET_WEBSITE_LISTING);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    getWebsiteListingWithMenus: async () => {
        try {
            const response = await api.get(GET_WEBSITE_LISTING_WITH_MENUS);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    
};

export default AuthenticatedService;
