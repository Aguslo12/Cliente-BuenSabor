export interface IDetallePedidoIdArt {
    id: number
    cantidad: number
    subTotal: number
    idArticulo: number  | null
    idPromocion: number | null
}