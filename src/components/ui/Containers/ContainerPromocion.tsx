import React, { useEffect, useState } from "react";
import { BackendMethods } from "../../../services/BackendClient";
import { IPromosShort } from "../../../types/ShortDtos/PromoShort";
import { CardPromocion } from "../Cards/CardPromocion";

export const ContainerPromocion = () => {
  const backend = new BackendMethods();

  const [promociones, SetPromociones] = useState<IPromosShort[]>([]);

  useEffect(() => {
    const traerPromos = async () => {
      const res: IPromosShort[] = (await backend.getAll(
        `${import.meta.env.VITE_LOCAL}promocion/noEliminados`
      )) as IPromosShort[];
      SetPromociones(res);
    };
    traerPromos();
  }, []);

  return (
    <div className="flex flex-row flex-wrap ">
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
