import { useContext } from "react";
import { CartContext } from "../context/CarritoContext";
import { SucursalContext } from "../context/SucursalContext";

export const useCarrito = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCarrito must be used within a CartProvider");
  }
  return context;
};

export const useSucursalContext = () => {
  const context = useContext(SucursalContext);
  if (context === undefined) {
    throw new Error(
      "useSucursalContext must be used within a SucursalContextProvider"
    );
  }
  return context;
};
