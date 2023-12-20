import useAsync from '../useAsync';

import * as productsApi from '../../services/productsApi';

export default function useProductsApi() {
  const {
    data: products,
    act: getProducts
  } = useAsync(productsApi.getProducts, false);

  return {
    products,
    getProducts,
  };
}