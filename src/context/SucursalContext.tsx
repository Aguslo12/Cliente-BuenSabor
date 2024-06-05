import { ReactNode, createContext, useState } from "react";
import { ISucursalShort } from "../types/ShortDtos/SucursalShort";

interface SucursalContextType {
  suc: ISucursalShort | null;
  updateSucursal: (sucursal: ISucursalShort) => void;
  str: number;
  clienteId: number | undefined;
  getCliente: (clienteId: number | undefined) => void;
  pedidoEnviado: (estado: number) => void;
}

export const SucursalContext = createContext<SucursalContextType | undefined>(
  undefined
);

export function SucursalContextProvider({ children }: { children: ReactNode }) {
  const [suc, setSuc] = useState<ISucursalShort | null>(null);
  const [str, setStr] = useState<number>(0);
  const [clienteId, setClienteId] = useState<number | undefined>(0)

  const getCliente = (clienteId: number | undefined) => {
    setClienteId(clienteId)
  }

  const updateSucursal = (sucursal: ISucursalShort) => {

    setSuc(sucursal);
  };

  const pedidoEnviado = (estado: number) => {
    setStr(estado);
  }

  return (
    <SucursalContext.Provider value={{ suc, updateSucursal, pedidoEnviado, str, clienteId, getCliente }}>
      {children}
    </SucursalContext.Provider>
  );
}


