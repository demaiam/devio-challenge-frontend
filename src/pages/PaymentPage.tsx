import { useContext, useState } from "react";
import { createPortal } from "react-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheckDollar, faCreditCard, faMoneyBill } from "@fortawesome/free-solid-svg-icons";

import OrderContext from "../contexts/OrderContext";

import Header from "../layouts/Header";
import ConfirmModal from "../modals/ConfirmModal";
import MoneyInput from "../components/MoneyInput";
import CardInput from "../components/CardInput";
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const [selectedPayment, setSelectedPayment] = useState('');
  const [customerName, setCustomerName] = useState('');

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const { order, setOrder } = useContext(OrderContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerName(e.target.value);
  };

  function makePayment(e: React.FormEvent) {
    e.preventDefault();
    setOrder(prev => ({ ...prev, customer: customerName }));

    setShowModal(true);
  }

  return (
    <>
      <Header />
      <form 
        className="flex flex-col lg:w-9/12 p-2 m-auto"
        onSubmit={makePayment}
      >
        <div className="flex items-center gap-4 mt-8">
          <FontAwesomeIcon icon={faMoneyCheckDollar} color='#125C13' size="2x" />
          <h1 className="text-2xl font-extrabold">
            Pagamento
          </h1>
        </div>
        <div className="flex max-sm:flex-col justify-between gap-4 mt-8">
          <div className="flex flex-col lg:w-2/5 w-[45%] max-[640px]:w-full">
            <h1 className="font-bold">
              Resumo da compra
            </h1>
            <div className="border rouned-lg lg:p-6 p-8 mt-2">
              <h1 className="flex justify-between">
                {order.product[0].quantity}x {order.product[0].name}
                 <span>
                  {(order.product[0].price / 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                 </span>
              </h1>
              <div className="border border-dotted my-4" />
              <h1 className="flex justify-between">
                Total do pedido:
                  <span className="text-3xl font-bold">
                    {(order.total / 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                  </span>
              </h1>
            </div>
            <div className="flex gap-4 justify-between mt-6">
              <div className="flex flex-col w-3/4">
                <label
                  className="font-bold"
                  htmlFor="name-input"
                >
                  Nome do cliente
                </label>
                <input
                  className="bg-[#F4F4F4] p-2 rounded-lg mt-2"
                  id="name-input"
                  placeholder="Primeito nome"
                  type="text"
                  value={customerName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col w-1/5">
                <label
                  className="font-bold"
                  htmlFor="code-input"
                >
                  Código
                </label>
                <input
                  className="bg-[#F4F4F4] p-2 rounded-lg mt-2 text-gray-400"
                  id="code-input"
                  value="- - -"
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="lg:w-2/5 w-[45%] max-[640px]:w-full">
            <h1 className="font-bold">
              Selecione a forma de pagamento:
            </h1>
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex justify-between items-center border rounded p-4">
                <div className="flex gap-4 items-center">
                  <FontAwesomeIcon icon={faCreditCard} color='#125C13' />
                  <label htmlFor="debit-radio">
                    Débito
                  </label>
                </div>
                <input
                  className="w-4 h-4 accent-[#125C13]"
                  name="payment"
                  id="debit-radio"
                  type="radio"
                  onChange={() => setSelectedPayment('debit')}
                />
              </div>
              <div className="flex justify-between items-center border rounded p-4">
                <div className="flex gap-4 items-center">
                  <FontAwesomeIcon icon={faCreditCard} color='#125C13' />
                  <label htmlFor="credit-radio">
                    Crédito
                  </label>
                </div>
                <input
                  className="w-4 h-4 accent-[#125C13]"
                  name="payment"
                  id="credit-radio"
                  type="radio"
                  onChange={() => setSelectedPayment('credit')}
                />
              </div>
              <div className="flex justify-between items-center border rounded p-4">
                <div className="flex gap-4 items-center">
                  <FontAwesomeIcon icon={faMoneyBill} color='#125C13' />
                  <label htmlFor="money-radio">
                    Dinheiro
                  </label>
                </div>
                <input
                  className="w-4 h-4 accent-[#125C13]"
                  name="payment"
                  id="money-radio"
                  type="radio"
                  onChange={() => setSelectedPayment('money')}
                />
              </div>
            </div>
            <div className="flex flex-col h-80">
              {selectedPayment === '' ?
                <>
                </>
                :
                selectedPayment === 'money' ?
                  <MoneyInput />
                  :
                  <CardInput />
              }
            </div>
            <div className="flex gap-6 justify-end">
              <button
                className="text-[#125C13] py-2 w-52 border-2 border-[#125C13] rounded-2xl font-bold"
                onClick={() => navigate('/')}
              >
                Cancelar
              </button>
              <button
                className="text-white py-2 px-6 w-52 bg-[#125C13] rounded-2xl font-bold"
                type="submit"
              >
                Finalizar pedido
              </button>
            </div>
          </div>
        </div>
        {showModal && createPortal(
          <ConfirmModal />,
          document.body
        )}
      </form>
    </>
  );
}