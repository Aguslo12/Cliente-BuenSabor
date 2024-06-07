import React, { useEffect, useState } from "react";
import { useSucursalContext } from "../../../hooks/useContext";
import { IPedido } from "../../../types/Pedidos";
import { ICliente } from "../../../types/Cliente";
import { BackendMethods } from "../../../services/BackendClient";

export const MisPedidos = () => {

  const backend = new BackendMethods();

  const storedCliente = sessionStorage.getItem("cliente");

  let cliente: ICliente | undefined = undefined;

  if (storedCliente) {
    cliente = JSON.parse(storedCliente) as ICliente;
  }

  const [pedidos, setPedidos] = useState<IPedido[]>([]);

  const traerPedidos = async () => {
    const res: IPedido[] = await backend.getAll( `${import.meta.env.VITE_LOCAL}pedido/getPorCliente/${cliente?.id}`) as IPedido[];
    setPedidos(res);
    console.log(res);
  };

  useEffect(() => {
    traerPedidos();
  }, []);

  return <div className="h-full bg-black/80">MisPedidos</div>;
};
