import { IDomicilio } from "./Domicilio/Domicilio";
import { IImagen } from "./Imagen";
import { ISucursal } from "./Sucursal";

export interface IEmpleado {
    id: number;
    eliminado: boolean;
    nombre: string
    apellido: string
    telefono: string
    email: string
    imagenPersona: IImagen
    domicilios: IDomicilio[]
    tipoEmpleado: string;
    pedidos : string[]
    sucursal: ISucursal
}