import ContainerEmpresa from "../../ui/Containers/ContainerEmpresa";
import { ContainerPromocion } from "../../ui/Containers/ContainerPromocion";

export const EmpresaInicio = () => {
  return (
    <div className="w-2/3 flex h-2/4 justify-center pt-36 flex-col">
      <h1 className="flex text-3xl font-semibold p-5 pb-10">Hola. ¿Qué vas a pedir hoy?</h1>

      <div>
        <p className="text-3xl font-semibold flex p-5">Empresas</p>
        <ContainerEmpresa />
      </div>

      <div className="mt-10">
        <p className="text-3xl font-semibold flex p-5">Nuestras Promos</p>
        <ContainerPromocion/>
      </div>
    </div>
  );
};
