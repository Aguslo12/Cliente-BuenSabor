import ContainerEmpresa from "../../ui/Containers/ContainerEmpresa";
import { ContainerPromocion } from "../../ui/Containers/ContainerPromocion";

export const EmpresaInicio = () => {
  return (
    <div className="w-full p-5 flex h-2/4 justify-center pt-36 flex-col">

      <div className="text-center flex justify-center items-center w-full">
        <h1 className="text-3xl font-bold text-center mt-4 w-max p-4 rounded-xl   text-white bg-red-600">Nuestras empresas afiliadas:</h1>
      </div>
      <div>
        <ContainerEmpresa />
      </div>
    </div>
  );
};
