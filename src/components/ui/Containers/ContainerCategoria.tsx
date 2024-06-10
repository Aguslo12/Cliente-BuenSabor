import React, { useEffect, useState } from 'react'
import { BackendMethods } from '../../../services/BackendClient';
import { useParams } from 'react-router-dom';
import CardCategoria from '../Cards/CardCategoria';
import { ICategoriaShort } from '../../../types/ShortDtos/CategoriaShort';
import { useAppSelector } from '../../../hooks/redux';

const ContainerCategoria = () => {

    const backend = new BackendMethods();

    const { idSucursal } = useParams();

    const sucursalSeleccionada = useAppSelector((state) => state.GlobalSucursal.selected)

    const [categorias, setCategorias] = useState<ICategoriaShort[]>([])

    useEffect(() => {
        const traerCategorias = async () => {
            const res: ICategoriaShort[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}sucursal/getCategorias/${sucursalSeleccionada}`) as ICategoriaShort[]
            setCategorias(res);
        }
        traerCategorias()
    }, [sucursalSeleccionada])

    return (
        <div className='pt-24 bg-white'>
            <div className='flex flex-wrap justify-center items-center fixed z-40 bg-white w-full'>
                {categorias.map((categoria: ICategoriaShort, id: number) => (
                    <CardCategoria
                        denominacion={categoria.denominacion}
                        id={categoria.id}
                        eliminado={categoria.eliminado}
                        esInsumo={categoria.esInsumo}
                        esPadre={categoria.esPadre}
                        idSucursal={categoria.idSucursal}
                        key={id}
                    />
                ))}
            </div>
        </div>
    )
}

export default ContainerCategoria