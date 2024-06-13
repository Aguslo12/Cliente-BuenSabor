import React, { useEffect } from "react";
import { ICliente } from "../../../types/Cliente";
import { Formik } from "formik";

const Perfil = () => {
  const storedCliente = sessionStorage.getItem("cliente");
let client: ICliente | null = null;

if (storedCliente) {
  client = JSON.parse(storedCliente) as ICliente;
}
  return (
    <div className="flex text-black  ml-10 pt-10 flex-col space-y-5">
      <p className="text-xl">Editar</p>
      <div className="flex flex-row p-5 shadow-lg rounded-3xl ">
        <div className="flex flex-col">
        <img src={client?.imagenCliente.url} alt="" className="border-8 rounded border-red-600"/>
        <button className="flex mt-5 w-[130px] justify-center text-white bg-red-600 ml-10 btn-error btn">Editar foto</button>
        </div>
      </div>
      
    </div>
  );
};

export default Perfil;
