import React, { useState } from "react";
import { ICliente } from "../../../types/Cliente";
import { Formik, Form, Field } from "formik";
import { BackendMethods } from "../../../services/BackendClient";
import { IClienteDto } from "../../../types/CreateDtos/ClienteShortDto";
import { IClienteUpdate } from "../../../types/CreateDtos/ClienteUpdateDto";

export const Perfil = () => {
  const storedCliente = sessionStorage.getItem("cliente");
  let initialClient: ICliente | null = null;

  if (storedCliente) {
    initialClient = JSON.parse(storedCliente) as ICliente;
  }

  console.log("ESTE ES EL CLIENTEEE");
  console.log(initialClient);

  const [client, setClient] = useState<IClienteUpdate | null>(initialClient);

  const handleSave = async (values: IClienteUpdate) => {
    const backend = new BackendMethods();
    try {
      // Incluimos los domicilios existentes en la actualización
      const updatedClient = {
        ...values,
      };

      console.log("ESTO ESTOY POR ENVIAR");
      console.log(values);
      const res = await backend.put(
        `${import.meta.env.VITE_LOCAL}cliente/${values.id}`,
        updatedClient
      );
      setClient(updatedClient);
      document.getElementById(`my_modal_${values.id}`)?.close();
      // Maneja la respuesta según sea necesario
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
      // Maneja el error según sea necesario
    }
  };

  return (
    <div className="flex text-black ml-10 pt-10 w-[530px] flex-col space-y-5">
      <p className="text-2xl font-bold mb-4">Perfil</p>
      <div className="flex flex-row p-5 shadow-lg rounded-3xl bg-white">
        <div className="flex flex-col items-center">
          <img
            src={client?.imagenCliente.url}
            alt="Foto del Cliente"
            className="border-8 rounded-full border-red-600 w-48 h-48 object-cover"
          />
        </div>
        <div className="ml-10 flex flex-col space-y-3">
          <p className="text-lg font-semibold">Información del Cliente</p>
          <hr />
          <p>
            <strong>Nombre:</strong> {client?.nombre}
          </p>
          <p>
            <strong>Apellido:</strong> {client?.apellido}
          </p>
          <p>
            <strong>Correo:</strong> {client?.email}
          </p>
          <p>
            <strong>Teléfono:</strong> {client?.telefono}
          </p>
          <hr />
          <p className="text-lg font-semibold mt-4">Información del Usuario</p>
          <hr />
          <p>
            <strong>Usuario:</strong> {client?.usuario.userName}
          </p>
          
        </div>
      </div>

      {client && (
        <dialog id={`my_modal_${client.id}`} className="modal">
          <Formik
            initialValues={{
              id: client.id,
              eliminado: client.eliminado,
              nombre: client.nombre,
              apellido: client.apellido,
              telefono: client.telefono,
              email: client.email,
              usuario: client.usuario,
              imagenCliente: client.imagenCliente,
              domicilios: [
                {
                  calle: client.domicilios[0].calle,
                  cp: client.domicilios[0].cp,
                  eliminado: client.domicilios[0].eliminado,
                  id: client.domicilios[0].id,
                  idLocalidad: client.domicilios[0].localidad.id,
                  nroDpto: client.domicilios[0].nroDpto,
                  numero: client.domicilios[0].numero,
                  piso: client.domicilios[0].piso,
                },
              ],
              pedidos: client.pedidos,
            }}
            onSubmit={handleSave}
          >
            <Form className="modal-box">
              <h2 className="text-xl font-bold mb-4 text-red-600">
                Editar Información del Cliente
              </h2>
              <div className="flex flex-col space-y-3">
                <label className="label">
                  <span className="label-text italic text-red-600">Nombre</span>
                  <Field
                    name="nombre"
                    type="text"
                    className="input input-bordered w-full"
                  />
                </label>
                <label className="label">
                  <span className="label-text italic text-red-600">
                    Apellido
                  </span>
                  <Field
                    name="apellido"
                    type="text"
                    className="input input-bordered w-full"
                  />
                </label>
                <label className="label">
                  <span className="label-text italic text-red-600">Correo</span>
                  <Field
                    name="email"
                    type="email"
                    className="input input-bordered w-full"
                  />
                </label>
                <label className="label">
                  <span className="label-text italic text-red-600">
                    Teléfono
                  </span>
                  <Field
                    name="telefono"
                    type="tel"
                    className="input input-bordered w-full"
                  />
                </label>
                <label className="label">
                  <span className="label-text italic text-red-600">
                    Usuario
                  </span>
                  <Field
                    name="usuario.userName"
                    type="text"
                    className="input input-bordered w-full"
                  />
                </label>
                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    type="button"
                    className="btn btn-error bg-red-600 text-white"
                    onClick={() =>
                      document.getElementById(`my_modal_${client.id}`)?.close()
                    }
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success bg-green-600 text-white"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </dialog>
      )}
    </div>
  );
};
