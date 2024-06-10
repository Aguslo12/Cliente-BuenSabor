import { ReactNode, createContext, useState } from "react";
import { IDetallePedido } from "../types/DetallePedido";

// Definimos el tipo de dato que se almacenará en el contexto del carrito
interface CartContextType {
  cart: IDetallePedido[];
  addCarrito: (articulo: IDetallePedido) => void;
  addCarritoPromo: (promo: IDetallePedido) => void;
  removeItemCarrito: (articulo: IDetallePedido) => void;
  limpiarCarrito: () => void;
  removeAllItemCarrito: (articulo: IDetallePedido) => void;
}

// Crear contexto
export const CartContext = createContext<CartContextType | undefined>(undefined);

// Crear provider, encargado de proveer acceso al contexto
export function CarritoContextProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<IDetallePedido[]>([]);

  const addCarrito = (product: IDetallePedido) => {
    setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex(item => item.articulo?.id === product.articulo?.id);
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

  const addCarritoPromo = (promo: IDetallePedido) => {
    setCart(prevCart => {
      const existingPromoIndex = prevCart.findIndex(item => item.promocion?.id === promo.promocion?.id);
      if (existingPromoIndex >= 0) {
        const updatedCart = prevCart.map((item, id) => 
          id === existingPromoIndex ? { ...item, cantidad: item.cantidad + 1 } : item
        );
        return updatedCart;
      } else {
        return [...prevCart, { ...promo, cantidad: 1}]
      }
    })
  }

  const removeItemCarrito = (product: IDetallePedido) => {
    setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex(item => item.articulo?.id === product.articulo?.id);
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

  const removeAllItemCarrito = (product: IDetallePedido) => {
    setCart(prevCart => prevCart.filter(item => item.articulo?.id !== product.articulo?.id));
  };

  const limpiarCarrito = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addCarrito, removeItemCarrito, limpiarCarrito, removeAllItemCarrito, addCarritoPromo }}>
      {children}
    </CartContext.Provider>
  );
}