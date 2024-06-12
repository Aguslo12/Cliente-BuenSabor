import React, { FC } from 'react'

interface ModalDireccionProps {
    closeModal: () => void;
}

export const ModalDetalleArt: FC<ModalDireccionProps> = ({
    closeModal,
}) => {
  return (
    <div className="bg-red-600 text-white p-4 rounded-md relative">
      <button
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        onClick={closeModal}
      >
        ✕
      </button>
      <h3 className="font-bold text-lg flex justify-center p-7">
        Añadir Domicilio
      </h3>
    </div>
  )
}
