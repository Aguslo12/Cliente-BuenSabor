import React, { FC, useEffect, useState } from "react";
import { IArticuloManufacturado } from "../../../types/ArticuloManufacturado";
import { BsCart3, BsFillCartFill } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useCarrito } from "../../../hooks/useContext";
import { IDetallePedido } from "../../../types/DetallePedido";
import { BackendMethods } from "../../../services/BackendClient";

const CardArticulo: FC<IArticuloManufacturado> = ({
  id,
  denominacion,
  imagenes,
  descripcion,
  articuloManufacturadoDetalles,
  eliminado,
  precioVenta,
  preparacion,
  stock,
  tiempoEstimadoMinutos,
  unidadMedida,
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
    const itemInCart = cart.find((item) => item.articulo.id === id);
    if (itemInCart) {
      setCantidad(itemInCart.cantidad);
    }
  }, [cart, id]);

  const agregar = () => {
    if (data) {
      const detalle: IDetallePedido = {
        id: 0,
        cantidad: 1,
        articulo: data,
        subTotal: data.precioVenta,
      };
      addCarrito(detalle);
      setCantidad((prevCantidad) => prevCantidad + 1);
    }
  };

  const eliminar = () => {
    if (data) {
      const detalle: IDetallePedido = { id: 0, cantidad, articulo: data , subTotal: data.precioVenta};
      removeItemCarrito(detalle);
      if (cantidad > 0) {
        setCantidad(prevCantidad => prevCantidad - 1);
      }
    }
  };

  return (
    <div className="card w-96 bg-base-100 rounded-xl border m-5">
      {imagenes !== undefined && imagenes.length >= 1 && (
        <figure>
          <img src={imagenes[0].url} alt="promo" />
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title">{denominacion}</h2>
        <p>{tiempoEstimadoMinutos}</p>
        <p className="text-red-600 font-bold">${precioVenta}</p>
        <div className="justify-end items-end m-3 flex">
          <button className="btn btn-error rounded-l-xl rounded-r-none ml-3 text-gray-800 text-sm disabled:bg-red-300 disabled:text-slate-300"
          onClick={eliminar} disabled={cantidad === 0}>
            <FaMinus />
          </button>
          <h1 className="bg-custom-green h-12 p-2 items-center flex font-medium text-2xl w-14 justify-center text-gray-800">
            <BsFillCartFill />
          </h1>
          <button
            className="btn btn-success rounded-r-xl rounded-l-none text-gray-800 text-sm"
            onClick={agregar}
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardArticulo;
