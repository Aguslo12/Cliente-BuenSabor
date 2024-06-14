import { useEffect, useState } from "react";
import { CardPedido } from "../Cards/CardPedido";
import { IPedido } from "../../../types/Pedidos";
import { BackendMethods } from "../../../services/BackendClient";
import { ICliente } from "../../../types/Cliente";
import { ISucursal } from "../../../types/Sucursal";

export const ContainerPedido = () => {
  const backend = new BackendMethods();
  const [estado, setEstado] = useState<string>("PENDIENTE");
  const [fecha, setFecha] = useState("2024-06-10");
  const [fechaFin, setFechaFin] = useState("2024-06-15");

  const storedCliente = sessionStorage.getItem("cliente");

  const storedSucursal = sessionStorage.getItem("sucursal");
  let sucursal: ISucursal | undefined = undefined;

  if (storedSucursal) {
    sucursal = JSON.parse(storedSucursal) as ISucursal;
  }

  const handleInputChange = (event) => {
    const { id, value } = event.target;

    if (id === "fecha-1") {
      setFecha(value);
    } else if (id === "fecha-2") {
      setFechaFin(value);
    }
  };

  let cliente: ICliente | undefined = undefined;

  if (storedCliente) {
    cliente = JSON.parse(storedCliente) as ICliente;
  }
  const [loading, setLoading] = useState<boolean>(false);
  const [pedidos, setPedidos] = useState<IPedido[]>([]);

  const baseUrl = `http://localhost:8080/pedido/getPorFechaYClienteYEstado/${sucursal?.id}/${cliente?.id}`;
  const url = `${baseUrl}?fechaInicio=${fecha}&fechaFin=${fechaFin}&estado=${estado}`;

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPedidos(data);
      })
      .catch((error) => {
        console.error("Hubo un problema con la solicitud fetch:", error);
      });
  }, [fecha, fechaFin, estado]);

  const traerPedidos = async () => {
    console.log(estado);
    const res: IPedido[] = (await backend.postSinData(
      `${import.meta.env.VITE_LOCAL}pedido/getPorEstado/${estado}/${
        cliente?.id
      }`
    )) as IPedido[];
    setPedidos(res);
    console.log("LOS PEDIDOS");
    console.log(res);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    traerPedidos();
  }, [estado]);

  const handleChangeEstado = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEstado(event.target.value); // Actualiza el estado 'estado' con el valor seleccionado del select
    // Aquí podrías realizar cualquier acción adicional que necesites al cambiar el estado
  };

  console.log(cliente?.pedidos.length);

  return cliente?.pedidos.length !== undefined &&
    cliente?.pedidos.length < 0 ? (
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
          <select
            className="select select-error w-full text-xl max-w-xs"
            value={estado} // Asigna el estado 'estado' como valor seleccionado del select
            onChange={handleChangeEstado}
          >
            <option disabled selected>
              Todos
            </option>
            <option>PENDIENTE</option>
            <option>RECHAZADO</option>
            <option>PREPARACION</option>
            <option>CANCELADO</option>
            <option>ENTREGADO</option>
            <option>ENVIANDO</option>
          </select>
        </div>
        <div className="flex flex-row items-center space-x-5">
          <p className="text-2xl">Fecha: </p>
          <input
            id="fecha-1"
            value={fecha}
            onChange={handleInputChange}
            type="date"
            className="w-full text-xl max-w-xs select select-error"
          />
          <p>/</p>
          <input
            id="fecha-2"
            value={fechaFin}
            onChange={handleInputChange}
            type="date"
            className="w-full text-xl max-w-xs select select-error"
          />
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-[500px] text-2xl">
          Cargando{" "}
          <span className="ml-5 loading loading-spinner loading-sm"></span>
        </div>
      ) : pedidos.length <= 0 ? (
        <div className="flex items-center justify-center h-[500px] text-2xl">
          No hay productos en estado {estado.toLowerCase()}
        </div>
      ) : (
        pedidos.map((pedido: IPedido, id: number) => (
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
            domicilio={pedido.domicilio}
            cliente={pedido.cliente}
            empleado={pedido.empleado}
            factura={pedido.factura}
            sucursal={pedido.sucursal}
            key={id}
          />
        ))
      )}
    </div>
  );
};
