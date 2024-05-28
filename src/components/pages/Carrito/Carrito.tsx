import React from "react";

export const Carrito = () => {
  return (
    <div className="bg-backColor h-screen">
      <div className="flex justify-end">
        <div className="card card-compact w-96 shadow-xl mr-20 mt-20 bg-colorSec text-slate-200">
          <div className="card-body">
            <h1 className="card-title">Carrito</h1>
            <p className="text-base flex my-2"><b className="flex justify-start">Productos:</b> <p className="flex justify-end">$999</p></p>
            <p className="text-base flex my-2"><b className="flex justify-start">Envio:</b> <p className="flex justify-end">$999</p></p>
            <hr />
            <p className="text-base flex my-2"><b className="flex justify-start">Total:</b> <p className="flex justify-end">$999</p></p>
            <div className="card-actions justify-end mt-5">
              <button className="btn btn-success w-full">Comprar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
