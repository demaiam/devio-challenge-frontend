import api from './api';

export async function getProducts() {
  const url = import.meta.env.VITE_API_URL;

  const response = await api.get(`${url}/products`);

  return response.data;
}