import { ISucursalShortDto } from "./SucursalShortDto";

export interface IClienteDto {
    id: number;
    eliminado: boolean;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    sucursales: ISucursalShortDto
}