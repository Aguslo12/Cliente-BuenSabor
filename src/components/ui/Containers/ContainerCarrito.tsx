import React, { useEffect, useState } from "react";
import { useCarrito, useSucursalContext } from "../../../hooks/useContext";
import { IPedido } from "../../../types/Pedidos";
import { BackendMethods } from "../../../services/BackendClient";
import { IDetallePedido } from "../../../types/DetallePedido";
import { IDomicilio } from "../../../types/Domicilio/Domicilio";
import { ISucursalShort } from "../../../types/ShortDtos/SucursalShort";
import { IDetallePedidoIdArt } from "../../../types/DetallePedidoIdArt";

export const ContainerCarrito = () => {
    const { cart } = useCarrito();
  const backend = new BackendMethods();
    const { suc } = useSucursalContext();
    console.log(`ESTO ES LA SUCURSAL`)
    console.log(suc)

  type FormState = {
    [key: string]: any;
    id: number;
    eliminado: boolean;
    detallesPedido: IDetallePedidoIdArt[];
    total: number;
    estado: string;
    tipoEnvio: string;
    domicilio: IDomicilio | null;
    sucursal: ISucursalShort | null;
  };

  const calcularTotalProductos = () => {
    return cart.reduce(
      (acc, item) => acc + item.cantidad * item.articulo.precioVenta,
      0
    );
  };


  const hardcodedDomicilio: IDomicilio = {
    id: 1,
    nombre: "Casa",
    eliminado: false,
    calle: "Calle Falsa",
    numero: 123,
    cp: 1234,
    piso: 1,
    nroDpto: 1,
    idLocalidad: 1,
  };

  const [formState, setFormState] = useState<FormState>({
    id: 0,
    detallesPedido: cart.map(item => ({
      cantidad: item.cantidad,
      articulo: item.articulo.id
    } as unknown as IDetallePedidoIdArt)),
    eliminado: false,
    total: calcularTotalProductos(),
    estado: 'PREPARACION',
    tipoEnvio: 'DELIVERY',
    domicilio: hardcodedDomicilio,
    sucursal: suc,
  });

  useEffect(() => {
    setFormState(prevState => ({
      ...prevState,
      detallesPedido: cart.map(item => ({
        cantidad: item.cantidad,
        idArticulo: item.articulo.id
      } as unknown as IDetallePedidoIdArt)),
      total: calcularTotalProductos()
    }));
  }, [cart]);

  const postPedido = async () => {
    try {
      const res: IPedido = await backend.post(`${import.meta.env.VITE_LOCAL}pedido`, formState);
    } catch (error) {
      console.error("Error posting pedido:", error);
    }
  };

  return (
    <div className="flex justify-end h-80 mt-10 mr-14 align-top">
      <div className="card card-compact w-96 shadow-xl bg-colorSec text-slate-200">
        <div className="card-body">
          <h1 className="card-title">Carrito</h1>
          <p className="text-base flex my-2">
            <b className="flex justify-start">Productos:</b>{" "}
            <span className="flex justify-end">$ {calcularTotalProductos()}</span>
          </p>
          <p className="text-base flex my-2">
            <b className="flex justify-start">Envio:</b>{" "}
            <span className="flex justify-end">Gratis</span>
          </p>
          <hr />
          <p className="text-base flex my-2">
            <b className="flex justify-start">Total:</b>{" "}
            <span className="flex justify-end">$ {calcularTotalProductos()}</span>
          </p>
          <div className="card-actions justify-end mt-5">
            <button className="btn btn-success w-full" onClick={postPedido}>Comprar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
