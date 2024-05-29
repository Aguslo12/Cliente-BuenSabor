import { Link } from "react-router-dom";
import { Button } from "./Button";

import { ButtonCarrito } from "./ButtonCarrito";

export const Navbar = () => {
  return (
    <div className="navbar bg-colorPpal text-colorSec fixed z-50">
      <div className="navbar-start">
        <Link to={'/'}> <button className="text-lg btn font-semibold pl-5 bg-colorPpal border-colorPpal hover:bg-hoverPpal hover:border-hoverPpal"> El Buen Sabor</button></Link>
      </div>
      <div className="flex navbar-center w-2/3">
        <Button />
        <div className="form-control pl-16 flex w-2/3">
          <input
            type="text"
            placeholder="Buscar"
            className="input input-bordered md:w-auto"
          />
        </div>
      </div>
      <div className="navbar-end mr-2">
        <ButtonCarrito />
      </div>
    </div>
  );
};
