import React from 'react'
import { ICliente } from '../../../types/Cliente';

const storedCliente = sessionStorage.getItem("cliente");
let client: ICliente | null = null;

if (storedCliente) {
  client = JSON.parse(storedCliente) as ICliente;
}

const Perfil = () => {
  return (
    <div className="flex text-black w-[1600px] text-3xl ml-10 pt-10 flex-col">
          Mi perfil
          
        </div>
  )
}

export default Perfil