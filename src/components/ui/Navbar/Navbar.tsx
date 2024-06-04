import { Link } from "react-router-dom";
import { Button } from "./Button";

import { ButtonCarrito } from "./ButtonCarrito";

export const Navbar = () => {
  return (
    <>

      <div className="navbar bg-white border-b-2 text-colorSec fixed z-50 p-4  shadow">
        <div className="navbar-start">
          <Link to={'/'}> <button className="text-red-600 font-bold text-3xl"> El Buen Sabor</button></Link>
        </div>


        {/* <div className="form-control pl-16 flex w-2/3">
          <input
            type="text"
            placeholder="Buscar"
            className="input input-bordered md:w-auto"
          />
        </div> */}

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
      </div>

    </>
  );
};
