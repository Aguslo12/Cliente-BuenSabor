import { useEffect, useState } from "react";
import { useCarrito, useSucursalContext } from "../../../hooks/useContext";
import { IPedido } from "../../../types/Pedidos";
import { BackendMethods } from "../../../services/BackendClient";
import { IDetallePedidoIdArt } from "../../../types/DetallePedidoIdArt";
import { ICliente } from "../../../types/Cliente";
import { IFactura } from "../../../types/Factura";
import { IHoraEstimadaFinalizacion } from "../../../types/HoraEstimadaFinalizacion";
import { IEmpleado } from "../../../types/Empleado";
import { Link } from "react-router-dom";
import { IDomicilio } from "../../../types/Domicilio/Domicilio";

export const ContainerCarrito = () => {
  const { cart, limpiarCarrito } = useCarrito();
  const backend = new BackendMethods();
  const { suc, pedidoEnviado } = useSucursalContext();
  const [direccion, SetDireccion] = useState();

  const storedCliente = sessionStorage.getItem("cliente");
  let client: ICliente | null = null;

  if (storedCliente) {
    client = JSON.parse(storedCliente) as ICliente;
  }

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
    domicilio: IDomicilio | undefined;
    idSucursal: number | undefined;
    factura: IFactura | null;
    formaPago: string;
    fechaPedido: string | null;
    horaEstimadaFinalizacion: IHoraEstimadaFinalizacion | null;
    totalCosto: number;
    empleado: IEmpleado | null;
  };
  
  const cambiarDireccion = (event) => {
    SetDireccion(event.target.value);
  };

  const calcularTotalProductos = () => {
    return cart.reduce(
      (acc, item) => acc + item.cantidad * item.articulo.precioVenta,
      0
    );
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
    idCliente: client?.id,
    eliminado: false,
    total: calcularTotalProductos(),
    formaPago: "EFECTIVO",
    estado: "PREPARACION",
    tipoEnvio: "DELIVERY",
    domicilio: client?.domicilios.find((domicilio) => domicilio.calle === direccion), /* HAY QUE CAMBIAR ESTO, NO FUNCIONA PORQUE CLIENTE TRAE DIRECCION COMPLETA Y EN EL PEDIDO SE NECESITA DOMICILIODTO CON IDLOCALIDAD NO LOCALIDAD COMPLETA*/
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
      idCliente: client?.id,
      
    }));
  }, [cart, direccion]);

  const postPedido = async () => {
    console.log(formState);
    try {
      const res: IPedido = await backend.post(
        `${import.meta.env.VITE_LOCAL}pedido`,
        formState
      );
      console.log("PEDIDO");
      console.log(res);
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
    <div className="flex justify-end h-[430px] mt-10 mr-14 align-top">
      <div className="card card-compact w-96 shadow-xl bg-white text-black">
        <div className="card-body h-full">
          <div className="flex justify-center">
            <h1 className="card-title text-2xl w-28 justify-center bg-red-500 p-1 rounded-lg text-white r">
              Carrito
            </h1>
          </div>

          <p className="text-base flex justify-between my-8">
            <b className="flex justify-start">Productos:</b>{" "}
            <span className="flex justify-end">
              {" "}
              $ {calcularTotalProductos()}
            </span>
          </p>
          <p className="text-base flex justify-center font-bold">
            Dirección de envío:
          </p>
          <select className="flex select select-bordered my-3 bg-red-600 text-white font-semibold text-center justify-center" onChange={cambiarDireccion}>
            <option disabled selected>
              Elegir dirección
            </option >
            {client?.domicilios.map((domicilio)=>(
              <option key={domicilio.id} value={domicilio.calle}>{domicilio.calle}</option>
            ))}
          </select>
          <hr />
          <p className="text-base flex justify-between my-2">
            <b className="flex justify-start">Total: </b>{" "}
            <span className="flex justify-end">
              {" "}
              $ {calcularTotalProductos()}
            </span>
          </p>
          <div className="card-actions mt-5">
            {client ? (
              <button
                className="btn btn-error text-white bg-red-600 hover:bg-white hover:border-red-500/90 hover:text-red-500/90 w-full"
                onClick={postPedido}
              >
                Comprar
              </button>
            ) : (
              <Link to={"/iniciarSesion"} className="w-full">
                <button className="btn btn-primary w-full">
                  Iniciar Sesion
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
