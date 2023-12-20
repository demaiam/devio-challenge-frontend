import { useState, useContext, useEffect } from "react";
import ProductModal from '../modals/ProductModal';
import { createPortal } from "react-dom";
import doodle from '../assets/doodle1.png';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import OrderContext from "../contexts/OrderContext";

type Additionals = {
  name: string,
  description: string,
  price: number,
  imageUrl: string
};

type ProductGridItemProps = {
  name: string,
  description: string,
  price: number,
  imageUrl: string,
  additionals: Additionals[],
  color: string
};

export default function ProductGridItem(props: ProductGridItemProps) {
  const { order } = useContext(OrderContext);

  const [showModal, setShowModal] = useState(false);
  const [hidden, setHidden] = useState('hidden');

  useEffect(() => {
    if (order.product[0].name === props.name && props.name !== '') {
      setHidden('');
    } else {
      setHidden('hidden')
    }
    console.log(order)
  }, [order.product[0].name]);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex flex-col shadow-[0_0_7px_1px_rgba(218,218,218,1)] items-center rounded-2xl w-[240px] h-[336px]"
      >
        <div
          className="w-full rounded-t-2xl"
          style={{ backgroundColor: props.color }}
        >
          <img
            src={doodle} />
        </div>
        <img
          className="z-20 relative flex -mt-28 h-1/2"
          src={props.imageUrl}
          alt="Product Image"
        />
        <div className="flex w-full flex-col z-10 -mt-20 bg-white rounded-2xl">
          <h1 className="mt-20 text-lg font-bold">
            {props.name}
          </h1>
          <h2 className="text-ellipsis">
            {props.description}
          </h2>
          <h3 className="mt-8 text-lg font-bold">
            {(props.price / 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
          </h3>
        </div>
        <div
          className={`absolute flex items-center justify-center z-30 bg-green-500 bg-opacity-40 background-blur-sm w-[240px] rounded-xl h-[336px] ${hidden}`}
        >
          <FontAwesomeIcon icon={faCheck} color="white" size="3x" />
        </div>
      </button>


      {showModal && createPortal(
        <ProductModal
          onClose={() => setShowModal(false)}
          product={props}
        />,
        document.body
      )}

    </>
  );
}