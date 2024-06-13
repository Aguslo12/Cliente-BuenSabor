import React, { useEffect, useState } from "react";
import { BackendMethods } from "../../../services/BackendClient";
import { useParams } from "react-router-dom";
import { ICategoriaShort } from "../../../types/ShortDtos/CategoriaShort";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setCategory } from "../../../redux/slices/globalCategory";
import { ISucursal } from "../../../types/Sucursal";

const ContainerCategoria = () => {
  const backend = new BackendMethods();
  const [loading, setLoading] = useState<boolean>(false);

  const sucursalSeleccionada = useAppSelector(
    (state) => state.GlobalSucursal.selected
  );

  const storedCliente = sessionStorage.getItem("sucursal");
  let sucursal: ISucursal | undefined = undefined;

  if (storedCliente) {
    sucursal = JSON.parse(storedCliente) as ISucursal;
  }

  const dispatch = useAppDispatch();

  const seleccionarCategoria = (id: number) => {
    dispatch(setCategory(id));
    console.log(id);
  };

  const [categorias, setCategorias] = useState<ICategoriaShort[]>([]);

  useEffect(() => {
    const traerCategorias = async () => {
      const res: ICategoriaShort[] = (await backend.getAll(
        `${import.meta.env.VITE_LOCAL}sucursal/getCategorias/${sucursal?.id}`
      )) as ICategoriaShort[];
      setCategorias(res);
    };
    traerCategorias();
    setLoading(true);
  }, [sucursalSeleccionada]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(event.target.value);
    seleccionarCategoria(selectedId);
  };

  return (
    <div className="pt-24 bg-white">
      {loading ? (
        categorias.length <= 0 ? (
          <div className="flex items-center">No hay categorías</div>
        ) : (
          <div className="flex justify-center items-center mx-1 space-y-2 fixed z-40 flex-col w-[1625px]">
            <p className="flex text-xl">Categoría</p>
            <select
              className="flex select text-white justify-center select-bordered bg-red-600 w-32 text-center max-w-xs"
              onChange={handleSelectChange}
            >
              <option disabled selected>
                Elegir Cat.
              </option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.denominacion}
                </option>
              ))}
            </select>
          </div>
        )
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ContainerCategoria;
