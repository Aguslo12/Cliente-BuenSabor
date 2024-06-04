import React, { useEffect, useState } from "react";
import { BackendMethods } from "../../../services/BackendClient";
import { IEmpresaShort } from "../../../types/ShortDtos/EmpresaShort";
import { CardEmpresa } from "../Cards/CardEmpresa";

const ContainerEmpresa = () => {
  const backend = new BackendMethods();

  const [empresas, SetEmpresas] = useState<IEmpresaShort[]>([]);

  useEffect(() => {
    const traerEmpresas = async () => {
      const res: IEmpresaShort[] = (await backend.getAll(
        `${import.meta.env.VITE_LOCAL}empresa/noEliminados`
      )) as IEmpresaShort[];
      SetEmpresas(res);
    };
    traerEmpresas();
  }, []);
  return (
    <div className="flex flex-row flex-wrap ">
      {empresas.map((empresa, index) => (
        <CardEmpresa
          cuil={empresa.cuil}
          id={empresa.id}
          nombre={empresa.nombre}
          razonSocial={empresa.razonSocial}
          key={index}
          eliminado={empresa.eliminado}
          imagenes={empresa.imagenes}
          sucursales={empresa.sucursales}
        />
      ))}
    </div>
  );
};

export default ContainerEmpresa;
