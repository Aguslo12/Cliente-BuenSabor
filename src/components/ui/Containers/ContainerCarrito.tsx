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
import { IDomicilioCompleto } from "../../../types/DomicilioCompleto";
import CheckoutMP from "../CheckoutMP/CheckoutMP";

export const ContainerCarrito = () => {
  const { cart, limpiarCarrito } = useCarrito();
  const backend = new BackendMethods();
  const { suc, pedidoEnviado } = useSucursalContext();
  const [direccion, SetDireccion] = useState();
  const [domicilio, setDomicilio] = useState<number>();

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
    idDomicilio: number | undefined;
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
    const sumaArticulo = cart.reduce((acc, item) => {
      if (item.articulo) {
        return acc + item.cantidad * item.articulo.precioVenta;
      } else {
        return acc;
      }
    }, 0);
    const sumaPromo = cart.reduce((acc, item) => {
      if (item.promocion) {
        return acc + item.cantidad * item.promocion.precioPromocional;
      } else {
        return acc;
      }
    }, 0);
    return sumaArticulo + sumaPromo;
  };

  const facturaHardcodeada: IFactura = {
    id: 0,
    eliminado: false,
    fechaFacturacion: null, // Fecha en formato ISO
    mpPaymentId: 123456789,
    mpMerchantOrderId: 987654321,
    mpPreferenceId: "abcdefg12345",
    mpPaymentType: "credit_card",
    formaPago: "EFECTIVO",
    totalVenta: 1500.0,
  };

  useEffect(() => {
    if (client) {
      const dirActual: IDomicilioCompleto = client.domicilios.find(
        (domicilio) => domicilio.calle === direccion
      );
      if (dirActual) {
        setDomicilio(dirActual.id);
        console.log(dirActual.id)
      }
      console.log(`DIRECCION ACTUAL`);
      console.log(dirActual)
    }
  }, [direccion]);

  const [formState, setFormState] = useState<FormState>({
    id: 0,
    detallesPedido: cart.map(
      (item) =>
        ({
          id: item.id,
          eliminado: item.eliminado,
          subTotal: item.subTotal,
          cantidad: item.cantidad,
          idPromocion: 0,
          idArticulo: item.articulo?.id,
        } as unknown as IDetallePedidoIdArt)
    ),
    fechaPedido: null,
    idCliente: client?.id,
    eliminado: false,
    total: calcularTotalProductos(),
    formaPago: "EFECTIVO",
    estado: "PREPARACION",
    tipoEnvio: "DELIVERY",
    idDomicilio: domicilio,
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
            idPromocion: item.promocion?.id || 0,
            idArticulo: item.articulo?.id,
          } as unknown as IDetallePedidoIdArt)
      ),
      total: calcularTotalProductos(),
      idCliente: client?.id,
      idDomicilio: domicilio,
    }));
  }, [cart, direccion, domicilio]);

  const postPedido = async () => {
    try {
      const res: IPedido = await backend.post(
        `${import.meta.env.VITE_LOCAL}pedido`,
        formState
      );
      console.log("SANCHO PANZA");
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
            <h1 className="card-title text-2xl w-28 justify-center bg-red-500 p-1 rounded-lg text-white">
              Carrito
            </h1>
          </div>
          <div className="text-base flex justify-between my-8">
            <b>Total:</b>{" "}
            <span className="flex">
              $ <p className="underline decoration-2 decoration-red-500"> {calcularTotalProductos()}</p>
            </span>
          </div>
          <div className="text-base flex justify-center text-center font-bold">
          <p >
            Dirección de envío:
          </p>
          </div>
          <select
            className="flex select select-bordered mb-4 bg-red-600 text-white font-semibold text-center justify-center"
            onChange={cambiarDireccion}
          >
            <option disabled selected>
              Elegir dirección
            </option>
            {client?.domicilios.map((domicilio) => (
              <option key={domicilio.id} value={domicilio.calle}>
                {domicilio.calle}
              </option>
            ))}
          </select>
          <hr />
          <div className="card-actions mt-5 w-full">
            {client ? (
              formState.idDomicilio === undefined ? (
                <div className="w-full text-center text-white bg-green-500/60 p-3 rounded-lg"> Coloque un domicilio</div>
              ) : (
                <div className="w-full">
                <button
                  className="btn btn-success bg-green-600/90 border-green-600/90 text-white w-full"
                  onClick={postPedido}
                >
                  Pagar en efectivo
                </button>
                <CheckoutMP pedido={formState} />
              </div>
              )
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
