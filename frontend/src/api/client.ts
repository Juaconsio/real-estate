import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

const client = axios.create({
  baseURL: apiUrl,
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized');
      window.location.href = '/ingresa';
    }
    console.error('Axios error:', error);
    return Promise.reject(error);
  }
);
client.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios error:', error);
    return Promise.reject(error);
  }
);

export default client;
