import { IImagen } from "./Imagen";
import { ISucursal } from "./Sucursal";

export interface IEmpresa {
  id: number;
  nombre: string;
  razonSocial: string;
  cuil: number;
  sucursales: ISucursal[];
  imagenes: IImagen[];
}
