import { toast } from 'react-toastify';

const APIUtils = {
  handleRequest: async (promise) => {
    try {
      return await promise;
    } catch (error) {
      const errorMessage = error.message || 'An error occurred';
      toast.error(errorMessage);
      throw error;
    }
  },

  // Other utility functions can be defined here
};

export default APIUtils;