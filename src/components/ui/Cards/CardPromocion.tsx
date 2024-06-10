import React, { FC, useEffect, useState } from "react";
import { IPromosShort } from "../../../types/ShortDtos/PromoShort";
import { FaAngleRight, FaMinus, FaPlus } from "react-icons/fa";
import { IDetallePedido } from "../../../types/DetallePedido";
import { BackendMethods } from "../../../services/BackendClient";
import { useCarrito } from "../../../hooks/useContext";
import { IPromos } from "../../../types/Promos";
import { BsFillCartFill } from "react-icons/bs";

export const CardPromocion: FC<IPromosShort> = ({
  denominacion,
  descripcionDescuento,
  detalles,
  eliminado,
  fechaDesde,
  fechaHasta,
  horaDesde,
  horaHasta,
  id,
  imagenes,
  precioPromocional,
  tipoPromocion,
}) => {
  const { cart, addCarritoPromo, removeItemCarrito } = useCarrito();
  const [cantidad, setCantidad] = useState<number>(0);
  const [data, setData] = useState<IPromos | null>(null);
  const backend = new BackendMethods();

  useEffect(() => {
    const traerDatos = async () => {
      const res: IPromos = (await backend.getById(
        `${import.meta.env.VITE_LOCAL}promocion/${id}`
      )) as IPromos;
      setData(res);
    };
    traerDatos();
  }, []);

  useEffect(() => {
    const itemInCart = cart.find(
      (item) => item.promocion?.id === id
    );
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
        promocion: data,
        articulo: null,
        subTotal: data.precioPromocional,
      };
      addCarritoPromo(detalle);
      setCantidad((prevCantidad) => prevCantidad + 1);
    }
  };

  const eliminar = () => {
    if (data) {
      const detalle: IDetallePedido = {
        id: 0,
        cantidad,
        eliminado: false,
        promocion: data,
        articulo: null,
        subTotal: data.precioPromocional,
      };
      removeItemCarrito(detalle);
      if (cantidad > 0) {
        setCantidad((prevCantidad) => prevCantidad - 1);
      }
    }
  };

  return (
    <div className="card w-96 bg-base-100 h-[390px] rounded-md border shadow m-5">
      {imagenes !== undefined && imagenes.length >= 1 && (
        <figure>
          <img src={imagenes[0].url} alt="promo" className="w-full" />
        </figure>
      )}
      <div className="">
        <div className="flex flex-col mt-2 justify-center items-center">
          <h2 className="card-title text-3xl">{denominacion}</h2>
          <p className="text-red-600 font-bold">${precioPromocional}</p>
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
              className="btn bg-white hover:bg-white text-red-600 border-none rounded-l-xl rounded-r-none  text-sm disabled:bg-white disabled:text-slate-300"
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
    </div>
  );
};
