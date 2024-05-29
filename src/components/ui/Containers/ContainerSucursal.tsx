import React, { useEffect, useState } from 'react'
import { BackendMethods } from '../../../services/BackendClient'
import { ISucursalShort } from '../../../types/ShortDtos/SucursalShort';
import CardSucursal from '../Cards/CardSucursal';

const ContainerSucursal = () => {

    const backend = new BackendMethods();

    const [sucursales, SetSucursales] = useState<ISucursalShort[]>([]);

    useEffect(() => {
        const traerSucursales = async () => {
            const res: ISucursalShort[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}sucursal/noEliminados`) as ISucursalShort[]
            SetSucursales(res);
        }
        traerSucursales();
    }, [])

    return (
        <div className='flex flex-wrap items-start justify-start'>

            {sucursales.map((sucursal, index) =>
            (<CardSucursal
                domicilio={sucursal.domicilio}
                eliminado={sucursal.eliminado}
                esCasaMatriz={sucursal.esCasaMatriz}
                horarioApertura={sucursal.horarioApertura}
                horarioCierre={sucursal.horarioCierre}
                id={sucursal.id}
                idEmpresa={sucursal.idEmpresa}
                nombre={sucursal.nombre}
                key={index} />)
            )}
        </div>
    )
}

export default ContainerSucursal