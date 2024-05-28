import React, { useEffect, useState } from 'react'
import { fetchData } from '../../api/Fetch';
import { IEmpresa } from '../../../types/Empresa';
import { IItem } from '../../../types/Table/TableItem';
import { CardEmpresa } from '../Cards/CardEmpresa';

export const EmpresaInicio = () => {

    const [data, setData] = useState<IEmpresa[]>([]);

    const transformData = (empresasData: IEmpresa[]) => {
        return empresasData.map(empresa => ({
            id: empresa.id,
            nombre: empresa.nombre,
            razonSocial : empresa.razonSocial,
            cuil : empresa.cuil,
            sucursales: empresa.sucursales

        }));
    }

    useEffect(() => {
        const fetchInsumo = async () => {
            const response = await fetchData("http://localhost:8081/empresas");
            const transformedData = transformData(response);
            setData(transformedData);
            console.log(data)
        }
        fetchInsumo();
    }, [])


  return (
    <div>
        <h1>Empresas</h1>
        <div className='flex flex-col'>
            {data.map((empresa: IEmpresa)=>(
                <CardEmpresa cuil={empresa.cuil} id={empresa.id} nombre={empresa.nombre} razonSocial={empresa.razonSocial} sucursales={empresa.sucursales} key={empresa.id}></CardEmpresa>
            ))}
        </div>
    </div>
  )
}
