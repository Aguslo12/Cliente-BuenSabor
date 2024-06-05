import React, { FC } from "react";
import { ISucursalShort } from "../../../types/ShortDtos/SucursalShort";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import { useSucursalContext } from "../../../hooks/useContext";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setGlobalSucursal } from "../../../redux/slices/globalSucursal";

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

  const { updateSucursal } = useSucursalContext();

  const selectedIdSucursal = useAppSelector((state) => state.GlobalSucursal.selected)

  const dispatch = useAppDispatch();

  const actualizar = () => {

    dispatch(setGlobalSucursal(id))

    const detalle: ISucursalShort = {
      id: id,
      domicilio: domicilio,
      eliminado: eliminado,
      esCasaMatriz: esCasaMatriz,
      horarioApertura: horarioApertura,
      horarioCierre: horarioCierre,
      idEmpresa: idEmpresa,
      imagenes: imagenes,
      nombre: nombre,
    }
    updateSucursal(detalle)
    console.log("DETALLE SCURUSALES")
    console.log(detalle)
  }

  return (
    <>


      <Link
        className="bg-white  group transition-all hover:scale-105 rounded-md cursor-pointer  overflow-hidden size-40 w-72 m-5 shadow-md "
        to={`categorias/${id}`}
        onClick={actualizar}
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
            <FaAngleRight />
          </p>
        </div>
      </Link>
    </>
  );
};

export default CardSucursal;
