
import { Carrito } from '../pages/Carrito/Carrito';
import { Home } from '../pages/Home/Home';
import Tienda from '../pages/Tienda/Tienda';
import { Navbar } from '../ui/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carrito" element={<Carrito />}></Route>
          <Route path="/categorias/:idSucursal" element={<Tienda />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRouter