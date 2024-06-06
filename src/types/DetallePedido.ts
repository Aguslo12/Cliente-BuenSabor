import { IArticuloManufacturado } from "./ArticuloManufacturado"

export interface IDetallePedido {
    id: number
    eliminado:boolean
    cantidad: number
    subTotal: number
    articulo: IArticuloManufacturado
}