import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import success from '../assets/success.png';
import { useNavigate } from 'react-router-dom';

import { useEffect, useContext, useState } from 'react';
import OrderContext from '../contexts/OrderContext';

import useOrder from '../hooks/api/useCreateOrder';

export default function ConfirmModal() {
  const { placeOrder } = useOrder();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);

  const { order } = useContext(OrderContext);

  useEffect(() => {
    console.log(order);

    placeOrder(order)
      .then(() => {
        setLoading(false);
        setDisabled(false);
      });
      // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="fixed z-30 inset-0 bg-black bg-opacity-40 background-blur-sm flex justify-center items-center">
        <div className="fixed flex flex-col gap-4 items-center bg-white px-14 py-12 rounded-xl lg:w-2/5 w-9/12">
          <button
            className="absolute top-6 right-6"
            disabled={disabled}
            onClick={() => navigate('/kitchen')}>
            <FontAwesomeIcon icon={faXmark} color='#9f9f9f' size='2x' />
          </button>
          {loading ?
            <>
              <FontAwesomeIcon className="animate-spin" icon={faSpinner} size="5x" color="#125C13" />
            </>
            :
            <>
              <img src={success} />
              <h1 className="text-2xl font-bold text-center">
                Pedido finalizado com sucesso!
              </h1>
              <h1 className="text-center">
                O pedido foi encaminhado para a cozinha.
              </h1>
            </>
          }

        </div>
      </div>
    </>
  );
}