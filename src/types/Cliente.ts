import { IDomicilio } from "./Domicilio/Domicilio"
import { ILocalidad } from "./Domicilio/Localidad"
import { IImagen } from "./Imagen"
import { IPedido } from "./Pedidos"
import { IUsuario } from "./Usuario"

export interface ICliente {
    id: number
    eliminado: boolean
    nombre: string
    localidad: ILocalidad
    apellido: string
    telefono: string
    email: string
    usuario: IUsuario
    imagenCliente: IImagen
    domicilios: IDomicilio[]
    pedidos: IPedido[]
}