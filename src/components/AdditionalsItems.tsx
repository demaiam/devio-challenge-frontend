import { useState, Dispatch, SetStateAction } from "react";

type AdditionalProps = {
  name: string,
  description: string,
  price: number,
  imageUrl: string
};

export default function AdditionalsItems(props: {
  additional: AdditionalProps, 
  quantity: number,
  setTotalPrice: Dispatch<SetStateAction<number>>,
  setAdditionals: Dispatch<SetStateAction<string[]>>
}) {
  const [isChecked, setIsChecked] = useState(false);
  const orderAdditionals: string[] = [];

  const handleChange = () => {
    if (!isChecked) {
      props.setTotalPrice(prev => prev + (props.additional.price * props.quantity));
      orderAdditionals.push(props.additional.name);
    }
    else {
      props.setTotalPrice(prev => prev - (props.additional.price * props.quantity));
      orderAdditionals.pop();
    }
    setIsChecked(!isChecked);
    props.setAdditionals(orderAdditionals);
  }

  return (
    <>
      <div className="flex justify-between w-full">
        <div className="flex gap-6 items-center">
          <img className="w-24 h-24"
            src={props.additional.imageUrl}
          />
          <div className="flex flex-col">
            <h1 className="font-bold">
              {props.additional.name}
            </h1>
            <h1>{props.additional.description}</h1>
          </div>
        </div>
        <div className="inline-flex gap-12 items-center">
          <h1 className="text-xl font-bold text-[#9f9f9f]">
            {(props.additional.price / 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
          </h1>
          <input 
            className="w-4 h-4 rounded-full"
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
}