import React, { FC } from 'react'
import { ICategoriaShort } from '../../../types/ShortDtos/CategoriaShort';
import { PiBowlFood } from "react-icons/pi";
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setCategory } from '../../../redux/slices/globalCategory';


const CardCategoria: FC<ICategoriaShort> = ({ denominacion, eliminado, esInsumo, esPadre, id, idSucursal }) => {


    const dispatch = useAppDispatch();

    const idCategoria = useAppSelector((state ) => state.GlobalCategory.selected)

    const seleccionarCategoria = () => {
        dispatch(setCategory(id))
    }

    return (
        <div className={` cursor-pointer m-5 p-5 flex flex-col items-center justify-center hover:bg-slate-100 hover:text-red-500
        ${idCategoria === id && 'bg-slate-100 text-red-600 border-red-600 rounded-x'}`}
            onClick={seleccionarCategoria}>
            <span className='flex flex-row items-center justify-center text-center px-4'>
                <PiBowlFood className='text-xl mx-2' />
                <h1 className='font-semibold '>{denominacion}</h1>
            </span>
        </div>
    )
}

export default CardCategoria