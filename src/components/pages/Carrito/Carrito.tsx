import { useEffect } from "react";
import { CardArticuloCarrito } from "../../ui/Cards/CardArticuloCarrito";
import { ContainerCarrito } from "../../ui/Containers/ContainerCarrito";
import {  useCarrito } from "../../../hooks/useContext";
import "react-toastify/dist/ReactToastify.css";

export const Carrito = () => {
  const { cart } = useCarrito();


  return (
    <div className=" h-screen">
      <div className="flex w-screen pt-16 h-full">
        <div className="w-full flex flex-row">
          <CardArticuloCarrito />
        </div>
        {cart.length > 0 ? (
          <ContainerCarrito />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
