import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCarrito } from "../../../hooks/useContext";

export const ButtonCarrito = () => {

  const { cart } = useCarrito();
  console.log("CARRITO")
  console.log(cart)
  const [suma, setSuma] = useState<number>(0)

  useEffect(() => {
    const sumaTotal = cart.reduce((total, item) => total += item.cantidad, 0);
    setSuma(sumaTotal);
  }, [cart]);

  const calcularTotalProductos = () => {
    const sumaArticulo = cart.reduce((acc, item) => {
      if (item.articulo) {
        return (acc + item.cantidad * item.articulo.precioVenta)
      } else {
        return acc
      }
    },0)
    const sumaPromo = cart.reduce((acc, item) => {
      if (item.promocion) {
        return (acc + item.cantidad * item.promocion.precioPromocional)
      } else {
        return acc
      }
    } ,0)
    return (sumaArticulo + sumaPromo);
  };

  return (
    <div className="dropdown dropdown-en">
      <div
        tabIndex={0}
        role="button"
        className="btn rounded-xl mr-4 text-white bg-red-600 hover:bg-white hover:border-red-600/90 hover:text-red-600/90 w-36"
      >

        <div className="text-lg">$ {calcularTotalProductos()}</div>
        <div className="text-lg">
          <FaShoppingCart />
        </div>
      </div>
      <div
        tabIndex={0}
        className="mt-1 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow-md"
      >
        <div className="card-body ">
          <span className="font-bold text-lg text-colorSec">{suma} Productos</span>
          <span className=" text-colorSec text-base">Total: $ {calcularTotalProductos()}</span>
          <div >
            <Link to={"/carrito"} className="card-actions">
              <button className="btn text-white bg-red-500 hover:bg-white hover:border-red-500/90 hover:text-red-500/90 w-full">
                Ver Carrito
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};