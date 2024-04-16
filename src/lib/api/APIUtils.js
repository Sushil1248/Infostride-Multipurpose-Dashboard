import { toast } from 'react-toastify';

const APIUtils = {
  handleRequest: async (promise) => {
    try {
      return await promise;
    } catch (error) {
      const errorMessage = error.message.message || 'An error occurred';
      if (error.status === 'error' || error.status === 401) {
        toast.error(errorMessage);
      } else if (error.status === 'restrict' || error.status === 405) {
        const toast_message = error.message.toast_message || 'An error occurred';
        toast.error(toast_message, {
          progress: undefined,
          theme: "dark",
        });
      }
      else {
        toast.error(errorMessage);
      }
      return error;
    }
  },

  // Other utility functions can be defined here
};

export default APIUtils;