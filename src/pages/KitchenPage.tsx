import { useEffect, useState } from "react";
import Header from "../layouts/Header";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import PendingOrderPills from "../components/PendingOrderPills";
import FinishedOrderPills from "../components/FinishedOrderPills";

import useOrder from "../hooks/api/useGetOrders";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const { getOrders } = useOrder();


  useEffect(() => {
    getOrders()
      .then(res => {
        //console.log(res)
        setOrders(res)
      })
      // eslint-disable-next-line
  }, []);

  if (orders.length === 0) {
    return (
      <>
        <div className="fixed inset-0 flex justify-center items-center bg-[#125C13]">
          <FontAwesomeIcon className="animate-spin" icon={faSpinner} size="10x" color="#FFFFFF" />
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="flex max-[640px]:flex-col justify-between mt-24 lg:w-9/12 p-2 m-auto">
        <div className="lg:w-2/5 w-[45%] max-[640px]:w-full p-2">
          <h1 className="text-2xl font-extrabold">
            Preparando:
          </h1>
          {/* @ts-expect-error: Unreachable code error */}
          <PendingOrderPills orders={orders.pending} />
        </div>
        <div className="absolute left-1/2 bg-black w-[1px] h-5/6 max-[640px]:hidden" />
        <div className="lg:w-2/5 w-[45%] max-[640px]:w-full p-2" >
          <h1 className="text-2xl font-extrabold">
            Pronto:
          </h1>
          {/* @ts-expect-error: Unreachable code error */}
          <FinishedOrderPills orders={orders.finished} />
        </div>
      </div>
    </>
  );
}