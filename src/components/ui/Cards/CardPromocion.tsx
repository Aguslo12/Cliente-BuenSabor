import React, { FC } from "react";
import { IPromosShort } from "../../../types/ShortDtos/PromoShort";
import { FaAngleRight } from "react-icons/fa";

export const CardPromocion: FC<IPromosShort> = ({
  denominacion,
  descripcionDescuento,
  detalles,
  eliminado,
  fechaDesde,
  fechaHasta,
  horaDesde,
  horaHasta,
  id,
  imagenes,
  precioPromocional,
  tipoPromocion,
}) => {
  return (
    <>
      <div className="bg-white shadow-md border hover:border rounded-md hover:border-black mx-4 overflow-hidden size-48 w-72">
        <div className="">
          {imagenes.map((foto) => (
            <img src={foto.url} alt={foto.name} className="h-28 w-full" />
          ))}
        </div>
        <div className="flex flex-col">
          <div className="flex w-full">
            <h1 className="flex text-black font-semibold w-full p-3 text-left">
              {denominacion}
            </h1>
            <p className="flex text-right items-center p-3">
              <FaAngleRight />
            </p>
          </div>
          <div className="flex">
            <p className="px-3 font-semibold ">Hasta: </p>
            <p className=" text-green-500 font-semibold ">{fechaHasta}</p>
          </div>
        </div>
      </div>
    </>
  );
};
