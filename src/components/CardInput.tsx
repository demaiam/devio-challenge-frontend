import { useState } from "react";

export default function CardInput() {
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [validThru, setValidThru] = useState('');
  const [CVV, setCVV] = useState('');

  const handleCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    //
    const valuesOfInput = e.target.value.replaceAll(" ", "");
    const regex = /^[0-9\b]+$/;

    if (!regex.test(valuesOfInput) && e.target.value !== '') {
      return;
    }

    if (e.target.value.length > 14) {
      setCardNumber(valuesOfInput.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3 $4"));
    } else if (e.target.value.length > 9) {
      setCardNumber(valuesOfInput.replace(/(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3"));
    } else if (e.target.value.length > 4) {
      setCardNumber(valuesOfInput.replace(/(\d{4})(\d{0,4})/, "$1 $2"));
    } else {
      setCardNumber(valuesOfInput);
    }
  }

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.toUpperCase());
  }

  const handleValidThru = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valuesOfInput = e.target.value.replace("/", "");
    const regex = /^[0-9\b]+$/;

    if (!regex.test(valuesOfInput) && e.target.value !== '') {
      return;
    }

    if (e.target.value.length > 2) {
      setValidThru(valuesOfInput.replace(/^(\d{2})(\d{0,2})/, "$1/$2"));
    } else {
      setValidThru(valuesOfInput);
    }
  }

  const handleCVV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b]+$/;

    if (!regex.test(e.target.value) && e.target.value !== '') {
      return;
    }

    setCVV(e.target.value);
  }

  return (
    <>
      <div className="flex flex-col gap-2 mt-6">
        <div className="flex flex-col">
          <label
            className="font-bold"
            htmlFor="card-number"
          >
            Número do cartão:
          </label>
          <input
            className="bg-[#F4F4F4] p-2 rounded-lg"
            id="card-number"
            type="text"
            value={cardNumber}
            required
            maxLength={19}
            onChange={handleCardNumber}
          />
          <label
            className="font-bold mt-2"
            htmlFor="owner-name"
          >
            Titular do cartão:
          </label>
          <input
            className="bg-[#F4F4F4] p-2 rounded-lg"
            id="owner-name"
            type="text"
            value={name}
            required
            maxLength={19}
            onChange={handleName}
          />
        </div>
        <div className="flex gap-8 justify-end">
          <div className="flex flex-col">
            <label
              className="font-bold"
              htmlFor="card-cvv"
            >
              CVV:
            </label>
            <input
              className="bg-[#F4F4F4] p-2 rounded-lg w-24"
              id="card-cvv"
              type="text"
              value={CVV}
              required
              maxLength={3}
              onChange={handleCVV}
            >
            </input>
          </div>
          <div className="flex flex-col">
            <label
              className="font-bold"
              htmlFor="valid-thry"
            >
              Válido até:
            </label>
            <input
              className="bg-[#F4F4F4] p-2 rounded-lg w-24"
              id="valid-thru"
              type="text"
              value={validThru}
              required
              maxLength={5}
              onChange={handleValidThru}>
            </input>
          </div>
        </div>
      </div>
    </>
  )
}