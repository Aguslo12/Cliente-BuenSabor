import { useState  } from "react";
import PreferenceMP from "../../../types/MercadoPago/PreferenceMp";
import { createPreferenceMP } from "../../api/Fetch";
import { IPedidoCompleto } from "../../../types/PedidoCompleto";
import { useCarrito, useSucursalContext } from "../../../hooks/useContext";
import { ToastContainer, toast } from "react-toastify";
import { SiMercadopago } from 'react-icons/si';
import 'react-toastify/dist/ReactToastify.css'; // No olvides importar el CSS
import { IPedido } from "../../../types/Pedidos";
import { BackendMethods } from "../../../services/BackendClient";

interface CheckoutMPProps {
  pedido: IPedidoCompleto;
}

function CheckoutMP({ pedido }: CheckoutMPProps) {
  const { limpiarCarrito } = useCarrito();
  const { pedidoEnviado } = useSucursalContext();
  const backend = new BackendMethods();

  const [compra, setCompra] = useState<boolean>(false);

    const post = async () => {
        getPreferenceMP()
    }
  
  const getPreferenceMP = async () => {
    if (pedido.total > 0) {
        const response: PreferenceMP = await createPreferenceMP({
          id: 0,
          estado: pedido.estado,
          eliminado: pedido.eliminado,
          empleado: pedido.empleado,
          factura: pedido.factura,
          idCliente: pedido.idCliente,
          idSucursal: pedido.idSucursal,
          fechaPedido: pedido.fechaPedido,
          idDomicilio: pedido.idDomicilio,
          formaPago: pedido.formaPago,
          horaEstimadaFinalizacion: pedido.horaEstimadaFinalizacion,
          tipoEnvio: pedido.tipoEnvio,
          totalCosto: pedido.totalCosto,
          total: pedido.total,
          detallesPedido: pedido.detallesPedido,
        });
        if (response) {
          const pedidoMP: IPedidoCompleto = { 
            id: 0,
            estado: pedido.estado,
            eliminado: pedido.eliminado,
            empleado: pedido.empleado,
            factura: {id: 0,
              eliminado: false,
              fechaFacturacion: null, // Fecha en formato ISO
              mpPaymentId: 123456789,
              mpMerchantOrderId: 987654321,
              mpPreferenceId: response.id,
              mpPaymentType: "credit_card",
              formaPago: "MERCADO_PAGO",
              totalVenta: 1500.0},
            idCliente: pedido.idCliente,
            idSucursal: pedido.idSucursal,
            fechaPedido: pedido.fechaPedido,
            idDomicilio: pedido.idDomicilio,
            formaPago: pedido.formaPago,
            horaEstimadaFinalizacion: pedido.horaEstimadaFinalizacion,
            tipoEnvio: pedido.tipoEnvio,
            totalCosto: pedido.totalCosto,
            total: pedido.total,
            detallesPedido: pedido.detallesPedido, }
          const res: IPedido = await backend.post(
            `${import.meta.env.VITE_LOCAL}pedido`,
            pedidoMP
          );
          if (res.estado === "RECHAZADO") {
            pedidoEnviado(3);
          } else {
            handleCompra(response.id, res.id) //Se llama a la API de mercado pago
          }
          
        }
    } else {
      toast.error('Agrega al menos un elemento a tu pedido')
  }
  };

  const handleCompra = (idPreference: string, idPedido: number) => {
    toast.info(`Se a guardado el pedido con el id:${idPedido}
      Será redirigido a Mercado Pago`)
      setCompra(true)
      setTimeout(() => {
          const url = `https://sandbox.mercadopago.com.ar/checkout/v1/redirect?preference-id=${idPreference}`;
          window.open(url, '_blank');
          limpiarCarrito();
      }, 2000);
  };

  return (
    <>
            <div className='w-full flex'>

                {!compra ? (<button className='btn w-full mt-2 flex items-center justify-center bg-blue-500 text-white hover:bg-blue-700' onClick={() => post()}>
                    <h1 className='flex flex-row  justify-center items-center'>Comprar con Mercado Pago <SiMercadopago className='text-5xl font-bold' /></h1>
                </button>) : (<progress className="progress w-56 "></progress>)}

            </div>

            <ToastContainer />

        </>
  );
}

export default CheckoutMP;
