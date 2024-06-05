import React from 'react'
import ContainerEmpresaCarousel from '../Carrousel/ContainerEmpresaCarousel'

const Hero = () => {
    return (
        <div className="hero min-h-screen bg-fondo relative flex  justify-center px-10">
            <div className='absolute inset-0 bg-black bg-opacity-50 ' />

            <div className="hero-content  lg:flex-row  bg-opacity-90 rounded-xl ">
                {/* */}
                <div className=' p-5 rounded-xl bg-opacity-20 '>
                    <h1 className="text-5xl font-bold text-white">¡Bienvenido al <span className='text-red-600'>Buen Sabor</span>!</h1>
                    <p className="py-6  text-white  text-2xl text-center">Tu comida favorita, a un <span className='text-red-600'>click</span> de distancia.</p>
                    <button className="btn  bg-red-600 hover:bg-red-700 border-none text-white w-full">Registrarse</button>
                </div>
            </div>
            {/* 
            <div className='hero-content '>
                <img src="" className="size-96 bg-black rounded-lg shadow-2xl" />
            </div> */}

        </div>
    )
}

export default Hero