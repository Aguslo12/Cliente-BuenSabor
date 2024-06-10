import { ILocalidad } from "./Domicilio/Localidad";


export interface IDomicilioCompleto {
    id: number,
    nombre: string
    eliminado: boolean,
    calle: string,
    numero: number,
    cp: number,
    piso: number,
    nroDpto: number,
    localidad: ILocalidad,
}