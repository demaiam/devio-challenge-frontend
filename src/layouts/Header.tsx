import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const url = useLocation();
  const path = url.pathname;

  return (
    <div className="fixed z-50 w-full top-0 flex items-center py-4 lg:px-8 px-2 bg-[#125C13] justify-between">
      <button
        className="flex gap-2 items-center"
        onClick={() => navigate('/')}
      >
        <div className="flex justify-center items-center rounded-full bg-white p-1 w-8 h-8">
          <FontAwesomeIcon icon={faBurger} size="1x" color="#125C13"/>
        </div>
        <h1 className="text-white text-xl font-bold">
          fastfood
        </h1>
      </button>
      <div className="flex gap-6">
        <button 
          className="py-2 px-4 border-none rounded-xl text-white font-bold hover:bg-[#0C400D]"
          style={{backgroundColor: path === '/' || path === '/payment' ? '#0C400D' : '#125C13'}}
          onClick={() => navigate('/')}
        >
          Pedido
        </button>
        <button 
          className="py-2 px-4 border-none rounded-xl text-white font-bold hover:bg-[#0C400D]"
          style={{backgroundColor: path === '/kitchen' ? '#0C400D' : '#125C13'}}
          onClick={() => navigate('/kitchen')}
        >
          Cozinha
        </button>
        <button 
          className="py-2 px-4 border-none rounded-xl text-white font-bold hover:bg-[#0C400D]"
          style={{backgroundColor: path === '/take-out' ? '#0C400D' : '#125C13'}}
          onClick={() => navigate('/take-out')}
        >
          Retirada
        </button>
      </div>
    </div>
  );
}