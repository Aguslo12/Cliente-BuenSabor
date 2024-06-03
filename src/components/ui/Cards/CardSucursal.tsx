import React, { FC } from "react";
import { ISucursalShort } from "../../../types/ShortDtos/SucursalShort";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";

const CardSucursal: FC<ISucursalShort> = ({
  domicilio,
  eliminado,
  esCasaMatriz,
  horarioApertura,
  horarioCierre,
  id,
  idEmpresa,
  nombre,
  imagenes,
}) => {



  return (
    <>
      <Link
        className="bg-white shadow-md border hover:border rounded-md hover:border-black mx-4 overflow-hidden size-40 w-72"
        to={`categorias/${id}`}
      >
        <div className="">
          {imagenes.map((foto) => (
            <img src={foto.url} alt={foto.name} className="h-28 w-full" />
          ))}
        </div>
        <div className="flex w-full">
          <h1 className="flex text-black font-semibold p-3 text-left w-full">
            {nombre}
          </h1>
          <p className="flex text-right items-center p-3">
            <FaAngleRight/>
          </p>
        </div>
      </Link>
    </>
  );
};

export default CardSucursal;
