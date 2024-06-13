import { IImagen } from "../Imagen";
import { IDomicilioDto } from "./DomicilioDto";
import { IEmpresaDto } from "./EmpresaDto";

export interface ISucursalDto {
    id: number;
    eliminado: boolean;
    esCasaMatriz: boolean;
    nombre: string;
    horarioApertura: string;
    horarioCierre: string;
    domicilio: IDomicilioDto;
    empresa: IEmpresaDto
    imagenes: IImagen[];
    // empresa: IEmpresa;
  }