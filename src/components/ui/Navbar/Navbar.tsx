import { Link } from "react-router-dom";
import { ButtonCarrito } from "./ButtonCarrito";
import { FaUser } from "react-icons/fa";
import { useCarrito, useSucursalContext } from "../../../hooks/useContext";
import { ICliente } from "../../../types/Cliente";
import { IoMdSettings } from "react-icons/io";
import { IoTicket } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { useEffect } from "react";
import { PiList } from "react-icons/pi";

export const Navbar = () => {
  const { cliente, getCliente } = useSucursalContext();
  const {limpiarCarrito} = useCarrito()

  const desLoguearte = () => {
    limpiarCarrito()
    sessionStorage.removeItem("cliente");
  };
  const storedCliente = sessionStorage.getItem("cliente");
  let user: ICliente | undefined = undefined;

  if (storedCliente) {
    user = JSON.parse(storedCliente) as ICliente;
  }

  useEffect(() => {
    getCliente(user);
  }, []);

  return (
    <>
      <div className="fixed flex navbar bg-white border-b-2 text-colorSec z-50 p-4 shadow">
        <div className="navbar-start">
          <Link to={"/"}>
            {" "}
            <button className="text-red-600 font-bold text-xl md:text-3xl">
              {" "}
              El Buen Sabor
            </button>
          </Link>
        </div>

        <div className="dropdown md:hidden dropdown-end">
          <button tabIndex={0} role="button" className="flex justify-center ml-[140px] text-red-600 text-2xl" >
                <PiList/>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-1 z-[1] p-2 h-[220px] shadow bg-base-100 rounded-box"
          >
            <p className="flex justify-center text-base rounded font-bold p-2">
              {user?.usuario.userName}
            </p>

            <li>
              <Link
                to={"/miPerfil"}
                className="flex justify-center text-sm border-black text-black hover:bg-white hover:text-red-500/80 mt-3 p-2 hover:border-red-500 border-[1px]"
              >
                <IoMdSettings />
                Mi Perfil <IoMdSettings />
              </Link>
            </li>
            <li>
              <Link
                to={"/misPedidos"}
                className="flex justify-center text-sm border-black text-black hover:bg-white hover:text-red-500/80 mt-3 p-2 hover:border-red-500 border-[1px]"
              >
                <IoTicket />
                Pedidos
                <IoTicket />
              </Link>
            </li>
            <li>
              <Link
                to={"/iniciarSesion"}
                onClick={desLoguearte}
                className="flex justify-center text-sm bg-red-500 text-white hover:bg-white hover:text-red-500/80 mt-3 p-2 hover:border-red-500 border-[1px]"
              >
                Cerrar Sesión
                <MdLogout />
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end hidden md:flex mr-3">
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
                    {user?.imagenCliente === null ? (
                      <FaUser />
                    ) : (
                      <img src={user?.imagenCliente.url} alt="" />
                    )}
                  </p>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-md dropdown-content mt-1 z-[1] p-2 size-72 h-[245px] shadow bg-base-100 rounded-box"
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
