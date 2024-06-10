import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { BackendMethods } from '../../../services/BackendClient';// Asegúrate de importar correctamente tu archivo de métodos del backend
import { IEmpresaShort } from '../../../types/ShortDtos/EmpresaShort';
import { CardEmpresa } from '../Cards/CardEmpresa';

const ContainerEmpresaCarousel = () => {
  const backend = new BackendMethods();
  const [empresas, setEmpresas] = useState<IEmpresaShort[]>([]);

  useEffect(() => {
    const traerEmpresas = async () => {
      const res: IEmpresaShort[] = (await backend.getAll(
        `${import.meta.env.VITE_LOCAL}empresa/noEliminados`
      )) as IEmpresaShort[];
      setEmpresas(res);
    };
    traerEmpresas();
  }, []);

  return (
    <Carousel
      className='w-80 flex flex-col'
      showThumbs={false}
      showStatus={false}
      infiniteLoop={true}
      autoPlay={true}
      interval={5000}
      transitionTime={1000}
      showArrows={false}
      showIndicators={true}
    >
      {empresas.map((empresa, id) => (
        <CardEmpresa
          cuil={empresa.cuil}
          id={empresa.id}
          nombre={empresa.nombre}
          razonSocial={empresa.razonSocial}
          key={id}
          eliminado={empresa.eliminado}
          imagenes={empresa.imagenes}
          sucursales={empresa.sucursales}
        />
      ))}
    </Carousel>
  );
};

export default ContainerEmpresaCarousel;
