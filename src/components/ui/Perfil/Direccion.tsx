import React from "react";
import { ICliente } from "../../../types/Cliente";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";

const storedCliente = sessionStorage.getItem("cliente");
let client: ICliente | null = null;
console.log(client)

if (storedCliente) {
  client = JSON.parse(storedCliente) as ICliente;
}

const Direccion = () => {
  return (
    <div className="flex text-black w-[1600px] text-3xl ml-10 pt-10 flex-col">
        <div className="flex justify-between">
            <p>Mis direcciones</p>
            <button className="btn btn-ghost btn-accent bg-green-600 text-white hover:text-green-600 hover:border-green-600 mr-10">Añadir dirección +</button>
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
            client.domicilios.map((domicilio) => (
              <tbody key={domicilio.id}>
                <tr className="border-black justify-center" key={domicilio.id}>
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
                    <button className="btn btn-sm btn-error">
                      <FaRegTrashAlt className="text-white" />
                    </button>
                  </td>
                </tr>
              </tbody>
            ))
          )}
        </table>
      </div>
    </div>
  );
};

export default Direccion;
