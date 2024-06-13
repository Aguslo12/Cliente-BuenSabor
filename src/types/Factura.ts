export interface IFactura {
    id: number;
    eliminado: boolean;
    fechaFcturacion: string | null;
    mpPaymentId: number;
    mpMerchantOrderId: number;
    mpPreferenceId:string;
    mpPaymentType:string;
    formaPago: string;
    totalVenta: number;
}