import api from './api';

// eslint-disable-next-line
export async function placeOrder(body: any) {
   const response = await api.post('/order', body);

  return response.status;
}

export async function getOrders() {
  const response = await api.get('/order');

  return response.data;
}