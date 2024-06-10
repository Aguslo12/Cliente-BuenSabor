import { IArticuloInsumo } from "./ArticuloInsumo"
import { IArticuloManufacturado } from "./ArticuloManufacturado"
import { IPromos } from "./Promos"

export interface IDetallePedido {
    id: number
    eliminado:boolean
    cantidad: number
    subTotal: number
    articulo: IArticuloInsumo | IArticuloManufacturado | null
    promocion: IPromos | null
}