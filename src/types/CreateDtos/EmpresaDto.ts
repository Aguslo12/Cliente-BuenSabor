import { IImagen } from "../Imagen";

export interface IEmpresaDto {
    id: number;
    eliminado: boolean;
    nombre: string;
    razonSocial: string;
    cuil: number;
    imagenes: IImagen[]

}