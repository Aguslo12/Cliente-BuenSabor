import { IArticuloInsumo } from "./ArticuloInsumo"
import { IArticuloManufacturado } from "./ArticuloManufacturado"

export interface IDetallePedido {
    id: number
    eliminado:boolean
    cantidad: number
    subTotal: number
    articuloInsumo: IArticuloInsumo
    articuloManufacturado: IArticuloManufacturado 
}