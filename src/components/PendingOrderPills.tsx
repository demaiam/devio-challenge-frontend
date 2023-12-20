import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

type ProductType = {
  name: string,
  price: number,
  quantity: number,
  orderId: number,
  imageUrl: string
}

type OrderType = {
  id: number,
  customer: string,
  total: number,
  observation: string,
  status: string
  product: ProductType[]
};

// @ts-expect-error: Unreachable code error 
export default function PreparingOrderPills({ orders }: OrderType[]) {

  return (
    <>
      {/* @ts-expect-error: Unreachable code error */}
      {orders.map(order => (
        <div key={order.id} className="flex flex-col mt-6 shadow-[0_0_7px_1px_rgba(218,218,218,1)] rounded-lg">

          <div className="flex justify-between items-center px-6 py-4">
            <div className="flex gap-4 items-center">
              <img
                className="h-16"
                src={order.product[0].imageUrl} />
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
              <FontAwesomeIcon
                className="bg-green-200 px-3 py-2 rounded-lg"
                icon={faCheck} color="green"
              />
            </div>
          </div >
          {order.observation !== ''
            ?
            <>
              <div className="p-4">
                <h1 className="font-bold">
                  Observações:
                </h1>
                <div className="border rounded pt-2 pb-8 px-2">
                  {order.observation}
                </div>
              </div>
            </>
            :
            <></>}
        </div>
      ))}

    </>
  );
}