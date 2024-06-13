import { IArticuloInsumo } from "./ArticuloInsumo";
import { IArticuloManufacturado } from "./ArticuloManufacturado";

export interface IDetallePromo {
  id: number;
  eliminado:boolean;
  descripcionDescuento: string;
  tipoPromocion: string;
  cantidad: number;
  articulosManufacturados: IArticuloManufacturado | undefined;
  insumos: IArticuloInsumo | undefined;
}
