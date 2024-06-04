import { CardArticuloCarrito } from "../../ui/Cards/CardArticuloCarrito";
import { ContainerCarrito } from "../../ui/Containers/ContainerCarrito";

export const Carrito = () => {
  return (
    <div className=" h-screen">
      <div className="flex w-screen pt-16 h-full">
        <div className="w-full flex flex-row">
        <CardArticuloCarrito />
        </div>
        <ContainerCarrito />
      </div>
    </div>
  );
};
