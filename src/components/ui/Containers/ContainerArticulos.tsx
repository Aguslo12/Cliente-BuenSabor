import { useEffect, useState } from "react";
import { IArticuloManufacturado } from "../../../types/ArticuloManufacturado";
import { BackendMethods } from "../../../services/BackendClient";
import CardArticulo from "../Cards/CardArticulo";
import { useAppSelector } from "../../../hooks/redux";
import { IArticuloInsumo } from "../../../types/ArticuloInsumo";
import CardArticuloInsumo from "../Cards/CardArticuloInsumo";

export const ContainerArticulos = () => {
  const backend = new BackendMethods();

  const [articulosManufacturados, setArticulosManufacturados] = useState<IArticuloManufacturado[]>([]);
  const [articulosInsumos, setArticulosInsumos] = useState<IArticuloInsumo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const idCategoria = useAppSelector((state) => state.GlobalCategory.selected);

  useEffect(() => {
    const traerArticulos = async () => {
      setLoading(true);

      const res: IArticuloManufacturado[] = (await backend.getAll(
        `${import.meta.env.VITE_LOCAL}ArticuloManufacturado/noEliminados`
      )) as IArticuloManufacturado[];

      const ress: IArticuloInsumo[] = (await backend.getAll(
        `${import.meta.env.VITE_LOCAL}ArticuloInsumo/noEliminados`
      )) as IArticuloInsumo[];

      const articulosInsFiltrados: IArticuloInsumo[] = ress.filter(
        //@ts-expect-error DA ERROR PORQUE EL ARTICULO QUE TRAE EL GET NO TIENE IDCATEGORÍA, TIENE CATEGORÍA
        (articulo) => articulo.categoria.id === idCategoria
      );

      setArticulosInsumos(
        articulosInsFiltrados.filter((articulo) => !articulo.esParaElaborar)
      );

      const articulosFiltrados: IArticuloManufacturado[] = res.filter(
        //@ts-expect-error DA ERROR PORQUE EL ARTICULO QUE TRAE EL GET NO TIENE IDCATEGORÍA, TIENE CATEGORÍA
        (articulo) => articulo.categoria.id === idCategoria
      );

      setArticulosManufacturados(articulosFiltrados);
      setLoading(false);
    };
    traerArticulos();
  }, [idCategoria]);

  return (
    <div className="pt-24">
      <div className="flex flex-wrap justify-center items-center p-5 m-10">
        {loading ? (
          <div className="h-[430px] w-[1500px] items-center flex pb-20 justify-center">
            <div className="flex items-center justify-center h-[500px] text-3xl">
              Cargando{" "}
              <span className="ml-5 loading loading-spinner loading-md"></span>
            </div>
          </div>
        ) : (
          <>
            {articulosInsumos.length <= 0 && articulosManufacturados.length <= 0 ? (
              <div className="h-[430px] w-[1500px] items-center flex pb-20 justify-center">
                <div className="text-4xl bg-red-600 text-white rounded p-5">
                  No hay productos disponibles
                </div>
              </div>
            ) : (
              <>
                {articulosInsumos.map((articulo: IArticuloInsumo) => (
                  <CardArticuloInsumo
                    denominacion={articulo.denominacion}
                    eliminado={articulo.eliminado}
                    esParaElaborar={articulo.esParaElaborar}
                    id={articulo.id}
                    idCategoria={articulo.idCategoria}
                    imagenes={articulo.imagenes}
                    precioCompra={articulo.precioCompra}
                    precioVenta={articulo.precioVenta}
                    stockActual={articulo.stockActual}
                    stockMaximo={articulo.stockMaximo}
                    stockMinimo={articulo.stockMinimo}
                    unidadMedida={articulo.unidadMedida}
                    key={articulo.id}
                  />
                ))}
                {articulosManufacturados.map((articulo: IArticuloManufacturado) => (
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
                    key={articulo.id}
                    idCategoria={articulo.idCategoria}
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
