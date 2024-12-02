import client from './client';

export const register = async (data: any) => {
  const response = await client.post('/session/register', data);
  return response.data;
};

export const login = async (data: any) => {
  console.log(data);
  const response = await client.post('/session/login', data);
  return response.data;
};

export const logout = async () => {
  const response = await client.post('/session/logout');
  return response.data;
};