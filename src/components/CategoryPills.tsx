import { useContext } from 'react';
import ProductsContext from '../contexts/ProductsContext';

export function CategoryPills() {
  const { setProducts } = useContext(ProductsContext);
  
  const baseUrl = 'https://drive.google.com/uc?export=view&id=';
  
  function filterProducts(category: string) {
    const jsonProducts = sessionStorage.getItem("products");
    // @ts-expect-error: Unreachable code error
    const auxProducts = JSON.parse(jsonProducts);

    const filteredProducts = [];

   for (let i = 0; i < auxProducts.length; i++) {
      if (auxProducts[i].category === category) {
        filteredProducts.push(auxProducts[i]);
      }
    }

    setProducts(filteredProducts);
  }

  return (
    <>
      <div className="flex justify-between gap-8 my-6 h-40 overflow-x-scroll p-2">

          <button 
            className="flex flex-col items-center min-w-[15em] shadow-[0_0_7px_1px_rgba(218,218,218,1)] p-2 rounded-xl"
            onClick={() => filterProducts('Combos')}
          >
            <img
              className="h-24 w-24"
              src={`${baseUrl}1TIAUlznz56Yxo0WLiO90vQ6HsyO6Bhoj`}
            />
            <h1 className="font-bold">
              Combos
            </h1>
          </button>

          <button 
            className="flex flex-col items-center min-w-[15em] shadow-[0_0_7px_1px_rgba(218,218,218,1)] p-2 rounded-xl"
            onClick={() => filterProducts('Acompanhamentos')}  
          >
            <img
              className="h-24 w-24"
              src={`${baseUrl}1y4GkhKqNw75eL-Y-MMTl6VYdYoRA3Alv`}
            />
            <h1 className="font-bold">
              Acompanhamentos
            </h1>
          </button>

          <button 
            className="flex flex-col items-center min-w-[15em] shadow-[0_0_7px_1px_rgba(218,218,218,1)] p-2 rounded-xl"
            onClick={() => filterProducts('Bebidas')}
          >
            <img
              className="h-24 w-24"
              src={`${baseUrl}1R9hP7m1EJaaGSNE3xMM6WTg3UwYYDJiX`}
            />
            <h1 className="font-bold">
              Bebidas
            </h1>
          </button>

          <button 
            className="flex flex-col items-center min-w-[15em] shadow-[0_0_7px_1px_rgba(218,218,218,1)] p-2 rounded-xl"
            onClick={() => filterProducts('Sobremesas')}
          >
            <img
              className="h-24 w-24"
              src={`${baseUrl}1g4Ae_H6nY3Hf1dOznDEusefJ-7iQHXSc`}
            />
            <h1 className="font-bold">
              Sobremesas
            </h1>
          </button>

        </div>
    </>
  );
}
