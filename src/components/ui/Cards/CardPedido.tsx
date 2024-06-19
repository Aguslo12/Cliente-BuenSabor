import React, { FC, useState } from "react";
import { IPedido } from "../../../types/Pedidos";
import { BackendMethods } from "../../../services/BackendClient";

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
  factura,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const backend = new BackendMethods();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const cancelarPedido = () => {
    const res = backend.put(
      `${import.meta.env.VITE_LOCAL}pedido/cambiarEstado/${id}`,
      "CANCELADO"
    );
  };

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
          className="p-2 rounded-md w-full bg-green-600 text-white text-base mt-2 font-semibold"
          onClick={openModal}
        >
          Ver Artículos
        </button>
        {estado === "PENDIENTE" ? (
          <button
            className="p-1 rounded-md w-full bg-red-600 text-white text-base font-semibold"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Cancelar
          </button>
        ) : (
          <div></div>
        )}
        <div
          tabIndex={0}
          className="collapse collapse-arrow border border-base-300 bg-base-200"
        >
          <div className="collapse-title text-base font-medium">
            Ver detalles
          </div>
          <div className="collapse-content w-full">
            <p className="flex w-full justify-between font-semibold">
              Total: <b className="font-bold text-green-600">${total}</b>
            </p>
            <p className="flex w-full justify-between font-semibold">
              Pago: <b className="font-bold">{formaPago}</b>
            </p>
            {estado === "ENTREGADO" ? (
              <p className="flex w-full justify-between font-semibold">
                Finalizó:{" "}
                <b className="font-bold">{horaEstimadaFinalizacion}</b>
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
            <h3 className="font-bold text-lg flex justify-center p-7">
              Artículos Pedido Nro {id}
            </h3>
            <div className="px-1 space-y-4 py-5 bg-white rounded text-black">
              {detallesPedido.map((pedido: IDetallePedido) =>
                pedido.articuloInsumo === null ||
                pedido.articuloManufacturado ? (
                  <p className="flex w-full justify-between px-2  font-semibold">
                    {pedido.articuloManufacturado?.denominacion}:{" "}
                    <b className="font-bold">{pedido.cantidad}</b>
                  </p>
                ) : pedido.articuloInsumo ? (
                  <p className="justify-between flex w-full px-2 font-semibold">
                    {pedido.articuloInsumo.denominacion}:{" "}
                    <b className="font-bold">{pedido.cantidad}</b>
                  </p>
                ) : (
                  <div></div>
                )
              )}
            </div>
          </div>
        </div>
      )}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg flex justify-center">¿Seguro que quiere cancelar el pedido nro. {id}?</h3>
          <div className="modal-action">
            <form method="dialog" className="flex justify-around w-full">
              <button className="btn bg-red-600 hover:text-red-600 hover:border-red-600 text-white">Cerrar</button>
              <button onClick={cancelarPedido} className="btn bg-green-600 hover:text-green-600 hover:border-green-600 text-white">Confirmar</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
