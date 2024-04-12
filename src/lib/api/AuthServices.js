import axios from 'axios';

const AuthService = {
  login: async (credentials) => {
    try {
      const response = await axios.post('/api/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  },

};

export default AuthService;
