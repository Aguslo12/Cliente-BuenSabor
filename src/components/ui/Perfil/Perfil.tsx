import React, { useState } from "react";
import { ICliente } from "../../../types/Cliente";
import { BackendMethods } from "../../../services/BackendClient";

export const Perfil = () => {
  const storedCliente = sessionStorage.getItem("cliente");
  let initialClient: ICliente | null = null;

  if (storedCliente) {
    initialClient = JSON.parse(storedCliente) as ICliente;
  }

  const [client, setClient] = useState<ICliente | null>(initialClient);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editClient, setEditClient] = useState<ICliente | null>(initialClient);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editClient) {
      setEditClient({
        ...editClient,
        [name]: value,
      });
    }
  };

  const handleSave = async () => {
    const backend = new BackendMethods();
    if (editClient) {
      try {
        const res = await backend.put(
          `${import.meta.env.VITE_LOCAL}cliente/${editClient.id}`,
          editClient
        );
        setClient(editClient);
        setIsModalOpen(false);
        // Maneja la respuesta según sea necesario
      } catch (error) {
        console.error("Error al actualizar el cliente:", error);
        // Maneja el error según sea necesario
      }
    }
  };

  return (
    <div className="flex text-black ml-10 pt-10 flex-col w-[430px] space-y-5">
      <p className="text-2xl font-bold mb-4">Editar Perfil</p>
      <div className="flex flex-row p-5 shadow-lg rounded-3xl bg-white">
        <div className="flex flex-col items-center">
          <img
            src={client?.imagenCliente.url}
            alt="Foto del Cliente"
            className="border-8 rounded-full border-red-600 h-48 object-cover"
          />
          <button
            className="mt-5 w-32 justify-center text-white bg-red-600 btn btn-error"
            onClick={handleOpenModal}
          >
            Editar foto
          </button>
        </div>
        <div className="ml-10 flex flex-col space-y-3">
          <p className="text-lg font-semibold">Información del Cliente</p>
          <p><strong>Nombre:</strong> {client?.nombre}</p>
          <p><strong>Apellido:</strong> {client?.apellido}</p>
          <p><strong>Correo:</strong> {client?.email}</p>
          <p><strong>Teléfono:</strong> {client?.telefono}</p>
          <p className="text-lg font-semibold mt-4">Información del Usuario</p>
          <p><strong>Usuario:</strong> {client?.usuario.userName}</p>
          <button
            className="mt-5 w-32 justify-center text-white bg-red-600 btn btn-error"
            onClick={handleOpenModal}
          >
            Editar información
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Editar Información del Cliente</h2>
            <div className="flex flex-col space-y-3">
              <input
                type="text"
                name="nombre"
                value={editClient?.nombre || ""}
                onChange={handleChange}
                className="p-2 border rounded"
                placeholder="Nombre"
              />
              <input
                type="text"
                name="apellido"
                value={editClient?.apellido || ""}
                onChange={handleChange}
                className="p-2 border rounded"
                placeholder="Apellido"
              />
              <input
                type="email"
                name="email"
                value={editClient?.email || ""}
                onChange={handleChange}
                className="p-2 border rounded"
                placeholder="Correo"
              />
              <input
                type="tel"
                name="telefono"
                value={editClient?.telefono || ""}
                onChange={handleChange}
                className="p-2 border rounded"
                placeholder="Teléfono"
              />
              <div>
                Usuario
              </div>
              <input
                type="text"
                name="usuario.userName"
                value={editClient?.usuario.userName || ""}
                onChange={handleChange}
                className="p-2 border rounded input-bordered"
                placeholder="Usuario"
              />
              <div className="flex justify-end space-x-3">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={handleSave}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
