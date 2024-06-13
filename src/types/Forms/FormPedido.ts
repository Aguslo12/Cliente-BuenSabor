import { IDetallePedidoIdArt } from "../DetallePedidoIdArt";
import { IEmpleado } from "../Empleado";
import { IFactura } from "../Factura";
import { IHoraEstimadaFinalizacion } from "../HoraEstimadaFinalizacion";

export interface IFormPedido {
    id: number;
    eliminado: boolean;
    detallesPedido: IDetallePedidoIdArt[];
    total: number;
    estado: string;
    tipoEnvio: string;
    idCliente: number | undefined;
    idDomicilio: number | undefined;
    idSucursal: number | undefined;
    factura: IFactura | null;
    formaPago: string;
    fechaPedido: string | null;
    horaEstimadaFinalizacion: IHoraEstimadaFinalizacion | null;
    totalCosto: number;
    empleado: IEmpleado | null;
  }