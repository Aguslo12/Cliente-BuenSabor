import React, { FC, useEffect, useState } from "react";
import { IArticuloManufacturado } from "../../../types/ArticuloManufacturado";
import { BsFillCartFill } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useCarrito } from "../../../hooks/useContext";
import { BackendMethods } from "../../../services/BackendClient";
import { IDetallePedido } from "../../../types/DetallePedido";
const CardArticulo: FC<IArticuloManufacturado> = ({
  id,
  denominacion,
  imagenes,
  precioVenta,
  tiempoEstimadoMinutos,
  descripcion,
  preparacion,
  unidadMedida,
  articuloManufacturadoDetalles,
}) => {
  const { cart, addCarrito, removeItemCarrito } = useCarrito();
  const [cantidad, setCantidad] = useState<number>(0);
  const [data, setData] = useState<IArticuloManufacturado | null>(null);
  const backend = new BackendMethods();

  useEffect(() => {
    const traerDatos = async () => {
      const res: IArticuloManufacturado = (await backend.getById(
        `${import.meta.env.VITE_LOCAL}ArticuloManufacturado/${id}`
      )) as IArticuloManufacturado;
      setData(res);
    };
    traerDatos();
  }, []);

  useEffect(() => {
    const itemInCart = cart.find((item) => item.articulo?.id === id);
    if (itemInCart) {
      setCantidad(itemInCart.cantidad);
    }
  }, [cart, id]);

  const agregar = () => {
    if (data) {
      const detalle: IDetallePedido = {
        id: 0,
        eliminado: false,
        cantidad: 1,
        articulo: data,
        promocion: null,
        subTotal: data.precioVenta,
      };
      addCarrito(detalle);
      setCantidad((prevCantidad) => prevCantidad + 1);
    }
  };

  const eliminar = () => {
    if (data) {
      const detalle: IDetallePedido = {
        id: 0,
        cantidad,
        eliminado: false,
        articulo: data,
        promocion: null,
        subTotal: data.precioVenta,
      };
      removeItemCarrito(detalle);
      if (cantidad > 0) {
        setCantidad((prevCantidad) => prevCantidad - 1);
      }
    }
  };

  return (
    <div
      className="card w-80 bg-base-100 h-[330px] rounded-md border shadow hover:scale-105 cursor-pointer transition-all m-5"
    >
      {imagenes !== undefined && imagenes.length >= 1 && (
        <figure>
          <img src={imagenes[0].url} alt="promo" className="w-full" />
          <div className="absolute top-0 right-0 bg-red-600 bg-opacity-70 text-white p-2 rounded-md cursor-pointer hover:bg-opacity-90 transition-all" onClick={() => document.getElementById(`my_modal_${id}`).showModal()}>
            Ver detalle
          </div>
        </figure>
      )}
      <div className="">
        <div className="flex flex-col mt-2 justify-center items-center">
          <h2 className="card-title text-3xl">{denominacion}</h2>
          <p className="text-red-600 font-bold">${precioVenta}</p>
        </div>

        {/*FUNCIONALIDADES */}
        <div className="w-full flex items-center justify-between">
          <div className="justify-end items-end m-3 flex w-min border rounded-xl ">
            <button
              className="btn bg-white hover:bg-white text-red-600  border-none rounded-l-xl rounded-r-none  text-sm disabled:bg-white disabled:text-slate-300"
              onClick={eliminar}
              disabled={cantidad === 0}
            >
              <FaMinus className="bg-white" />
            </button>

            <button
              className="btn bg-white hover:bg-white text-red-600 border-none rounded-r-xl rounded-l-none  text-sm disabled:bg-white disabled:text-slate-300"
              onClick={agregar}
            >
              <FaPlus />
            </button>
          </div>
          {/* <h1 className="bg-custom-green h-12 p-2 items-center flex font-medium text-2xl w-14 justify-center text-gray-800">
            <BsFillCartFill />
          </h1> */}
          <div>
            <div
              className={`bg-custom-green m-2  items-center flex flex-row font-medium text-2xl  justify-center transition-all
            ${cantidad >= 1 ? "text-red-600 " : "text-gray-600 "}`}
            >
              <BsFillCartFill className="text-2xl mx-2" />
              <h1 className={`w-8 ${cantidad >= 1 || "opacity-0"}`}>
                {cantidad}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div>
        <dialog id={`my_modal_${id}`} className="modal">
          <div className="modal-box max-w-[600px] h-full max-h-[680px]">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg card-title pb-5">
              {denominacion}
            </h3>
            <div className="flex flex-col">
              <img
                src={imagenes[0].url}
                alt={imagenes[0].name}
                className="rounded-md max-h-[325px] h-full"
              />
              <div className="flex justify-center text-lg font-semibold pt-2">
                <p>{descripcion}</p>
              </div>
              <div className="flex flex-col font-bold w-full mt-3 space-y-3">
                <p className="flex justify-between w-full">
                  {" "}
                  Precio: <p className="text-red-600">$ {precioVenta}</p>
                </p>
                <p className="flex justify-between w-full">
                  Tiempo de espera aproximado:{" "}
                  <p className="text-red-600"> {tiempoEstimadoMinutos} min.</p>
                </p>
                <div className="flex w-full justify-center flex-col pt-3">
                  <p className="text-center">Preparación</p>
                  <p className="text-center text-red-600">{preparacion}</p>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default CardArticulo;
