import { ILocalidad } from "../Domicilio/Localidad"
import { IImagen } from "../Imagen"
import { IPedido } from "../Pedidos"
import { IUsuario } from "../Usuario"
import { IDomicilioUpdate } from "./DomicilioUpdateDto"

export interface IClienteUpdate {
    id: number
    eliminado: boolean
    nombre: string
    localidad: ILocalidad
    apellido: string
    telefono: string
    email: string
    usuario: IUsuario
    imagenCliente: IImagen
    domicilios: IDomicilioUpdate[]
    pedidos: IPedido[]
}