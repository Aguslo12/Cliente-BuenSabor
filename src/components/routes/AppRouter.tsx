import { CarritoContextProvider } from "../../context/CarritoContext";
import SucursalContext, { SucursalContextProvider } from "../../context/SucursalContext";
import { Carrito } from "../pages/Carrito/Carrito";
import { Home } from "../pages/Home/Home";
import SucursalInicio from "../pages/Sucursal/SucursalInicio";
import Tienda from "../pages/Tienda/Tienda";
import { Navbar } from "../ui/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <SucursalContextProvider>
        <CarritoContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/carrito" element={<Carrito />}></Route>
            <Route
              path="/:idEmpresa/sucursales"
              element={<SucursalInicio />}
            ></Route>
            <Route
              path="/:idEmpresa/sucursales/categorias/:idSucursal"
              element={<Tienda />}
            />
          </Routes>
        </CarritoContextProvider>
        </SucursalContextProvider>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
