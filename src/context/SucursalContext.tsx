import { ReactNode, createContext, useState } from "react";
import { ISucursalShort } from "../types/ShortDtos/SucursalShort";
import { ICliente } from "../types/Cliente";

interface SucursalContextType {
  suc: ISucursalShort | null;
  updateSucursal: (sucursal: ISucursalShort) => void;
  str: number;
  cliente: ICliente | undefined;
  getCliente: (cliente: ICliente | undefined) => void;
  pedidoEnviado: (estado: number) => void;
}

export const SucursalContext = createContext<SucursalContextType | undefined>(
  undefined
);

export function SucursalContextProvider({ children }: { children: ReactNode }) {
  const [suc, setSuc] = useState<ISucursalShort | null>(null);
  const [str, setStr] = useState<number>(0);
  const [cliente, setCliente] = useState<ICliente | undefined>()

  const getCliente = (cliente: ICliente | undefined) => {
    setCliente(cliente)
  }

  const updateSucursal = (sucursal: ISucursalShort) => {

    setSuc(sucursal);
  };

  const pedidoEnviado = (estado: number) => {
    setStr(estado);
  }

  return (
    <SucursalContext.Provider value={{ suc, updateSucursal, pedidoEnviado, str, cliente, getCliente }}>
      {children}
    </SucursalContext.Provider>
  );
}


