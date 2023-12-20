import Header from "../layouts/Header";
import { useEffect, useContext } from "react";
import { CategoryPills } from "../components/CategoryPills";
import ProductGridItem from "../components/ProductGridItem";
import { colors } from "../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import SearchInput from "../components/SearchInput";

import useProducts from '../hooks/api/useGetProducts';

import ProductsContext from '../contexts/ProductsContext';
import { useNavigate } from "react-router-dom";
import OrderContext from "../contexts/OrderContext";

export default function OrderPage() {
  const { getProducts } = useProducts();

  const { products, setProducts } = useContext(ProductsContext);
  const { setOrder } = useContext(OrderContext);

  const navigate = useNavigate();

  useEffect(() => {
    getProducts()
      .then(res => {
        setProducts(res);
        sessionStorage.setItem("products", JSON.stringify(res));
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //console.log('render')

  if (!products || products[0].name === '') {
    return (
      <>
        <div className="fixed inset-0 flex justify-center items-center bg-[#125C13]">
          <FontAwesomeIcon className="animate-spin" icon={faSpinner} size="10x" color="#FFFFFF" />
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="flex flex-col lg:w-9/12 p-1 mx-auto mt-24 p-2">
        <h1 className="text-black text-2xl font-extrabold">
          Seja bem vindo!
        </h1>

        <SearchInput />
        
        <h1 className="text-xl font-bold">
          Categorias
        </h1>
        <h2>
          Navegue por categorias
        </h2>

        <CategoryPills />

        <div className="w-fit mx-auto grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-between gap-y-20 md:gap-x-12 gap-x-4 mt-10 mb-5">
          {products.map((product, index) => (
            <ProductGridItem key={index} {...product} color={colors[Math.floor((index / 4) % 4)]} />
          ))}
        </div>

        <div className="flex gap-6 justify-end py-4">
          <button
            className="text-[#125C13] py-2 w-52 border-2 border-[#125C13] rounded-2xl font-bold"
            onClick={() => setOrder(prev => ({...prev, product: []}))}
          >
            Cancelar
          </button>
          <button
            className="text-white py-2 px-6 w-52 bg-[#125C13] rounded-2xl font-bold"
            onClick={() => navigate('/payment')}
          >
            Finalizar pedido
          </button>
        </div>
      </div>
    </>
  );
}