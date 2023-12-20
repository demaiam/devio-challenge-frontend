import { useState } from "react";

export default function MoneyInput() {
  const auxPRICE = 30;

  const [paidValue, setPaidValue] = useState(auxPRICE);
  const [change, setChange] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    if (rawValue.length < 3) return;

    const valueOfInput = e.target.value.replace('R$ ', '');
    const valueNumber = Number(valueOfInput);

    const regex = /^[0-9]?$/;

    if (!regex.test(valueOfInput.slice(-1)) && valueOfInput.slice(-1) !== ',') return;

    if (valueOfInput.charAt(valueOfInput.length - 4) === ',') return;

    const difference = auxPRICE - valueNumber;

    if (difference <= 0) {
      setChange(String(difference * -1));
    }
    else {
      setChange('');
    }
    
    setPaidValue(valueNumber);
  }

  return (
    <>
      <div className="flex gap-4 justify-between mt-6">
        <div className="flex flex-col w-3/4">
          <label 
            className="font-bold"
            htmlFor="value-input"
          >
            Valor entregue
          </label>
          <input
            className="bg-[#F4F4F4] p-2 rounded-lg"
            id="value-input"
            required
            value={`R$ ${paidValue}`}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col w-1/4">
          <label 
            className="font-bold"
            htmlFor="change-input"
          >
            Troco
          </label>
          <input
            className="bg-[#F4F4F4] p-2 rounded-lg"
            id="change-input"
            disabled
            value={`R$ ${change}`}
          />
        </div>
      </div>
    </>
  );
}