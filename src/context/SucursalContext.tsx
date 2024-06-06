import { ReactNode, createContext, useState } from "react";
import { ISucursalShort } from "../types/ShortDtos/SucursalShort";
import { IUsuario } from "../types/Usuario";

interface SucursalContextType {
  suc: ISucursalShort | null;
  updateSucursal: (sucursal: ISucursalShort) => void;
  str: number;
  usuario: IUsuario | undefined;
  getUsuario: (usuarioId: IUsuario | undefined) => void;
  pedidoEnviado: (estado: number) => void;
}

export const SucursalContext = createContext<SucursalContextType | undefined>(
  undefined
);

export function SucursalContextProvider({ children }: { children: ReactNode }) {
  const [suc, setSuc] = useState<ISucursalShort | null>(null);
  const [str, setStr] = useState<number>(0);
  const [usuario, setUsuarioId] = useState<IUsuario | undefined>()

  const getUsuario = (usuario: IUsuario | undefined) => {
    setUsuarioId(usuario)
  }

  const updateSucursal = (sucursal: ISucursalShort) => {

    setSuc(sucursal);
  };

  const pedidoEnviado = (estado: number) => {
    setStr(estado);
  }

  return (
    <SucursalContext.Provider value={{ suc, updateSucursal, pedidoEnviado, str, usuario, getUsuario }}>
      {children}
    </SucursalContext.Provider>
  );
}


