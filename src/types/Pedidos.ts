import { IDetallePedido } from "./DetallePedido"
import { IHoraEstimadaFinalizacion } from "./HoraEstimadaFinalizacion"

export interface IPedido {
    id: number
    horaFinalizacion: IHoraEstimadaFinalizacion | null
    total: number
    totalCosto: number
    estado: string
    tipoEnvio: string
    formaPago: string
    fechaPedido: string | null
    detallesPedido: IDetallePedido[] 
}