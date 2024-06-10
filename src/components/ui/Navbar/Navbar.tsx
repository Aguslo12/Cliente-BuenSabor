import { Link } from "react-router-dom";
import { ButtonCarrito } from "./ButtonCarrito";
import { FaUser } from "react-icons/fa";
import { useSucursalContext } from "../../../hooks/useContext";
import { ICliente } from "../../../types/Cliente";
import { IoMdSettings } from "react-icons/io";
import { IoTicket } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { useEffect } from "react";

export const Navbar = () => {
  const { cliente, getCliente } = useSucursalContext();



  const desLoguearte = () => {
    sessionStorage.removeItem("cliente");
  };
  const storedCliente = sessionStorage.getItem("cliente");
  let user: ICliente | undefined = undefined;

  if (storedCliente) {
    user = JSON.parse(storedCliente) as ICliente;
  }

  useEffect(() => {
    getCliente(user)
  }, [])
  

  /*
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
  */

  return (
    <>
      <div className="fixed navbar bg-white border-b-2 text-colorSec z-50 p-4  shadow">
        <div className="navbar-start">
          <Link to={"/"}>
            {" "}
            <button className="text-red-600 font-bold text-3xl">
              {" "}
              El Buen Sabor
            </button>
          </Link>
        </div>

        {/* 
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
        */}
        <div className="navbar-end mr-3">
          <ButtonCarrito />
          {user || cliente ? (
            <div className="ml-3 dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="flex text-red-500 text-[40px] rounded-full border-red-500 border-[3px]">
                  <p>
                    <FaUser />
                  </p>
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <p className="flex justify-center text-base rounded font-bold p-2">
                  {user?.usuario.userName}
                </p>

                <li>
                  <Link
                    to={"/miPerfil"}
                    className="flex justify-center border-black text-black hover:bg-white hover:text-red-500/80 mt-3 p-3 hover:border-red-500 border-[1px]"
                  >
                    <IoMdSettings />
                    Mi Perfil <IoMdSettings />
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/misPedidos"}
                    className="flex justify-center border-black text-black hover:bg-white hover:text-red-500/80 mt-3 p-3 hover:border-red-500 border-[1px]"
                  >
                    <IoTicket />
                    Mis Pedidos
                    <IoTicket />
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/iniciarSesion"}
                    onClick={desLoguearte}
                    className="flex justify-center bg-red-500 text-white hover:bg-white hover:text-red-500/80 mt-3 p-3 hover:border-red-500 border-[1px]"
                  >
                    Cerrar Sesión
                    <MdLogout />
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
};
