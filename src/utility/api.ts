import axios from 'axios';
import { mockData } from './mockData';
// import { toast } from 'react-toastify';

const API_URL = 'https://simple-pexels-proxy.onrender.com';

export const fetchImages = async (query: string, perPage: number, page: number) => {
  try {
    const response = await axios.get(`${API_URL}/search?`, {
      params: {
        query,
        per_page: perPage,
        page,
      },
    });
    return response.data;
    // return mockData;
  } catch (error) {
    // toast.error('Error fetching images. Please try again later.');
    console.error('Error fetching images:', error);
    throw error;
  }
};

