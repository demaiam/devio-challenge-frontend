import React, { createContext, useState, ReactNode } from 'react';

type ProductType = {
  name: string,
  description: string,
  price: number,
  category: string,
  imageUrl: string,
  additionals: AdditionalsType[]
};

type AdditionalsType = {
  name: string,
  description: string,
  price: number,
  imageUrl: string
};

interface ProductsContextType {
  products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
}

interface ProductsProviderProps {
  children: ReactNode;
}

const DEFAULT_PRODUCTS = [
  {
    name: '',
    description: '',
    price: 0,
    category: '',
    imageUrl: '',
    additionals: [
      {
        name: '',
        description: '',
        price: 0,
        imageUrl: ''
      }
    ]
  }
];

const DEFAULT_VALUE = {
  products: DEFAULT_PRODUCTS,
  setProducts: () => {} 
};

const ProductsContext = createContext<ProductsContextType>(DEFAULT_VALUE);

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

export default ProductsContext;