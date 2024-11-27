import axios from 'axios';
const apiUrl = process.env.URL_BACKEND_LOCAL;

export const getProperties = async () => {
  const response = await axios.get(`${apiUrl}/properties`);
  return response.data;
};