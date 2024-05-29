import React, { FC } from 'react'
import { ICategoriaShort } from '../../../types/ShortDtos/ICategoriaShort'
import { PiBowlFood } from "react-icons/pi";


const CardCategoria: FC<ICategoriaShort> = ({ denominacion, eliminado, esInsumo, esPadre, id, idSucursal }) => {
    return (
        <div className='rounded-sm cursor-pointer  m-5 p-5 flex flex-col items-center justify-start transition-all hover:bg-slate-100 hover:text-red-500'>
            <span className='flex flex-row items-center justify-center text-center px-4'>
                <PiBowlFood className='text-xl mx-2' />
                <h1 className='font-semibold '>{denominacion}</h1>
            </span>
        </div>
    )
}

export default CardCategoria