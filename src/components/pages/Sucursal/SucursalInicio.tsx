import React from "react";
import ContainerSucursal from "../../ui/Containers/ContainerSucursal";
import { useLocation } from "react-router-dom";

const SucursalInicio = () => {
  const location = useLocation();

  const nombreEmpresa = location?.state?.nombre;

  console.log(nombreEmpresa);

  return (
    <div className="flex h-auto justify-center w-screen pt-24">
      <div className="flex flex-col">
        <div className="flex flex-col justify-center items-center w-full">
        <p className="text-3xl text-start font-semibold flex p-5 text-red-500">Sucursales</p>
          {/* <p className="text-3xl font-semibold flex p-5">Sucursales de {nombreEmpresa}</p> */}
          <div className="flex flex-row flex-wrap justify-center">
          <ContainerSucursal />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SucursalInicio;
