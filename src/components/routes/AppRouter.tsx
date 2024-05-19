
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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRouter