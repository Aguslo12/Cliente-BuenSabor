import emailjs from "emailjs-com";
import { ICliente } from "../../types/Cliente";
import { IFactura } from "../../types/Factura";

const createFormattedMessage = (formState: IFactura): string => {
  console.log("LA FACTURA QUE SE VA A ENVIAR POR EMAIL PERRITOOO");
  console.log(formState);

  const facturaDetailsMercadoPago = formState
    ? `Número de factura: ${formState.mpPaymentId}\nTotal: $ ${formState.totalVenta}\n
      Fecha de facturación: ${formState.fechaFcturacion}\nForma de pago: ${formState.formaPago}\n
      MercadoPago Payment Id: ${formState.mpPaymentId}\n Mercado Pago Preference Id:${formState.mpPreferenceId}`
    : "No hay factura asociada";

  const facturaDetailsEfectivo = formState
    ? `Número de factura: ${formState.mpPaymentId}\nTotal: $ ${formState.totalVenta}\n
      Fecha de facturación: ${formState.fechaFcturacion}\nForma de pago: ${formState.formaPago}\n`
    : "No hay factura asociada";

  if (formState.formaPago === "EFECTIVO") {
    return `
      Factura del pedido:
      --------------------
      ID: ${formState.id}
      ------Factura-------
      ${facturaDetailsEfectivo}
    `;
  } else {
    return `
      Factura del pedido:
      --------------------
      ID: ${formState.id}
      ------Factura-------
      ${facturaDetailsMercadoPago}
    `;
  }
};

const sendEmail = async (formState: IFactura) => {
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
