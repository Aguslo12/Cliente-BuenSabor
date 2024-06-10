import { IArticuloInsumo } from "./ArticuloInsumo"
import { IArticuloManufacturado } from "./ArticuloManufacturado"

export interface IDetallePedidoDos {
    id: number
    eliminado:boolean
    cantidad: number
    subTotal: number
    articuloInsumo: IArticuloInsumo | null
    articuloManufacturado: IArticuloManufacturado | null
}