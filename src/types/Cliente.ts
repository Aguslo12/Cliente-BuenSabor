import { IDomicilio } from "./Domicilio/Domicilio"
import { IImagen } from "./Imagen"
import { IPedido } from "./Pedidos"
import { IUsuario } from "./Usuario"

export interface ICliente {
    id: number
    eliminado: boolean
    nombre: string
    apellido: string
    telefono: string
    email: string
    usuario: IUsuario
    imagenCliente: IImagen
    domicilios: IDomicilio[] | unknown
    pedidos: IPedido[]
}