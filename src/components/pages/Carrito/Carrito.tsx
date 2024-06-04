import { useEffect } from "react";
import { CardArticuloCarrito } from "../../ui/Cards/CardArticuloCarrito";
import { ContainerCarrito } from "../../ui/Containers/ContainerCarrito";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useSucursalContext } from "../../../hooks/useContext";
import "react-toastify/dist/ReactToastify.css";

export const Carrito = () => {
  const { str, pedidoEnviado } = useSucursalContext();

  useEffect(() => {
    if (str === 1) {
      toast.success("Pedido realizado con éxito!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } else if (str === 2) {
      toast.error("Hubo un error al pagar el pedido", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
    pedidoEnviado(0);
  }, [str]);

  return (
    <div className=" h-screen">
      <div className="flex w-screen pt-16 h-full">
        <div className="w-full flex flex-row">
          <CardArticuloCarrito />
        </div>
        <ContainerCarrito />
        <>
          <ToastContainer />
        </>
      </div>
    </div>
  );
};
