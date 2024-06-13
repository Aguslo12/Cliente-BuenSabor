import { useCarrito } from "../../../hooks/useContext";
import { IDetallePedido } from "../../../types/DetallePedido";
import { FaTrashAlt } from "react-icons/fa";

export const CardArticuloCarrito = () => {
  const { cart, removeAllItemCarrito } = useCarrito();

  const eliminar = (product: IDetallePedido) => {
    removeAllItemCarrito(product);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap static">
        <div className="flex flex-wrap static mr-48">
          {cart.length > 0 ? (
            cart.map((prod: IDetallePedido) => {
              return (
                prod.cantidad !== 0 &&
                (prod.articulo ? (
                  <div
                    key={prod.articulo?.id}
                    className={`card card-compact w-80 shadow-xl ${
                      cart.length > 0 ? "" : "hidden"
                    } bg-white m-10 h-min border-[#2f302b]`}
                  >
                    <figure>
                      <img
                        src={prod.articulo?.imagenes[0].url}
                        className="h-44 w-full"
                      />
                    </figure>
                    <div
                      tabIndex={0}
                      className="collapse collapse-plus border rounded-t-none bg-white text-black border-white"
                    >
                      <div className="collapse-title text-xl font-medium">
                        {prod.articulo?.denominacion}{" "}
                        <button
                          className=" p-2 bg-white hover:bg-white text-red-600  border-none rounded-lg text-base shadow disabled:bg-white disabled:text-slate-300"
                          onClick={() => eliminar(prod)}
                        >
                          <FaTrashAlt className="bg-white" />
                        </button>
                      </div>
                      <div className="collapse-content ">
                        <p className="my-1">
                          Precio:{" "}
                          <b className="text-lime-600">
                            ${prod.articulo?.precioVenta}
                          </b>
                        </p>
                        <p className="my-1">
                          Cantidad:{" "}
                          <b className="text-lime-600 ">{prod.cantidad}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    key={prod.promocion?.id}
                    className={`card card-compact w-96 shadow-xl ${
                      cart.length > 0 ? "" : "hidden"
                    } bg-white m-10 h-min border-[#2f302b]`}
                  >
                    <figure>
                      <img
                        src={prod.promocion?.imagenes[0].url}
                        className="h-44 w-full"
                      />
                    </figure>
                    <div
                      tabIndex={0}
                      className="collapse collapse-plus border rounded-t-none bg-white text-black border-white"
                    >
                      <div className="collapse-title text-xl font-medium">
                        {prod.promocion?.denominacion}{" "}
                        <button
                          className=" p-2 bg-white hover:bg-white text-red-600  border-none rounded-lg text-base shadow disabled:bg-white disabled:text-slate-300"
                          onClick={() => eliminar(prod)}
                        >
                          <FaTrashAlt className="bg-white" />
                        </button>
                      </div>
                      <div className="collapse-content ">
                        <p className="my-1">
                          Precio:{" "}
                          <b className="text-lime-600">
                            ${prod.promocion?.precioPromocional}
                          </b>
                        </p>
                        <p className="my-1">
                          Cantidad:{" "}
                          <b className="text-lime-600 ">{prod.cantidad}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              );
            })
          ) : (
            <div className="flex justify-center w-screen h-full">
              <div className="align-middle card bg-white shadow-xl items-center justify-center w-1/3 h-28 top-12">
                <div className="card-body">
                  <h2 className="card-title text-4xl text-black text-pretty font-light">
                    No hay productos agregados
                  </h2>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
