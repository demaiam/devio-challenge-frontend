import useAsync from '../useAsync';

import * as orderApi from '../../services/orderApi';

export default function useCreateOrderApi() {
  const {
    data: order,
    act: placeOrder
  } = useAsync((data: any) => orderApi.placeOrder(data), false);

  return {
    order,
    placeOrder,
  };
}