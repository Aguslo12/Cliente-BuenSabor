import React, { useEffect, useState } from 'react'
import { BackendMethods } from '../../../services/BackendClient';
import { useParams } from 'react-router-dom';
import CardCategoria from '../Cards/CardCategoria';
import { ICategoriaShort } from '../../../types/ShortDtos/CategoriaShort';

const ContainerCategoria = () => {

    const backend = new BackendMethods();

    const { idSucursal } = useParams();

    const [categorias, setCategorias] = useState<ICategoriaShort[]>([])

    useEffect(() => {
        const traerCategorias = async () => {
            const res: ICategoriaShort[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}sucursal/getCategorias/${idSucursal}`) as ICategoriaShort[]
            setCategorias(res);
        }
        traerCategorias()
    }, [])

    return (
        <div className='pt-14 bg-white'>
            <div className='flex flex-wrap justify-center items-center fixed z-40 bg-white w-full'>
                {categorias.map((categoria: ICategoriaShort, index: number) => (
                    <CardCategoria
                        denominacion={categoria.denominacion}
                        id={categoria.id}
                        eliminado={categoria.eliminado}
                        esInsumo={categoria.esInsumo}
                        esPadre={categoria.esPadre}
                        idSucursal={categoria.idSucursal}
                        key={index}
                    />
                ))}
            </div>
        </div>
    )
}

export default ContainerCategoria