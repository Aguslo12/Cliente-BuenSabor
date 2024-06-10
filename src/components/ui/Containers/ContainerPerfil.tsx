import React, { FC } from "react";

interface iContainerPerfil {
  estado: boolean;
}

export const ContainerPerfil: FC<iContainerPerfil> = ({ estado }) => {
  return (
    <div className="flex h-full">
      <div className="flex mt-20">
        <h1 className="flex font-bold text-5xl mt-10 ml-10 ">Configuración</h1>
      </div>
    </div>
  );
};
