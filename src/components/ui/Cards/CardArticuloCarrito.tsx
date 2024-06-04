import React from 'react'
import { useCarrito } from '../../../hooks/useContext';
import { IDetallePedido } from '../../../types/DetallePedido';

export const CardArticuloCarrito = () => {

    const { cart } = useCarrito();

  return (
    <div className="bg-gradient-to-br ">
      <div className="flex flex-wrap static mr-48">
        {cart.length > 0 ? (
          cart.map((prod: IDetallePedido) => {
            return (
              prod.cantidad !== 0 && (
                <div
                  key={prod.articulo.id}
                  className="card card-compact w-96 shadow-xl bg-white m-10 h-full border-[#2f302b] "
                >
                  <figure>
                    <img src={prod.articulo.imagenes[0].url} className="h-44 w-full" />
                  </figure>
                  <div
                    tabIndex={0}
                    className="collapse collapse-plus border rounded-t-none bg-white text-black border-white"
                  >
                    <div className="collapse-title text-xl font-medium">
                      {prod.articulo.denominacion}
                    </div>
                    <div className="collapse-content ">
                      <p className="my-1">
                        Precio:{" "}
                        <b className="text-lime-600">
                          ${prod.articulo.precioVenta}
                        </b>
                      </p>
                      <p className="my-1">
                        Cantidad:{" "}
                        <b className="text-lime-600 ">{prod.cantidad}</b>
                      </p>
                    </div>
                  </div>
                </div>
              )
            );
          })
        ) : (
          <div className="flex justify-center w-screen h-full">
            <div className="align-middle card bg-white shadow-xl items-center justify-center w-1/3 h-28 top-12">
              <div className="card-body">
                <h2 className="card-title text-4xl text-black text-pretty font-light">No hay productos agregados</h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
