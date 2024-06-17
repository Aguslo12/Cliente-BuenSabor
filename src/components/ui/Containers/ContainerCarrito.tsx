import { useEffect, useState } from "react";
import { useCarrito, useSucursalContext } from "../../../hooks/useContext";
import { IPedido } from "../../../types/Pedidos";
import { BackendMethods } from "../../../services/BackendClient";
import { IDetallePedidoIdArt } from "../../../types/DetallePedidoIdArt";
import { ICliente } from "../../../types/Cliente";
import { IFactura } from "../../../types/Factura";
import { Link } from "react-router-dom";
import { IDomicilioCompleto } from "../../../types/DomicilioCompleto";
import CheckoutMP from "../CheckoutMP/CheckoutMP";
import EmailFactura from "../../email/EmailFactura";
import { IFormPedido } from "../../../types/Forms/FormPedido";
import { toast } from "react-toastify";


export const ContainerCarrito = () => {
  const { cart, limpiarCarrito } = useCarrito();
  const backend = new BackendMethods();
  const { suc } = useSucursalContext();
  const [direccion, SetDireccion] = useState();
  const [domicilio, setDomicilio] = useState<number>();
  const [formaEntrega, setFormaEntrega] = useState<string>("DELIVERY"); // Estado para la forma de entrega

  const storedCliente = sessionStorage.getItem("cliente");
  let client: ICliente | null = null;

  if (storedCliente) {
    client = JSON.parse(storedCliente) as ICliente;
  }

  function eliminarTodo() {
    limpiarCarrito();
  }

  const cambiarDireccion = (event) => {
    SetDireccion(event.target.value);
  };

  const domFiltrados = client?.domicilios.filter((domicilio) => domicilio.eliminado === false)

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
    fechaFcturacion: null, // Fecha en formato ISO
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
        console.log(dirActual.id);
      }
      console.log(`DIRECCION ACTUAL`);
      console.log(dirActual);
    }
  }, [direccion]);

  const [formState, setFormState] = useState<IFormPedido>({
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
      tipoEnvio: formaEntrega,
      idDomicilio: domicilio,
    }));
  }, [cart, direccion, domicilio,formaEntrega]);

  const handleFormaEntregaChange = (tipo) => {
    setFormaEntrega(tipo);
  };

  const postPedido = async () => {
    try {
      const res: IPedido = await backend.post(
        `${import.meta.env.VITE_LOCAL}pedido`,
        formState
      );
      console.log("SANCHO PANZA");
      console.log(res);
      if (res.estado === "RECHAZADO") {
        toast.error("Error por falta de stock")
        console.log("falta de stock");
      } else {
        toast.success("Pedido pagado correctamente!")
        EmailFactura(res.factura);
        console.log("enviado");
        eliminarTodo();
      }
    } catch (error) {
      toast.error("Hubo un problema")
      console.error("Error posting pedido:", error);
      console.log("hubo un problema");
    }
  };

  return (
    <div className="flex justify-end h-[500px] mt-10 mr-14 align-top">
      <div className="card card-compact w-96 shadow-xl bg-white text-black">
        <div className="card-body h-full">
          <div className="flex justify-center">
            <h1 className="card-title text-2xl w-28 justify-center bg-red-600 p-1 rounded-lg text-white">
              Carrito
            </h1>
          </div>
          <div className="text-base flex justify-between my-8">
            <b>Total:</b>{" "}
            <span className="flex">
              ${" "}
              <p className="underline decoration-2 decoration-red-500">
                {" "}
                {calcularTotalProductos()}
              </p>
            </span>
          </div>
          <div className="text-base flex justify-center text-center font-bold">
            <p>Dirección de envío</p>
          </div>
          <select
            className="flex select select-bordered mb-4 bg-red-600 text-white font-semibold text-center justify-center"
            onChange={cambiarDireccion}
          >
            <option disabled selected>
              Elegir dirección
            </option>
            {domFiltrados != undefined ? (
              domFiltrados.map((domicilio) => (
                <option key={domicilio.id} value={domicilio.calle}>
                  {domicilio.calle}
                </option>
              ))
            ) : (
              <div></div>
            )}
          </select>
          <div>
            <p className="flex justify-center text-base font-bold">Forma de entrega</p>
            <div className="flex flex-row justify-center py-2">
              <div className="flex flex-row items-center">
                <p className="mr-2">Delivery</p>
                <input
                  type="checkbox"
                  checked={formaEntrega === "DELIVERY"}
                  onChange={() => handleFormaEntregaChange("DELIVERY")}
                  className="checkbox checkbox-error"
                />
              </div>
              <div className="flex flex-row items-center ml-4">
                <p className="mr-2">Sucursal</p>
                <input
                  type="checkbox"
                  checked={formaEntrega === "TAKE_AWAY"}
                  onChange={() => handleFormaEntregaChange("TAKE_AWAY")}
                  className="checkbox checkbox-error"
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="card-actions mt-5 w-full">
            {client ? (
              formState.idDomicilio === undefined ? (
                <div className="w-full text-center text-white bg-green-500/60 p-3 rounded-lg">
                  {" "}
                  Coloque un domicilio
                </div>
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
