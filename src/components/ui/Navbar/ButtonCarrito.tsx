import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export const ButtonCarrito = () => {
  return (
    <div className="dropdown dropdown-en">
      <div
        tabIndex={0}
        role="button"
        className="btn rounded-2xl btn-ghost text-white bg-colorSec hover:bg-white hover:text-colorSec w-48"
      >
        <div className="text-lg">Carrito / </div>
        <div className="text-lg">$ 0</div>
        <div className="text-lg">
          <FaShoppingCart />
        </div>
      </div>
      <div
        tabIndex={0}
        className="mt-1 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow-md"
      >
        <div className="card-body ">
          <span className="font-bold text-lg text-colorSec">8 Productos</span>
          <span className=" text-colorSec">Total: $999</span>
          <div >
            <Link to={"/carrito"} className="card-actions">
              <button className="btn bg-colorSec text-slate-200 hover:text-colorSec hover:border-colorSec w-full">
                Ver Carrito
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
