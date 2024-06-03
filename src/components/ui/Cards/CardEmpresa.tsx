import { FC } from "react";
import { IEmpresaShort } from "../../../types/ShortDtos/EmpresaShort";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const CardEmpresa: FC<IEmpresaShort> = ({ nombre, imagenes, id }) => {

  const navigate = useNavigate();

  function pushCard(nombre: string) {
    const idEmpresa = id;
    navigate(`/${idEmpresa}/sucursales`, { state: { nombre } })
  }

  return (
    <>
      <a className="bg-white shadow-md border hover:border rounded-md hover:border-black mx-4 overflow-hidden size-40 w-72" onClick={() => pushCard(nombre)}>
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
      </a>
    </>
  );
};
