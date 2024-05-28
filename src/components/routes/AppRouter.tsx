
import { Carrito } from '../pages/Carrito/Carrito';
import { Home } from '../pages/Home/Home';
import { Navbar } from '../ui/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/carrito" element={<Carrito/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRouter