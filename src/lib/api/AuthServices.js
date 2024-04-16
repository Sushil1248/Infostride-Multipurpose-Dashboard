import axios from 'axios';

import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from './endpoints';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const AuthService = {
  login: async (credentials) => {
    try {
      const response = await api.post(LOGIN_ENDPOINT, credentials);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  register: async (credentials) => {
    try {
      const response = await api.post(REGISTER_ENDPOINT, credentials);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export default AuthService;