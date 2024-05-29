import React, { useEffect, useState } from 'react'
import { IArticuloManufacturado } from '../../../types/ArticuloManufacturado'
import { BackendMethods } from '../../../services/BackendClient';
import CardArticulo from '../Cards/CardArticulo';
import { IItem } from '../../../types/Table/TableItem';

const ContainerArticulos = () => {

    const backend = new BackendMethods();

    const [articulosManufacturados, setArticulosManufacturados] = useState<IArticuloManufacturado[]>([]);

    useEffect(() => {
        const traerArticulos = async () => {
            const res: IArticuloManufacturado[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}ArticuloManufacturado/noEliminados`) as IArticuloManufacturado[]
            setArticulosManufacturados(res);
        }
        traerArticulos();
    }, [])

    return (
        <div className='flex flex-wrap justify-center items-center pt-24'>
            {articulosManufacturados.map((articulo: IArticuloManufacturado, index: number) => (
                <CardArticulo
                    articuloManufacturadoDetalles={articulo.articuloManufacturadoDetalles}
                    denominacion={articulo.denominacion}
                    descripcion={articulo.descripcion}
                    eliminado={articulo.eliminado}
                    id={articulo.id}
                    imagenes={articulo.imagenes}
                    precioVenta={articulo.precioVenta}
                    preparacion={articulo.preparacion}
                    stock={articulo.stock}
                    tiempoEstimadoMinutos={articulo.tiempoEstimadoMinutos}
                    unidadMedida={articulo.unidadMedida}
                    key={index}
                />
            ))}
        </div>
    )
}

export default ContainerArticulos