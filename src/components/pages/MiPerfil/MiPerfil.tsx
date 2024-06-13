import React, { useState } from 'react'
import { ContainerPerfil } from '../../ui/Containers/ContainerPerfil'
import { FaUserCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const MiPerfil = () => {

  const [estado, setEstado] = useState<boolean>(false)

  const perfil = () => {
    setEstado(false)
  }

  const direcciones = () => {
    setEstado(true)
  }

  return (
    <div className='flex h-screen'>
      <div className='flex z-40 flex-col space-y-3 items-center justify-start pt-5 bg-red-600 h-full w-[270px] mt-[75px] text-white'>
        <div className='flex justify-start w-full pl-2'> 
        <p className='justify-center w-full flex font-semibold'>Qué configurar</p>
        </div>
        <button onClick={()=>perfil()} className='flex btn btn-ghost hover:bg-white hover:text-slate-900 w-64 justify-start text-lg'><FaUserCircle className='text-3xl pr-2'/>Editar Perfil</button>
        <button onClick={()=>direcciones()} className='flex btn btn-ghost hover:bg-white hover:text-slate-900 w-64 justify-start text-lg'><FaLocationDot className='text-[30px] pr-2'/>Editar Direcciones</button>
      </div>
      <ContainerPerfil estado={estado}/>
    </div>
  )
}

export default MiPerfil