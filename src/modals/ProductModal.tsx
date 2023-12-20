import { useState, useRef, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import AdditionalsItems from '../components/AdditionalsItems';

import OrderContext from '../contexts/OrderContext';

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

export default function Modal(props: {
    onClose: any,
    product: ProductGridItemProps,
 }
) {
  const { order, setOrder } = useContext(OrderContext);

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(props.product.price);
  const [additionals, setAdditionals] = useState(['']);

  const ref = useRef(null);

  function changeQuantity(n: number) {
    if (quantity === 1 && n === -1) return;

    const newQuantity = quantity + n;

    setQuantity(newQuantity);
    setTotalPrice(newQuantity * props.product.price);
  }

  function addToOrder(e: React.FormEvent) {
    e.preventDefault();

    // @ts-expect-error null option is being treated
    const observation = !ref.current.value ? '' : ref.current.value;

    const auxAuditionals = [];

    if (additionals.length === 0) {
      auxAuditionals.push('');
    } else {
      auxAuditionals.push(additionals);
    }
    
    const orderObj = {
      name: props.product.name,
      price: props.product.price,
      quantity: quantity,
      imageUrl: props.product.imageUrl,
      additionals: auxAuditionals
    };

    const auxProducts = [];
    auxProducts.push(orderObj);

    setOrder({
      customer: '',
      total: totalPrice,
      observation: observation,
      // @ts-expect-error null option is being treated
      product: auxProducts
    });

    props.onClose();
  }

  return (
    <>
      <div className="fixed z-50 inset-0 bg-black bg-opacity-40 background-blur-sm flex justify-center items-center">
        <form 
          className="fixed bg-white px-14 py-12 rounded-xl md:w-7/12 w-10/12 h-5/6 overflow-y-auto"
          onSubmit={addToOrder}
        >
          <button
            className="absolute top-6 right-6"
            type="button"
            onClick={props.onClose}>
            <FontAwesomeIcon icon={faXmark} color='#9f9f9f' size='2x' />
          </button>
          <div className="flex flex-col gap-1 md:items-start">
            <h1 className="text-2xl font-extrabold">
              Revise seu pedido!
            </h1>
            <div className="flex max-[640px]:flex-col my-8 md:justify-between w-11/12 md:items-start items-center">
              <div className="flex max-[640px]:flex-col gap-4">
                <img
                  className="w-40 h-40"
                  src={props.product.imageUrl}
                />
                <div className="flex gap-y-4 flex-col w-52">
                  <h1 className="text-lg font-bold">
                    {props.product.name}
                  </h1>
                  <h1>
                    {props.product.description}
                  </h1>
                  <div className="flex items-center border-[#125C13] border-y-2 rounded-full gap-12 w-fit">
                    <button
                      className="bg-[#125C13] rounded-full h-12  w-12"
                      type="button"
                      onClick={() => changeQuantity(1)}
                    >
                      <FontAwesomeIcon icon={faPlus} color='white' size='1x' />
                    </button>
                    <h1 className="w-4">
                      {quantity}
                    </h1>
                    <button
                      className="bg-[#125C13] border-[#125C13] rounded-full h-12 w-12"
                      type="button"
                      onClick={() => changeQuantity(-1)}
                    >
                      <FontAwesomeIcon icon={faMinus} color='white' size='1x' />
                    </button>
                  </div>
                </div>
              </div>
              <h1 className="text-lg font-bold">
                {(props.product.price / 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
              </h1>
            </div>
            <h1 className="text-lg font-bold">
              Adicionais
            </h1>
            <h2>
              Selecione os ingredientes que você quer adicionar a mais no seu lanche
            </h2>
            {props.product.additionals.map(additional => (
              <AdditionalsItems 
                key={additional.name} 
                additional={additional}
                quantity={quantity}
                setTotalPrice={setTotalPrice}
                setAdditionals={setAdditionals}
              />
            ))}
          </div>
          <div className="flex flex-col mt-8 gap-4">
            <h1 className="text-lg font-bold">
              Observações
            </h1>
            <textarea
              className="flex justify-center rounded-2xl p-4 w-full h-28 bg-[#F4F4F4]"
              ref={ref}
              placeholder="Adicione uma observação ao pedido"
            />
            <div className="px-12 py-8 border rounded-lg">
              <div className="flex justify-between">
                <h1>
                  {quantity}x {props.product.name}
                </h1>
                <h1>
                  {(props.product.price/100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                </h1>
              </div>
              <div className="my-8 border border-dotted" />
              <h1>
                Total do pedido:
              </h1>
              <h1 className="text-2xl font-bold">
                {(totalPrice / 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
              </h1>
            </div>
          </div>
          <div className="flex mt-8 gap-8 w-100 justify-end">
            <button
              className="text-[#125C13] py-2 px-6 border-2 border-[#125C13] rounded-2xl font-bold"
              onClick={props.onClose}
            >
              Continuar comprando
            </button>
            <button 
              className="text-white py-2 px-6 bg-[#125C13] rounded-2xl font-bold"
              type="submit"
            >
              Adicionar ao pedido
            </button>
          </div>
        </form>
      </div>
    </>
  );
}