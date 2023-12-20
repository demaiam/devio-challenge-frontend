import useAsync from '../useAsync';

import * as orderApi from '../../services/orderApi';

export default function useGetOrderApi() {
  const {
    data: orders,
    act: getOrders
  } = useAsync(orderApi.getOrders, false);

  return {
    orders,
    getOrders,
  };
}