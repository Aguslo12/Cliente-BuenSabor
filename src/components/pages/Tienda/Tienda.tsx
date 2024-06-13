import React, { useState } from "react";
import ContainerCategoria from "../../ui/Containers/ContainerCategoria";
import { BsBagPlusFill } from "react-icons/bs";
import { RiDiscountPercentFill } from "react-icons/ri";
import { ContainerPromocion } from "../../ui/Containers/ContainerPromocion";
import { ContainerArticulos } from "../../ui/Containers/ContainerArticulos";

const Tienda = () => {
  const [estado, setEstado] = useState<boolean>(false);

  const productos = () => {
    setEstado(false);
  };

  const promociones = () => {
    setEstado(true);
  };

  return (
    <div className="flex h-screen flex-row">
      <div className="flex z-40 flex-col space-y-3 items-center justify-start pt-5 bg-red-600 h-full w-[270px] mt-[75px] text-white">
        <div className="flex justify-start w-full pl-2">
          <p className="justify-center w-full flex font-semibold">Qué elegir</p>
        </div>
        <button
          onClick={() => productos()}
          className="flex btn btn-ghost hover:bg-white hover:text-slate-900 w-64 justify-start text-lg"
        >
          <BsBagPlusFill className="text-3xl pr-2" />
          Productos
        </button>
        <button
          onClick={() => promociones()}
          className="flex btn btn-ghost hover:bg-white hover:text-slate-900 w-64 justify-start text-lg"
        >
          <RiDiscountPercentFill className="text-[30px] pr-2" />
          Promociones
        </button>
      </div>
      {estado ? (
        <ContainerPromocion />
      ) : (
        <div>
          <ContainerCategoria />
          <ContainerArticulos />
        </div>
      )}
    </div>
  );
};

export default Tienda;
