import { Link } from "react-router-dom";
import { ButtonCarrito } from "./ButtonCarrito";
import { FaUser } from "react-icons/fa";
import { useSucursalContext } from "../../../hooks/useContext";
import { ButtonMisPedidos } from "./ButtonMisPedidos";
import { ICliente } from "../../../types/Cliente";

export const Navbar = () => {
  const { cliente } = useSucursalContext();

  const desLoguearte = () => {
    sessionStorage.removeItem("cliente");
  };
  const storedCliente = sessionStorage.getItem("cliente");
  let user: ICliente | null = null;

  if (storedCliente) {
    user = JSON.parse(storedCliente) as ICliente;
  }

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

        {user || cliente ? (
          <Link to={"/misPedidos"}>
            <div className="navbar-center">
      <button className="flex text-lg rounded-xl btn mx-10 bg-red-600 text-white hover:border-red-600 hover:text-red-600 hover:bg-white">
        Mis pedidos
      </button>
      
    </div>
          </Link>
        ) : (
          <div></div>
        )}
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
                <li>
                  <a className="justify-between">
                    Usuario
                    <span className="badge badge-primary">
                      {user?.usuario.userName}
                    </span>
                  </a>
                </li>
                <li>
                  <Link
                    to={"/iniciarSesion"}
                    onClick={desLoguearte}
                    className="flex justify-center bg-red-500 text-white hover:bg-white hover:text-red-500/80 mt-3 p-1 hover:border-red-500 border-[1px]"
                  >
                    Cerrar Sesión
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
