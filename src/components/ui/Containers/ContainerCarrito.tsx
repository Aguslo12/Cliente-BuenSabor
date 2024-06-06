import { useEffect, useState } from "react";
import { useCarrito, useSucursalContext } from "../../../hooks/useContext";
import { IPedido } from "../../../types/Pedidos";
import { BackendMethods } from "../../../services/BackendClient";
import { IDetallePedidoIdArt } from "../../../types/DetallePedidoIdArt";
import { ICliente } from "../../../types/Cliente";
import { IFactura } from "../../../types/Factura";
import { IHoraEstimadaFinalizacion } from "../../../types/HoraEstimadaFinalizacion";
import { IEmpleado } from "../../../types/Empleado";
import { IDomicilioDto } from "../../../types/CreateDtos/DomicilioDto";

export const ContainerCarrito = () => {
  const { cart, limpiarCarrito } = useCarrito();
  const backend = new BackendMethods();
  const { suc, pedidoEnviado, usuario } = useSucursalContext();
  const [idCliente, setCliente] = useState<number | undefined>(0);

  function eliminarTodo() {
    limpiarCarrito();
  }

  type FormState = {
    [key: string]: any;
    id: number;
    eliminado: boolean;
    detallesPedido: IDetallePedidoIdArt[];
    total: number;
    estado: string;
    tipoEnvio: string;
    idCliente: number | undefined;
    domicilio: IDomicilioDto | null;
    idSucursal: number | undefined;
    factura: IFactura | null;
    formaPago: string;
    fechaPedido: string | null;
    horaEstimadaFinalizacion: IHoraEstimadaFinalizacion | null;
    totalCosto: number;
    empleado: IEmpleado | null;
  };

  const calcularTotalProductos = () => {
    return cart.reduce(
      (acc, item) => acc + item.cantidad * item.articulo.precioVenta,
      0
    );
  };

  const hardcodedDomicilio: IDomicilioDto = {
    calle: "Calle Falsa",
    numero: 123,
    cp: 1234,
    piso: 1,
    nroDpto: 1,
    idLocalidad: 1,
  };

  const facturaHardcodeada: IFactura = {
    id: 0,
    eliminado: false,
    fechaFacturacion: null, // Fecha en formato ISO
    mpPaymentId: 123456789,
    mpMerchantOrderId: 987654321,
    mpPreferenceId: "abcdefg12345",
    mpPaymentType: "credit_card",
    formaPago: "MERCADO_PAGO",
    totalVenta: 1500.0,
  };

  useEffect(() => {
    const traerClientes = async () => {
      const res: ICliente[] = (await backend.getAll(
        `${import.meta.env.VITE_LOCAL}cliente`
      )) as ICliente[];
      console.log("LOS CLIENTES");
      console.log(res);
      await traerCliente(res);
    };
    traerClientes();
  }, []);

  const traerCliente = async (res: ICliente[]) => {
    const usuarioEncontrado = res.find(
      (actual: ICliente) => actual.usuario.id == usuario?.id
    );
    setCliente(usuarioEncontrado?.id);
    
  };

  const [formState, setFormState] = useState<FormState>({
    id: 0,
    detallesPedido: cart.map(
      (item) =>
        ({
          id: item.id,
          eliminado: item.eliminado,
          subTotal: item.subTotal,
          cantidad: item.cantidad,
          idArticulo: item.articulo.id,
        } as unknown as IDetallePedidoIdArt)
    ),
    fechaPedido: null,
    idCliente: idCliente,
    eliminado: false,
    total: calcularTotalProductos(),
    formaPago: "EFECTIVO",
    estado: "PREPARACION",
    tipoEnvio: "DELIVERY",
    domicilio: hardcodedDomicilio,
    factura: facturaHardcodeada,
    idSucursal: suc?.id,
    horaEstimadaFinalizacion: null,
    empleado: null,
    totalCosto: 0,
  });

  useEffect(() => {
    setFormState((prevState) => ({
      ...prevState,
      detallesPedido: cart.map(
        (item) =>
          ({
            id: item.id,
          eliminado: item.eliminado,
          subTotal: item.subTotal,
          cantidad: item.cantidad,
          idArticulo: item.articulo.id,
          } as unknown as IDetallePedidoIdArt)
      ),
      total: calcularTotalProductos(),
      idCliente: idCliente,
    }));
  }, [cart, idCliente]);

  const postPedido = async () => {
    try {
      const res: IPedido = await backend.post(
        `${import.meta.env.VITE_LOCAL}pedido`,
        formState
      );
      console.log("PEDIDO")
      console.log(res)
      if (res.estado === "RECHAZADO") {
        pedidoEnviado(3);
      } else {
        pedidoEnviado(1);
        eliminarTodo();
      }
    } catch (error) {
      console.error("Error posting pedido:", error);
      pedidoEnviado(2);
    }
  };

  return (
    <div className="flex justify-end h-80 mt-10 mr-14 align-top">
      <div className="card card-compact w-96 shadow-xl bg-white text-black">
        <div className="card-body">
          <h1 className="card-title">Carrito</h1>
          <p className="text-base flex justify-between my-2">
            <b className="flex justify-start">Productos:</b>{" "}
            <span className="flex justify-end">
              {" "}
              $ {calcularTotalProductos()}
            </span>
          </p>
          <p className="text-base flex justify-between my-2">
            <b className="flex justify-start">Envio:</b>{" "}
            <span className="flex justify-end">Gratis</span>
          </p>
          <hr />
          <p className="text-base flex justify-between my-2">
            <b className="flex justify-start">Total: </b>{" "}
            <span className="flex justify-end">
              {" "}
              $ {calcularTotalProductos()}
            </span>
          </p>
          <div className="card-actions justify-end mt-5">
            <button
              className="btn btn-error text-white bg-red-500 hover:bg-white hover:border-red-500/90 hover:text-red-500/90 w-full"
              onClick={postPedido}
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
