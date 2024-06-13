import { useState } from "react";
import { ICliente } from "../../../types/Cliente";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { ModalDireccion } from "../Modals/ModalDireccion";
import { BackendMethods } from "../../../services/BackendClient";

const Direccion = () => {
  const storedCliente = sessionStorage.getItem("cliente");
  let client: ICliente | null = null;

  if (storedCliente) {
    client = JSON.parse(storedCliente) as ICliente;
  }

  const backend = new BackendMethods();
  const [open, setOpen] = useState<boolean>(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const eliminarDomicilio = async (id: number) => {
    const res = await backend.delete(
      `${import.meta.env.VITE_LOCAL}domicilio/${id}`
    );
    console.log(res);
  };

  if (client?.domicilios != undefined || client?.domicilios != null) {
    const domFiltrados = client?.domicilios.filter((domicilio) => domicilio.eliminado === false)
  }
 
  return (
    <div className="flex text-black w-[1600px] text-3xl ml-10 pt-10 flex-col">
      <div className="flex justify-between">
        <p>Mis direcciones</p>
        <button
          className="btn btn-ghost btn-accent bg-green-600 text-white hover:text-green-600 hover:border-green-600 mr-10"
          onClick={openModal}
        >
          Añadir dirección +
        </button>
      </div>

      <div className="flex overflow-x-auto w-[1600px] justify-center mt-10 ">
        <table className="table table-zebra w-full rounded-lg shadow-lg">
          <thead className="text-base">
            <tr className="border-black">
              <th></th>
              <th>Calle</th>
              <th>Número</th>
              <th>Código P.</th>
              <th>Piso</th>
              <th>Nro. Dpto.</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          {client === null ? (
            <div></div>
          ) : (
            client.domicilios.map((domicilio) =>
              domicilio.eliminado === false ? (
                <tbody key={domicilio.id}>
                  <tr
                    className="border-black justify-center"
                    key={domicilio.id}
                  >
                    <th>{domicilio.id}</th>
                    <td>{domicilio.calle}</td>
                    <td>{domicilio.numero}</td>
                    <td>{domicilio.cp}</td>
                    <td>{domicilio.piso}</td>
                    <td>{domicilio.nroDpto}</td>
                    <td>
                      <button className="btn btn-sm btn-primary">
                        <AiOutlineEdit className="text-white" />
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => eliminarDomicilio(domicilio.id)}
                      >
                        <FaRegTrashAlt className="text-white" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <div></div>
              )
            )
          )}
          {open && (
            <div className="fixed z-50 inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <ModalDireccion closeModal={closeModal} />
            </div>
          )}
        </table>
      </div>
    </div>
  );
};

export default Direccion;
