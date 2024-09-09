import axios from 'axios';

// Cloudinary configuration
const CLOUDINARY_CLOUD_NAME = 'dlxro8gpi';
const CLOUDINARY_API_KEY = '544576467443672';
const CLOUDINARY_API_SECRET = 'W84-pPY1AoFfy4alARl6vv_fcq4'; // This is exposed on frontend only for local testing
const CLOUDINARY_DESTROY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/destroy`;

// Function to generate signature for image deletion (Frontend Only for Testing)
// Function to request deletion signature from the backend
const generateDeletionSignature = async (publicId) => {
    try {
        const timestamp = Math.floor(Date.now() / 1000); // Current timestamp
        // Send a request to your backend to generate the signature
        const response = await axios.post(`${import.meta.env.VITE_API_URL}common/sign/public-id`, { publicId, timestamp });
        const { signature } = response.data; // Assuming the backend returns a signature and timestamp
        return { signature, timestamp }; // Return signature and timestamp
    } catch (error) {
        console.error('Error generating deletion signature:', error);
        return null; // Handle error appropriately
    }
};

// Function to upload an image to Cloudinary
export const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'sushil'); // Your upload preset

    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data.secure_url; // Return the URL of the uploaded image
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
};

// Function to delete an image from Cloudinary
export const deleteImageFromCloudinary = async (publicId) => {
    try {
        // Generate signature and timestamp locally (only for testing)
        const { signature, timestamp } = await generateDeletionSignature(publicId);

        // Create FormData to send to Cloudinary
        const formData = new FormData();
        formData.append('public_id', publicId);
        formData.append('api_key', CLOUDINARY_API_KEY);
        formData.append('timestamp', timestamp);
        formData.append('signature', signature);

        // Send the request to Cloudinary to delete the image
        const response = await axios.post(CLOUDINARY_DESTROY_URL, formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        return response.data;
    } catch (error) {
        console.error('Error deleting image:', error);
        return null;
    }
};