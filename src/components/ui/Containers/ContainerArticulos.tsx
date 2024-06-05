import { useEffect, useState } from 'react'
import { IArticuloManufacturado } from '../../../types/ArticuloManufacturado'
import { BackendMethods } from '../../../services/BackendClient';
import CardArticulo from '../Cards/CardArticulo';
import { useAppSelector } from '../../../hooks/redux';

const ContainerArticulos = () => {

    const backend = new BackendMethods();

    const [articulosManufacturados, setArticulosManufacturados] = useState<IArticuloManufacturado[]>([]);

    const idCategoria = useAppSelector((state) => state.GlobalCategory.selected)

    useEffect(() => {
        const traerArticulos = async () => {
            const res: IArticuloManufacturado[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}ArticuloManufacturado/noEliminados`) as IArticuloManufacturado[]
            console.log(res)

            //@ts-expect-error DA ERROR PORQUE EL ARTICULO QUE TRAE EL GET NO TIENE IDCATEGORÍA, TIENE CATEGORÍA
            const articulosFiltrados: IArticuloManufacturado[] = res.filter((articulo) => articulo.categoria.id === idCategoria)
            setArticulosManufacturados(articulosFiltrados);
        }
        traerArticulos();
    }, [idCategoria])

    return (
        <div className='pt-24'>

            <div className='flex flex-wrap justify-center items-center border p-5 m-10 rounded-xl'>
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
                        idCategoria={articulo.idCategoria}
                    />
                ))}
            </div>
        </div>
    )
}

export default ContainerArticulos