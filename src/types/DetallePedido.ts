import { IArticuloManufacturado } from "./ArticuloManufacturado"

export interface IDetallePedido {
    id: number
    cantidad: number
    subTotal: number
    articulo: IArticuloManufacturado
}