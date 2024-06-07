import React, { useEffect, useState } from "react";
import { useSucursalContext } from "../../../hooks/useContext";
import { IPedido } from "../../../types/Pedidos";
import { ICliente } from "../../../types/Cliente";

export const MisPedidos = () => {
  const storedCliente = sessionStorage.getItem("cliente");
  let cliente: ICliente | undefined = undefined;

  if (storedCliente) {
    cliente = JSON.parse(storedCliente) as ICliente;
  }
  const [pedidos, setPedidos] = useState<IPedido[]>([]);
  /*
    function pushCard(nombre: string) {
        dispatch(setIdEmpresa(String(id)))
        const idEmpresa = id;
        navigate(`/${idEmpresa}/sucursales`, { state: { nombre } })
    }
    */
  const traerPedidos = async () => {
    const res: IPedido[] = await fetch(
      `${import.meta.env.VITE_LOCAL}pedido/getPorCliente/${cliente?.id}`
    );
    setPedidos(res);
    console.log("LOS PEDIDOS");
    console.log(res);
  };

  useEffect(() => {
    traerPedidos();
  }, []);

  return <div className="h-full bg-black/80">MisPedidos</div>;
};
