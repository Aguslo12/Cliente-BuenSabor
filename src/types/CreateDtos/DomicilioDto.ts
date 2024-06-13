import { ILocalidad } from "../Domicilio/Localidad";

export interface IDomicilioDto {
    id: number,
    calle: string,
    numero: string,
    cp: string,
    piso: string,
    nroDpto: string,
    localidad: ILocalidad | null
}
