import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import burgui from '../assets/burgui.png';

type ProductType = {
  name: string,
  description: string,
  price: number,
  quantity: number,
  imageUrl: string,
  additionals: string[],
}

type OrderType = {
  id: number,
  customer: string,
  total: number,
  observation: string,
  status: string
  product: ProductType[]
};

export default function FinishedOrderPills({ orders }: OrderType[]) {

  return (
    <>
      {orders.map(order => (
        <div className="flex flex-col mt-6 border border-green-600 shadow-[0_0_7px_1px_rgba(218,218,218,1)] rounded-lg">
          <div className="flex justify-between items-center px-6 py-4">
            <div className="flex gap-4 items-center">
              <img
                className="h-16"
                src={burgui} />
              <div className="flex flex-col">
                <h1 className="font-bold text-lg">
                  {order.id} - {order.customer}
                </h1>
                <h2 className="text-gray-500">
                  {order.product[0].quantity}x {order.product[0].name}
                </h2>
              </div>
            </div>
            <div className="flex gap-2">
              <FontAwesomeIcon
                className="bg-red-200 px-3 py-2 rounded-lg"
                icon={faXmark} color="red"
              />
            </div>
          </div >
        </div>
      ))}
    </>
  );
} 