
import client from './client';

export const getLandingPage = async () => {
  const response = await client.get('/properties');
  return response.data;
};

export const getFavoriteProperties = async (id: string) => {
  const response = await client.get('/properties/favorites');
  return response.data;
}

export const getSeachedProperties = async ({ contract, type, address }: { contract: string; type: string; address: string }) => {
  const response = await client.post('/properties/search', { contract, type, address });
  return response.data;
}