import React from "react";
import ContainerSucursal from "../../ui/Containers/ContainerSucursal";
import { useLocation } from "react-router-dom";

const SucursalInicio = () => {
  const location = useLocation();

  const nombreEmpresa = location?.state?.nombre;

  console.log(nombreEmpresa);

  return (
    <div className="h-screen flex justify-center">
      <div className="w-2/3 flex h-2/4 justify-center pt-36 flex-col">
        <div>
          <p className="text-3xl font-semibold flex p-5">Sucursales de {nombreEmpresa}</p>
          <ContainerSucursal />
        </div>
        <div className="mt-10">
          <p className="text-3xl font-semibold flex p-5">Nuestras Promos</p>
        </div>
      </div>
    </div>
  );
};

export default SucursalInicio;
