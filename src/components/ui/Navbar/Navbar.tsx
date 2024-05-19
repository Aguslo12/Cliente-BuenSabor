import { Button } from "./Button";

import { ButtonCarrito } from "./ButtonCarrito";

export const Navbar = () => {
  return (
    <div className="navbar bg-orange-600">
      <div className="navbar-start">
        <p className="text-lg font-semibold pl-5"> El Buen Sabor</p>
      </div>
      <div className="flex navbar-center w-2/3">
        <Button/>
        <div className="form-control pl-16 flex w-2/3">
          <input
            type="text"
            placeholder="Buscar"
            className="input input-bordered md:w-auto"
          />
        </div>
      </div>
      <div className="navbar-end ">
        <ButtonCarrito/>
      </div>
    </div>
  );
};
