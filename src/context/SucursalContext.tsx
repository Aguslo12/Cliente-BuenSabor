import { ReactNode, createContext, useState } from "react";
import { ISucursalShort } from "../types/ShortDtos/SucursalShort";

interface SucursalContextType {
  suc: ISucursalShort | undefined;
  updateSucursal: (sucursal: ISucursalShort) => void;
}

export const SucursalContext = createContext<SucursalContextType | undefined>(
  undefined
);

export function SucursalContextProvider({ children }: { children: ReactNode }) {
  const [suc, setSuc] = useState<ISucursalShort | undefined>(undefined);

  const updateSucursal = (sucursal: ISucursalShort) => {
    setSuc(sucursal);
  };

  return (
    <SucursalContext.Provider value={{ suc, updateSucursal }}>
      {children}
    </SucursalContext.Provider>
  );
}


