import React, { useEffect, useState } from "react";
import { BackendMethods } from "../../../services/BackendClient";
import { IPromosShort } from "../../../types/ShortDtos/PromoShort";
import { CardPromocion } from "../Cards/CardPromocion";
import { ISucursal } from "../../../types/Sucursal";

export const ContainerPromocion = () => {
  const backend = new BackendMethods();

  const [promociones, SetPromociones] = useState<IPromosShort[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const storedSucursal = sessionStorage.getItem('sucursal');
  let sucursal: ISucursal | undefined = undefined;

  if (storedSucursal) {
    sucursal = JSON.parse(storedSucursal) as ISucursal;
  }


  useEffect(() => {
    const traerPromos = async () => {
      setLoading(true);
      const res: IPromosShort[] = (await backend.getAll(
        `${import.meta.env.VITE_LOCAL}sucursal/getPromociones/${sucursal?.id}`
      )) as IPromosShort[];
      console.log("PROMOSSS")
      console.log(res)
      setLoading(false);
      SetPromociones(res);
    };
    traerPromos();
  }, []);

  const promFiltradas = promociones.filter(
    (promo) => promo.eliminado === false
  );

  return (
    <div className="pt-24">
      <div className="flex flex-wrap justify-center items-center p-5 m-10">
        {loading ? (
          <div className="h-[430px] w-[1500px]  items-center flex pb-20 justify-center">
            <div className="flex items-center justify-center h-[500px] text-3xl">
              Cargando{" "}
              <span className="ml-5 loading loading-spinner loading-md"></span>
            </div>
          </div>
        ) : promociones.length <= 0 ? (
          <div className="h-[430px] w-[1500px]  items-center flex pb-20 justify-center">
            <div className="text-4xl bg-red-600 text-white rounded p-5">
              No hay promociones disponibles
            </div>
          </div>
        ) : (
          <div>
            {promFiltradas.map((promo, index) => (
              <CardPromocion
                denominacion={promo.denominacion}
                descripcionDescuento={promo.descripcionDescuento}
                detalles={promo.detalles}
                eliminado={promo.eliminado}
                fechaDesde={promo.fechaDesde}
                fechaHasta={promo.fechaHasta}
                horaDesde={promo.horaDesde}
                horaHasta={promo.horaHasta}
                id={promo.id}
                imagenes={promo.imagenes}
                precioPromocional={promo.precioPromocional}
                tipoPromocion={promo.tipoPromocion}
                sucursales={promo.sucursales}
                key={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
