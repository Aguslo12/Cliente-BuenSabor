export interface IFactura {
    id: number;
    eliminado: boolean;
    fechaFacturacion: string | null;
    mpPaymentId: number;
    mpMerchantOrderId: number;
    mpPreferenceId:string;
    mpPaymentType:string;
    formaPago: string;
    totalVenta: number;
}