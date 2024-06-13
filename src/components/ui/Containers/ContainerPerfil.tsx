import React, { FC } from "react";
import { ICliente } from "../../../types/Cliente";
import Direccion from "../Perfil/Direccion";
import { Perfil } from "../Perfil/Perfil";

interface iContainerPerfil {
  estado: boolean;
}

export const ContainerPerfil: FC<iContainerPerfil> = ({ estado }) => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex mt-20">
        <h1 className="flex font-bold text-5xl mt-10 ml-10 ">Configuración</h1>
      </div>
      {estado ? (
        <Direccion/>
      ) : (
        <Perfil/>
      )}
    </div>
  );
};

/*
  <div >
  <table className="table">
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
      
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
      
      <tr>
        <th>2</th>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Purple</td>
      </tr>
      <tr>
        <th>3</th>
        <td>Brice Swyre</td>
        <td>Tax Accountant</td>
        <td>Red</td>
      </tr>
    </tbody>
  
</div>

  */
