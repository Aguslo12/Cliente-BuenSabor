import React, { FC } from 'react'
import { ISucursalShort } from '../../../types/ShortDtos/SucursalShort'
import { Link } from 'react-router-dom'

const CardSucursal: FC<ISucursalShort> = ({ domicilio, eliminado, esCasaMatriz, horarioApertura, horarioCierre, id, idEmpresa, nombre }) => {
    return (

        <>
            <Link to={`categorias/${id}`} className='bg-white border  rounded-xl mx-4 overflow-hidden size-48'>
                <div className=" ">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Eo0ef-CXKCPZRAhj7l4SNlAG6yT0EEPofA&s"
                        alt="Shoes" className="rounded-tr-xl rounded-tl-xl w-full h-32" />
                </div>


                <div className=' z-40 h-52 border'>
                    <h1 className='text-black font-semibold p-5 text-center '>{nombre}</h1>
                </div>
            </Link>

        </>
    )
}

export default CardSucursal