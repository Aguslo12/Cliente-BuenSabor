import { FC } from "react";
import { ISucursalShort } from "../../../types/ShortDtos/SucursalShort";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import { useCarrito, useSucursalContext } from "../../../hooks/useContext";
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

  const { updateSucursal, suc } = useSucursalContext();
  const { limpiarCarrito } = useCarrito()

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
    console.log(`sucId= ${suc?.id} detalleId= ${detalle.id}`)
    if(suc?.id !== detalle.id){
      limpiarCarrito()
      sessionStorage.setItem('sucursal',JSON.stringify(detalle))
      updateSucursal(detalle)
    }
  }

  return (
    <Link
      className="bg-white group transition-all hover:scale-105 rounded-md cursor-pointer overflow-hidden size-40 w-72 m-5 shadow-md"
      to={`categorias/${id}`}
      onClick={actualizar}
    >
      <div>
        {imagenes.map((foto) => (
          <img src={foto.url} alt={foto.name} className="h-28 w-full" key={foto.url} />
        ))}
      </div>
      <div className="flex w-full">
        <h1 className="flex text-black group-hover:text-red-600 font-semibold p-3 text-left w-full">
          {nombre}
        </h1>
        <p className="flex group-hover:text-red-600 text-right items-center p-3">
          <FaAngleRight />
        </p>
      </div>
    </Link>
  );
};

export default CardSucursal;
