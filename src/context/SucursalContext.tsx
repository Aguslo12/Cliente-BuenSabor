import { ReactNode, createContext, useState } from "react";
import { ISucursalShort } from "../types/ShortDtos/SucursalShort";

interface SucursalContextType {
  suc: ISucursalShort | null;
  updateSucursal: (sucursal: ISucursalShort) => void;
}

export const SucursalContext = createContext<SucursalContextType | undefined>(
  undefined
);

export function SucursalContextProvider({ children }: { children: ReactNode }) {
  const [suc, setSuc] = useState<ISucursalShort | null>(null);

  const updateSucursal = (sucursal: ISucursalShort) => {
    console.log("SUCURSAL ID")
    console.log(sucursal.id)
    setSuc(sucursal);
  };

  return (
    <SucursalContext.Provider value={{ suc, updateSucursal }}>
      {children}
    </SucursalContext.Provider>
  );
}


