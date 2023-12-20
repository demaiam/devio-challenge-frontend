import { useState, useContext } from 'react';
import ProductsContext from '../contexts/ProductsContext';

export default function SearchInput() {
  const { products, setProducts } = useContext(ProductsContext);

  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  function submit(e: React.FormEvent) {
    e.preventDefault();

    const lowerSearch = searchValue.toLocaleLowerCase();

    const filteredProducts = [];

    for (let i = 0; i < products.length; i++) {
      const lowerName = products[i].name.toLowerCase();
      if (!lowerName.indexOf(lowerSearch)) {
        filteredProducts.push(products[i]);
        console.log(products[i])
      }
    }

    if (filteredProducts.length === 0) {
      alert('Não foi possível achar o produto');
      return;
    }

    setProducts(filteredProducts);
  }


  return (
    <>
      <form
        className="mt-4 mb-8"
        onSubmit={submit}
      >
        <input className="px-4 py-2 rounded bg-[#F4F4F4] font-medium"
          placeholder="O que você procura?"
          type="text"
          value={searchValue}
          onChange={handleChange}
        />
        <input type="submit" hidden />
      </form>
    </>
  );
}