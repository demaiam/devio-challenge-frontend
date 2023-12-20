import React, { createContext, useState, ReactNode } from 'react';

type OrderType = {
  customer: string,
  total: number,
  product: ProductsType[]
};

type ProductsType = {
  name: string,
  price: number,
  quantity: number,
  observation: string,
  imageUrl: string
  additionals: string[]
};

interface OrderContextType {
  order: OrderType;
  setOrder: React.Dispatch<React.SetStateAction<OrderType>>;
}

interface OrderProviderProps {
  children: ReactNode;
}

const DEFAULT_ORDER = {
  customer: '',
  total: 0,
  product: [
    {
      name: '',
      price: 0,
      quantity: 0,
      observation: '',
      imageUrl: '',
      additionals: [
        ''
      ]
    }
  ]
};

const DEFAULT_VALUE = {
  order: DEFAULT_ORDER,
  setOrder: () => {} 
};

const OrderContext = createContext<OrderContextType>(DEFAULT_VALUE);

export function OrderProvider({ children }: OrderProviderProps) {
  const [order, setOrder] = useState(DEFAULT_ORDER);

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;