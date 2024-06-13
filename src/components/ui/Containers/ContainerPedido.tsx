import { useEffect, useState } from "react";
import { CardPedido } from "../Cards/CardPedido";
import { IPedido } from "../../../types/Pedidos";
import { BackendMethods } from "../../../services/BackendClient";
import { ICliente } from "../../../types/Cliente";

export const ContainerPedido = () => {
  const backend = new BackendMethods();
  const [estado, setEstado] = useState<string>("")

  const storedCliente = sessionStorage.getItem("cliente");

  let cliente: ICliente | undefined = undefined;

  if (storedCliente) {
    cliente = JSON.parse(storedCliente) as ICliente;
  }

  const [pedidos, setPedidos] = useState<IPedido[]>([]);

  const traerPedidos = async () => {
    console.log(estado)
    const res: IPedido[] = (await backend.postSinData(
      `${import.meta.env.VITE_LOCAL}pedido/getPorEstado/${estado}/${cliente?.id}`
    )) as IPedido[];
    setPedidos(res);
    console.log(res)
  };

  useEffect(() => {
    traerPedidos();
  }, [estado]);

  const handleChangeEstado = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEstado(event.target.value); // Actualiza el estado 'estado' con el valor seleccionado del select
    // Aquí podrías realizar cualquier acción adicional que necesites al cambiar el estado
  };

  console.log(pedidos.length);

  return cliente?.pedidos.length != undefined && cliente?.pedidos.length <= 0 ? (
    <div className="flex w-screen h-screen items-center justify-center">
      <div className="text-red-600 font-medium text-center flex text-4xl flex-col space-y-2">
        <p>Todavía no hay pedidos</p>
        <p className="text-3xl">¡Haz tu primer pedido!</p>
      </div>
    </div>
  ) : (
    <div className="mx-10 flex justify-center space-x-2 jus flex-wrap">
      <div className="flex mt-32 w-full justify-center mb-10 space-x-32 items-center">
        <h1 className="text-2xl">Filtrar por:</h1>
        <div className="flex flex-row items-center space-x-5">
          <p className="text-2xl">Estado: </p>
          <select className="select select-error w-full text-xl max-w-xs" value={estado} // Asigna el estado 'estado' como valor seleccionado del select
            onChange={handleChangeEstado}>
            <option disabled selected>
              Todos
            </option>
            <option>PENDIENTE</option>
            <option>RECHAZADO</option>
            <option>PREPARACION</option>
            <option>CANCELADO</option>
            <option>ENTREGADO</option>
          </select>
        </div>
        <div className="flex flex-row items-center space-x-5">
          <p className="text-2xl">Fecha: </p>
          <select className="select select-error w-full text-xl max-w-xs">
            <option disabled selected>
              Todos
            </option>
            <option>PENDIENTE</option>
          </select>
          <p>/</p>
          <select className="select select-error w-full text-xl max-w-xs">
            <option disabled selected>
              Todos
            </option>
            <option>PENDIENTE</option>
          </select>
        </div>
      </div>
      {pedidos.map((pedido: IPedido, id: number) => (
        <CardPedido
          id={pedido.id}
          estado={pedido.estado}
          fechaPedido={pedido.fechaPedido}
          formaPago={pedido.formaPago}
          horaEstimadaFinalizacion={pedido.horaEstimadaFinalizacion}
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
