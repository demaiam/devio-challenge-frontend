import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrderPage from "./pages/HomePage";
import TakeOutPage from "./pages/TakeOutPage";
import PaymentPage from "./pages/PaymentPage";
import KitchenPage from "./pages/KitchenPage";

import { ProductsProvider } from "./contexts/ProductsContext";
import { OrderProvider } from "./contexts/OrderContext";

export default function App() {

  return (
    <>
      <ProductsProvider>
      <OrderProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<OrderPage />} />
            <Route path="/kitchen" element={<KitchenPage />} />
            <Route path="/take-out" element={<TakeOutPage />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </BrowserRouter>
      </OrderProvider>
      </ProductsProvider>
    </>
  );
}