export interface IFormRegister {
    id: number;
    eliminado: boolean;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    usuario: {
      id: number;
      eliminado: boolean;
      auth0Id: string;
      userName: string;
      clave: string;
    };
    domicilios: [
      {
        calle: string;
        numero: number;
        cp: number;
        piso: number;
        nroDpto: number;
        idLocalidad: number;
      }
    ] | unknown[];
}