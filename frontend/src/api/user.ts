import client from "./client";

export const getFavorites = async () => {
  const response = await client.get("/favorites");
  return response.data;
}

export const addFavorite = async (url: string) => {
  const response = await client.post("/favorites", { url });
  return response.data;
}

export const getSearchHistory = async () => {
  const response = await client.get("/search-history");
  return response.data;
}