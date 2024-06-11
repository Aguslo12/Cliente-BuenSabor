import PreferenceMP from "../../types/MercadoPago/PreferenceMp";
import { IPedidoCompleto } from "../../types/PedidoCompleto";
import { IPedido } from "../../types/Pedidos";

export const fetchData = async (url: string) => {
    const response = await fetch(url);
    const dataJSON = await response.json();
    return dataJSON;
  };

  export const postPedido = async (pedido: IPedido) => {
    const response = await fetch('http://localhost:8080/pedido/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedido)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(response)
    return await response.json();
}
  
  export async function createPreferenceMP(pedido?: IPedidoCompleto) {
    console.log("ESTE ES EL PEDIDO")
    console.log(pedido)
  const urlServer = "http://localhost:8080/pedido/api/create_preference_mp";
  const method: string = "POST";
  const response = await fetch(urlServer, {
    method: method,
    body: JSON.stringify(pedido),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  if (data && data.id) {
    return data as PreferenceMP;
  } else {
    throw new Error('Error: Response is undefined or id is not present in the response');
  }
}