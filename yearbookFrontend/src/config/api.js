// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://2k25yearbook-production.up.railway.app';

export const API_ENDPOINTS = {
  students: `${API_BASE_URL}/students/`,
  mugshots: `${API_BASE_URL}/mugshots/`,
  gallery: `${API_BASE_URL}/gallery/`,
  homepageSlides: `${API_BASE_URL}/homepage-slides/`,
  images: `${API_BASE_URL}/images/`,
};

// API utility functions
export const apiRequest = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Environment checks
export const isDevelopment = import.meta.env.VITE_ENVIRONMENT === 'development';
export const isProduction = import.meta.env.VITE_ENVIRONMENT === 'production';

export default {
  API_ENDPOINTS,
  apiRequest,
  isDevelopment,
  isProduction,
};
