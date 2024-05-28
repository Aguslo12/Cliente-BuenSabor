import { FC, useEffect, useState } from "react";
import { IEmpresa } from "../../../types/Empresa";
import { BackendMethods } from "../../../services/BackendClient";
import { IItem } from "../../../types/Table/TableItem";

export const CardEmpresa: FC<IEmpresa> = ({
  id,
  nombre,
  razonSocial,
  cuil,
  sucursales,
}) => {
  const backend = new BackendMethods();
  const [data, setData] = useState<IEmpresa[]>([]);

  const traerDatos = async () => {
    const datos = await backend.getById(id); // Asegúrate de definir `fetchIdData`
    setData(datos);
  };

  useEffect(() => {
    traerDatos();
  }, [id]);

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};
