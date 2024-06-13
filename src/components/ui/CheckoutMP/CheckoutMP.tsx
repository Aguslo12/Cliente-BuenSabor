import { useState  } from "react";
import { createPreferenceMP } from "../../api/Fetch";
import { IPedidoCompleto } from "../../../types/PedidoCompleto";
import { useCarrito } from "../../../hooks/useContext";
import { toast } from "react-toastify";
import { SiMercadopago } from 'react-icons/si';
import 'react-toastify/dist/ReactToastify.css'; // No olvides importar el CSS
import EmailFactura from "../../email/EmailFactura";

interface CheckoutMPProps {
  pedido: IPedidoCompleto;
}

function CheckoutMP({ pedido }: CheckoutMPProps) {
  const { limpiarCarrito } = useCarrito();

  const [compra, setCompra] = useState<boolean>(false);

    const post = async () => {
        getPreferenceMP()
    }
  
  const getPreferenceMP = async () => {
    if (pedido.total > 0) {
        const response:IPedidoCompleto = await createPreferenceMP({
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
        console.log("LA RESPUESTA DEL MERCADOPAGO PAPII")
        console.log(response)
        if ( response.factura != undefined){
          EmailFactura(response.factura)
          handleCompra(response.factura?.mpPreferenceId, )
        }
        /*
          if (response.estado === "RECHAZADO") {
            pedidoEnviado(3);
          } else {
            
            handleCompra(response.id, res.id) //Se llama a la API de mercado pago
          }
          */
    } else {
      toast.error('Agrega al menos un elemento a tu pedido')
  }
  }

  const handleCompra = (idPreference: string) => {
    toast.success(`Se a guardado el pedido
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
                </button>) : (<progress className="progress progress-info mt-5 w-full "></progress>)}

            </div>
        </>
  );
}

export default CheckoutMP;