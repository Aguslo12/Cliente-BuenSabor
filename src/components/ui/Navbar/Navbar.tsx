import { Link, useParams } from "react-router-dom";
import { Button } from "./Button";

import { ButtonCarrito } from "./ButtonCarrito";
import { useEffect, useState } from "react";
import { ISucursalShort } from "../../../types/ShortDtos/SucursalShort";
import { ISucursal } from "../../../types/Sucursal";
import { IEmpresa } from "../../../types/Empresa";
import { BackendMethods } from "../../../services/BackendClient";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setGlobalSucursal } from "../../../redux/slices/globalSucursal";

export const Navbar = () => {


  const backend = new BackendMethods();

  const idEmpresa = useAppSelector((state) => state.GlobalIdEmpresa.idEmpresa)

  const categoria = useAppSelector((state) => state.GlobalCategory.selected)

  const selectedIdSucursal = useAppSelector((state) => state.GlobalSucursal.selected);

  const dispatch = useAppDispatch();

  const [sucursales, SetSucursales] = useState<ISucursal[]>([])

  useEffect(() => {
    const traerSucursales = async () => {
      try {
        const res: IEmpresa = await backend.getById(`${import.meta.env.VITE_LOCAL}empresa/sucursales/${idEmpresa}`) as unknown as IEmpresa;
        const sucursales: ISucursal[] = res.sucursales;
        SetSucursales(sucursales);
      } catch (error) {
        console.error(error)
      }
    }
    traerSucursales();
  }, [categoria])


  const selectSucursal = (id: number) => {
    dispatch(setGlobalSucursal(id))
  }


  return (
    <>

      <div className="navbar bg-white border-b-2 text-colorSec fixed z-50 p-4  shadow">
        <div className="navbar-start">
          <Link to={'/'}> <button className="text-red-600 font-bold text-3xl"> El Buen Sabor</button></Link>
        </div>

        {idEmpresa &&
          <>
            <div className="dropdown">
              <div tabIndex={0} role="button" className="select select-bordered w-72 items-center">Selecciona sucursal </div>
              <ul tabIndex={0} className="dropdown-content  z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                {sucursales.map((sucursal) => (
                  <li className="cursor-pointer p-2 my-1 rounded border" onClick={() => selectSucursal(sucursal.id)}>{sucursal.nombre}</li>
                ))}
              </ul>
            </div>
          </>
        }


        <div className="navbar-end mr-2">
          <ButtonCarrito />
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between">
                  Perfil
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div >

    </>
  );
};
