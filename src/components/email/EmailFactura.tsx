import emailjs from "emailjs-com";
import { IPedido } from "../../types/Pedidos";
import { ICliente } from "../../types/Cliente";

  const createFormattedMessage = (formState: IPedido): string => {
    console.log("ACA ARARHASDKJHASDKASHDJSASHKHASDKJASDJAKSDSKJH")
    console.log(formState)

    const detallesPedidoFormatted = formState.detallesPedido.map((detalle) => {
      return `- Producto: ${detalle.idArticulo}, Cantidad: ${detalle.cantidad}`;
    }).join('\n');
  
    const facturaDetails = formState.factura ? 
      `Número de factura: ${formState.factura.mpPaymentId}\nTotal: ${formState.factura.totalVenta}` : 
      'No hay factura asociada';
  
    const empleadoDetails = formState.empleado ? 
      `Empleado asignado: ${formState.empleado.nombre}\nCargo: ${formState.empleado}` : 
      'No hay empleado asignado';
  
    return `
      Detalles del pedido:
      --------------------
      ID: ${formState.id}
      Detalles del pedido:
      ${detallesPedidoFormatted}
      Total: ${formState.total}
      Estado: ${formState.estado}
      Tipo de envío: ${formState.tipoEnvio}
      Cliente: ${formState.cliente.nombre || 'No especificado'}
      Domicilio: ${formState.domicilio.calle || 'No especificado'}
      Sucursal: ${formState.sucursal.nombre || 'No especificado'}
      Factura:
      ${facturaDetails}
      Forma de pago: ${formState.formaPago}
      Fecha del pedido: ${formState.fechaPedido || 'No especificada'}
      Hora estimada de finalización: ${formState.horaEstimadaFinalizacion ? formState.horaEstimadaFinalizacion : 'No especificada'}
      Total costo: ${formState.totalCosto}
      ${empleadoDetails}
    `;
  };
  
  const sendEmail = async (formState: IPedido) => {
    const storedCliente = sessionStorage.getItem("cliente");
  let user: ICliente | undefined = undefined;

  if (storedCliente) {
    user = JSON.parse(storedCliente) as ICliente;
  }

    console.log("Sending email...");
  
    const formattedMessage = createFormattedMessage(formState);
  
    const templateParams = {
      to_name: user?.nombre,
      from_name: "El Buen Sabor",
      message: formattedMessage,
      reply_to: "buensabor@gmail.com",
      to_email: user?.email,
    };
  
    try {
      const response = await emailjs.send(
        "service_e26ov8b",
        "template_qrs2ut9",
        templateParams,
        "CWi8yqSo1Fiogn85l"
      );
      console.log("Email sent successfully!", response.status, response.text);
    } catch (error) {
      console.error("Failed to send email.", error);
    }
  };
  
  export default sendEmail;