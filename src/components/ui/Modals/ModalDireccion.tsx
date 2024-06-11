import { Formik } from 'formik';
import React from 'react'
import * as Yup from "yup";

interface ModalDireccionProps {
    closeModal: () => void;
  }

export const ModalDireccion: React.FC<ModalDireccionProps> = ({ closeModal }) => {

    const guardarDomicilio = () => {
    }

    const schema = Yup.object().shape({
        calle: Yup.string().required("La calle es obligatoria."),
        numero: Yup.string().required("El número es obligatorio."),
        cp: Yup.string().required("El código postal es obligatorio."),
        piso: Yup.string().required("El piso es obligatorio."),
        nroDpto: Yup.string().required("El número de departamento es obligatorio."),
        idLocalidad: Yup.string().required("La localidad es obligatoria"),
      });


  return (
    <div className="bg-red-600 text-white p-4 rounded-md relative">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={closeModal}
              >
                ✕
              </button>
              <h3 className="font-bold text-lg flex justify-center p-7">Añadir Domicilio</h3>
              <Formik 
              initialValues={{
                id: 0,
                calle: "",
                numero: 0,
                cp: 0,
                piso: 0,
                nroDpto: 0,
                idLocalidad: 0,
              }}
              onSubmit={() => guardarDomicilio()}
              validationSchema={schema}
              validateOnChange={false}
            validateOnBlur={false}
              >
              </Formik>
            </div>
  )
}