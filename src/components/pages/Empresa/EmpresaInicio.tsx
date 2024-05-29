import React, { useEffect, useState } from 'react'
import { fetchData } from '../../api/Fetch';
import { IEmpresa } from '../../../types/Empresa';
import { IItem } from '../../../types/Table/TableItem';
import { CardEmpresa } from '../../ui/Cards/CardEmpresa';
import ContainerEmpresa from '../../ui/Containers/ContainerEmpresa';

export const EmpresaInicio = () => {
    return (
        <div>
            <ContainerEmpresa />
        </div>
    )
}
