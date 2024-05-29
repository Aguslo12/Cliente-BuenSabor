import React, { FC } from 'react'
import { IArticuloManufacturado } from '../../../types/ArticuloManufacturado'
import { BsCart3 } from "react-icons/bs";

const CardArticulo: FC<IArticuloManufacturado> = ({ id, denominacion, imagenes, descripcion, articuloManufacturadoDetalles, eliminado, precioVenta, preparacion, stock, tiempoEstimadoMinutos, unidadMedida }) => {
    return (
        <div className="card w-96 bg-base-100 rounded-xl border m-5">
            {imagenes !== undefined && imagenes.length >= 1 && <figure><img src={imagenes[0].url} alt="promo" /></figure>}
            <div className="card-body">
                <h2 className="card-title">{denominacion}</h2>
                <p>{tiempoEstimadoMinutos}</p>
                <p className='text-red-600 font-bold'>${precioVenta}</p>
                <div className="card-actions justify-end">
                    <button className="btn bg-rose-600 text-white hover:text-rose-600 hover:bg-white hover:border-rose-600">Agregar al carrito
                        <BsCart3 className='text-xl' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardArticulo