import { IClienteDto } from "./CreateDtos/ClienteShortDto"
import { IDomicilioDto } from "./CreateDtos/DomicilioDto"
import { ISucursalDto } from "./CreateDtos/SucursalDto"
import { IDetallePedidoIdArt } from "./DetallePedidoIdArt"
import { IEmpleado } from "./Empleado"
import { IFactura } from "./Factura"
import { IHoraEstimadaFinalizacion } from "./HoraEstimadaFinalizacion"

export interface IPedido {
    id: number
    horaEstimadaFinalizacion: IHoraEstimadaFinalizacion | null
    total: number
    totalCosto: number
    estado: string
    tipoEnvio: string
    formaPago: string
    fechaPedido: string | null
    detallesPedido: IDetallePedidoIdArt[] 
    domicilio: IDomicilioDto
    cliente: IClienteDto
    sucursal: ISucursalDto
    empleado: IEmpleado
    factura: IFactura
}