import { EmpresaInicio } from "../Empresa/EmpresaInicio"
import SucursalInicio from "../Sucursal/SucursalInicio"


export const Home = () => {
  return (
    <div className="h-screen  items-center flex align-middle justify-center">
      <SucursalInicio />
    </div>
  )
}
