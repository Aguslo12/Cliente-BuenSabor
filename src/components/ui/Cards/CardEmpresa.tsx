import { FC } from "react";
import { IEmpresaShort } from "../../../types/ShortDtos/EmpresaShort";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux";
import { setIdEmpresa } from "../../../redux/slices/idEmpresa";

export const CardEmpresa: FC<IEmpresaShort> = ({ nombre, imagenes, id }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function pushCard(nombre: string) {
    dispatch(setIdEmpresa(String(id)));
    const idEmpresa = id;
    navigate(`/${idEmpresa}/sucursales`, { state: { nombre } });
  }

  return (
    <>
      <div className="bg-white group transition-all hover:scale-105 rounded-md cursor-pointer overflow-hidden size-40 w-72 m-2" onClick={() => pushCard(nombre)}>
        <div>
          {imagenes.map((foto) => (
            <img src={foto.url} alt={foto.name} className="h-28 w-full" key={foto.url} />
          ))}
        </div>
        <div className="flex w-full transition-all">
          <h1 className="flex text-black group-hover:text-red-600 font-semibold p-3 text-left w-full">
            {nombre}
          </h1>
          <p className="flex text-right group-hover:text-red-600 items-center p-3">
            <FaAngleRight />
          </p>
        </div>
      </div>
    </>
  );
};
