import { ReactNode, createContext, useState } from "react";
import { IDetallePedido } from "../types/DetallePedido";


// Definimos el tipo de dato que se almacenará en el contexto del carrito
interface CartContextType {
  cart: IDetallePedido[];
  addCarrito: (instrument: IDetallePedido) => void;
  removeItemCarrito: (instrument: IDetallePedido) => void;
  limpiarCarrito: () => void;
}

// Crear contexto
export const CartContext = createContext<CartContextType | undefined>(undefined);

// Crear provide, encargado de proveer acceso al contexto
export function CarritoContextProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<IDetallePedido[]>([]);

  const addCarrito = (product: IDetallePedido) => {
    setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex(item => item.articulo.id === product.articulo.id);
      if (existingProductIndex >= 0) {
        const updatedCart = prevCart.map((item, index) =>
          index === existingProductIndex ? { ...item, cantidad: item.cantidad + 1 } : item
        );
        return updatedCart;
      } else {
        return [...prevCart, { ...product, cantidad: 1 }];
      }
    });
  };

  const removeItemCarrito = (product: IDetallePedido) => {
    setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex(item => item.articulo.id === product.articulo.id);
      if (existingProductIndex >= 0) {
        const existingProduct = prevCart[existingProductIndex];
        if (existingProduct.cantidad > 1) {
          const updatedCart = prevCart.map((item, index) =>
            index === existingProductIndex ? { ...item, cantidad: item.cantidad - 1 } : item
          );
          return updatedCart;
        } else {
          return prevCart.filter((item, index) => index !== existingProductIndex);
        }
      }
      return prevCart;
    });
  };

  const limpiarCarrito = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addCarrito, removeItemCarrito, limpiarCarrito }}>
      {children}
    </CartContext.Provider>
  );
}


