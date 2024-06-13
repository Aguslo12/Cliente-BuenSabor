import { IImagen } from "../Imagen";
import { IDomicilioDto } from "./DomicilioDto";

export interface ISucursalShortDto {
    id: number;
    eliminado: boolean;
    esCasaMatriz: boolean;
    nombre: string;
    horarioApertura: string;
    horarioCierre: string;
    domicilio: IDomicilioDto;
    imagenes: IImagen[];
    // empresa: IEmpresa;
  }