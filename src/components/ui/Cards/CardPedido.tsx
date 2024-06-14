import React, { FC, useState } from "react";
import { IPedido } from "../../../types/Pedidos";

export const CardPedido: FC<IPedido> = ({
  id,
  estado,
  fechaPedido,
  formaPago,
  horaEstimadaFinalizacion,
  tipoEnvio,
  total,
  detallesPedido,
  sucursal,
  factura
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative h-full card card-compact w-52 shadow-xl">
      <div className="card-title flex justify-center pt-5">Pedido Nro {id}</div>
      <div className="card-body">
        <p className="flex w-full justify-between">
          Fecha: <b>{fechaPedido}</b>
        </p>
        {estado === "PENDIENTE" ? (
          <p className="flex w-full justify-between">
            Estado: <b className="text-sky-500">{estado}</b>
          </p>
        ) : estado === "PREPARACION" ? (
          <p className="flex w-full justify-between">
            Estado: <b className="text-yellow-500">{estado}</b>
          </p>
        ) : estado === "CANCELADO" || estado === "RECHAZADO" ? (
          <p className="flex w-full justify-between">
            Estado: <b className="text-red-500">{estado}</b>
          </p>
        ) : (
          <p className="flex w-full justify-between">
            Estado: <b className="text-green-500">{estado}</b>
          </p>
        )}
        <button
              className="p-2 rounded-md w-full bg-red-600 text-white text-base mt-2 font-semibold"
              onClick={openModal}
            >
              Ver Artículos
            </button>
        <div
          tabIndex={0}
          className="collapse collapse-arrow border border-base-300 bg-base-200"
        >
          <div className="collapse-title text-base font-medium">
            Ver detalles
          </div>
          <div className="collapse-content w-full">
            <p className="flex w-full justify-between font-semibold">
              Total: <b className="font-bold">${total}</b>
            </p>
            <p className="flex w-full justify-between font-semibold">
              Pago: <b className="font-bold">{formaPago}</b>
            </p>
            {estado === "ENTREGADO" ? (
              <p className="flex w-full justify-between font-semibold">
                Finalizó: <b className="font-bold">{horaEstimadaFinalizacion}</b>
              </p>
            ) : (
              <div></div>
            )}
            <p className="flex w-full justify-between font-semibold">
              Envío: <b className="font-bold">{tipoEnvio}</b>
            </p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed z-50 inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-red-600 text-white p-4 rounded-md relative">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
            <h3 className="font-bold text-lg flex justify-center p-7">Artículos Pedido Nro {id}</h3>
            <div className="px-1 space-y-4 py-5 bg-white rounded text-black">
            {detallesPedido.map((pedido: IDetallePedido)=> (
                pedido.articuloInsumo === null || pedido.articuloManufacturado ? (
                    <p className="flex w-full justify-between px-2  font-semibold">{pedido.articuloManufacturado?.denominacion}: <b className="font-bold">{pedido.cantidad}</b></p>
                ) : pedido.articuloInsumo ? (
                    <p className="justify-between flex w-full px-2 font-semibold">{pedido.articuloInsumo.denominacion}: <b className="font-bold">{pedido.cantidad}</b></p>
                ) : (
                    <div></div>
                )
            ))}
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};
