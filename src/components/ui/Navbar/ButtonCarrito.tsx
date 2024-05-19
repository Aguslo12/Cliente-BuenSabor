
import { FaShoppingCart } from "react-icons/fa";

export const ButtonCarrito = () => {
  return (
    <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-circle btn-ghost text-white bg-slate-700 hover:bg-white hover:text-slate-700 w-48">
            <div className="text-lg">Carrito / </div>
            <div className="text-lg">$ 0</div>
            <div className="text-lg"><FaShoppingCart/></div>
          </div>
          <div
            tabIndex={0}
            className="mt-1 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">8 Productos</span>
              <span className="text-info">Total: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">
                  Ver Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
  )
}
