import { useEffect, useState } from "react";
import { CardPedido } from "../Cards/CardPedido";
import { IPedido } from "../../../types/Pedidos";
import { BackendMethods } from "../../../services/BackendClient";
import { ICliente } from "../../../types/Cliente";

export const ContainerPedido = () => {
  const backend = new BackendMethods();

  const storedCliente = sessionStorage.getItem("cliente");

  let cliente: ICliente | undefined = undefined;

  if (storedCliente) {
    cliente = JSON.parse(storedCliente) as ICliente;
  }

  const [pedidos, setPedidos] = useState<IPedido[]>([]);

  const traerPedidos = async () => {
    const res: IPedido[] = (await backend.getAll(
      `${import.meta.env.VITE_LOCAL}pedido/getPorCliente/${cliente?.id}`
    )) as IPedido[];
    setPedidos(res);
  };

  useEffect(() => {
    traerPedidos();
  }, []);

  console.log(pedidos.length);

  return pedidos.length <= 0 ? (
    <div className="flex w-screen h-screen items-center justify-center">
      <div className="text-red-600 font-medium text-center flex text-4xl flex-col space-y-2">
        <p>Todavía no hay pedidos</p>
        <p className="text-3xl">¡Haz tu primer pedido!</p>
        
      </div>
    </div>
  ) : (
    <div className="mx-10 flex flex-row space-x-2 flex-wrap">
      {pedidos.map((pedido: IPedido, id: number) => (
        <CardPedido
          id={pedido.id}
          estado={pedido.estado}
          fechaPedido={pedido.fechaPedido}
          formaPago={pedido.formaPago}
          horaFinalizacion={pedido.horaFinalizacion}
          detallesPedido={pedido.detallesPedido}
          tipoEnvio={pedido.tipoEnvio}
          total={pedido.total}
          totalCosto={pedido.totalCosto}
          key={id}
        />
      ))}
    </div>
  );
};
