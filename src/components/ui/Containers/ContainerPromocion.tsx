import React, { useEffect, useState } from "react";
import { BackendMethods } from "../../../services/BackendClient";
import { IPromosShort } from "../../../types/ShortDtos/PromoShort";
import { CardPromocion } from "../Cards/CardPromocion";
import { useSucursalContext } from "../../../hooks/useContext";

export const ContainerPromocion = () => {
  const backend = new BackendMethods();

  const [promociones, SetPromociones] = useState<IPromosShort[]>([]);

  const { suc } = useSucursalContext();


  useEffect(() => {
    const traerPromos = async () => {
      const res: IPromosShort[] = (await backend.getAll(
        `${import.meta.env.VITE_LOCAL}sucursal/getPromociones/${suc?.id}`
      )) as IPromosShort[];
      SetPromociones(res);
    };
    traerPromos();
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center p-5 m-10">
      {promociones.map((promo, index) => (
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
          key={index}
        />
      ))}
    </div>
  );
};
