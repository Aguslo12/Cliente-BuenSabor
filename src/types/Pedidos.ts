import { IDetallePedido } from "./DetallePedido"

export interface IPedido {
    id: number
    horaFinalizacion: string
    total: number
    totalCosto: number
    estado: string
    tipoEnvio: string
    formaPago: string
    fechaPedido: string
    detallesPedido: IDetallePedido[] 
}