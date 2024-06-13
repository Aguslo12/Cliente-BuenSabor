import React, { useState } from "react";
import ContainerCategoria from "../../ui/Containers/ContainerCategoria";
import ContainerArticulos from "../../ui/Containers/ContainerArticulos";
import { ContainerPromocion } from "../../ui/Containers/ContainerPromocion";
import { FaLocationDot } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

const Tienda = () => {
  const [estado, setEstado] = useState<boolean>(false);

  const productos = () => {
    setEstado(false);
  };

  const promociones = () => {
    setEstado(true);
  };

  return (
    <div className="flex flex-row">
      <div className="h-screen flex bg-red-600 w-[270px]">
        <p className="justify-center w-full flex font-semibold">Qué elegir</p>
        
          <button
            onClick={() => productos()}
            className="flex btn btn-ghost hover:bg-white hover:text-slate-900 w-64 justify-start text-lg"
          >
            <FaUserCircle className="text-3xl pr-2" />
            Editar Perfil
          </button>
          <button
            onClick={() => promociones()}
            className="flex btn btn-ghost hover:bg-white hover:text-slate-900 w-64 justify-start text-lg"
          >
            <FaLocationDot className="text-[30px] pr-2" />
            Editar Direcciones
          </button>
        
      </div>
      <div>
        <ContainerCategoria />
        <ContainerArticulos />
      </div>
      {/*<ContainerPromocion /> */}
    </div>
  );
};

export default Tienda;
