import React from 'react'
import ContainerCategoria from '../../ui/Containers/ContainerCategoria'
import ContainerArticulos from '../../ui/Containers/ContainerArticulos'
import { ContainerPromocion } from '../../ui/Containers/ContainerPromocion'

const Tienda = () => {

    return (
        <>
            <ContainerCategoria />
            <ContainerArticulos />
            <ContainerPromocion />
        </>
    )
}

export default Tienda