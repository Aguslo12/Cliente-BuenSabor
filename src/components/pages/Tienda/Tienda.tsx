import React from 'react'
import ContainerCategoria from '../../ui/Containers/ContainerCategoria'
import ContainerArticulos from '../../ui/Containers/ContainerArticulos'
import { ContainerPromocion } from '../../ui/Containers/ContainerPromocion'

const Tienda = () => {
    return (
        <>
            <ContainerCategoria />
            <ContainerArticulos />
            <div className='w-full flex justify-center bg-red-600 text-3xl font-semibold font-mono text-white p-2'>PROMOS DISPONIBLES</div>
            <ContainerPromocion/>
        </>
    )
}

export default Tienda