import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import * as Yup from "yup";
import { IUsuario } from "../../../types/Usuario";
import { BackendMethods } from "../../../services/BackendClient";
import { useSucursalContext } from "../../../hooks/useContext";
import { ICliente } from "../../../types/Cliente";

export const Login = () => {
  const navigate = useNavigate();
  const [passwordNo, setPasswordNo] = useState(false);
  const { getCliente } = useSucursalContext();
  const [esperar, setEsperar] = useState<boolean>(false);

  const backend = new BackendMethods();

  const mostrarYEsconderAlertaPass = () => {
    setPasswordNo(true);
    setTimeout(() => {
      setPasswordNo(false);
    }, 3000);
  };

  const schema = Yup.object().shape({
    userName: Yup.string().required("El nombre de usuario es obligatorio"),
    clave: Yup.string().required("La contraseña es obligatoria"),
  });

  const verificarUsuario = async (usuario: IUsuario) => {
    try {
      setEsperar(true);
      const res: ICliente = await backend.post(
        `${import.meta.env.VITE_LOCAL}cliente/getCliente`,
        usuario
      );
      sessionStorage.setItem("cliente", JSON.stringify(res));
      navigate("/", {
        replace: true,
        state: {
          logged: true,
          usuario: usuario,
        },
      });
      getCliente(res);
    } catch (error) {
      console.log("Contraseña incorrecta");
      setEsperar(false);
      mostrarYEsconderAlertaPass();
    }
    /*
      mostrarYEsconderAlerta();
      */
  };

  return (
    <div className="bg-[#bc4749] h-screen flex items-center justify-center relative z-50">
      <div className="bg-white border-red-500 border-[1px] card w-96 shadow-lg">
        <Formik
          initialValues={{
            id: 0,
            userName: "",
            auth0Id: "",
            clave: "",
            rol: "",
            activo: true,
          }}
          onSubmit={verificarUsuario}
          validationSchema={schema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(
            { errors, touched } // Obtener los errores y el estado de toque de los campos del formulario
          ) => (
            <Form className="card-body">
              <h1 className="card-title flex justify-center text-3xl font-extralight text-red-500/90  mb-5">
                Iniciar Sesión
              </h1>
              <div className="space-y-5 text-red-500/90">
                <label className=" italic input input-bordered border-slate-700 hover:border-red-500/90 flex items-center font-normal gap-3">
                  Usuario
                  <Field
                    id="userName"
                    name="userName"
                    type="text"
                    className="grow font-normal text-black"
                    placeholder=""
                  />
                </label>
                {errors.userName && touched.userName && (
                  <div className="text-red-500 font-normal text-left text-sm">
                    {errors.userName}
                  </div>
                )}
                <label className="input italic input-bordered border-slate-700 hover:border-red-500/90 flex text-justify items-center font-normal gap-3">
                  Contraseña
                  <Field
                    id="clave"
                    name="clave"
                    type="password"
                    className="grow text-black"
                    placeholder=""
                  />
                </label>
                {errors.clave && touched.clave && (
                  <div className="text-red-500 font-normal text-left text-sm">
                    {errors.clave}
                  </div>
                )}
                <button
                  type="submit"
                  className={`btn btn-success text-xl font-light ${
                    esperar && "btn-disabled animate-pulse"
                  } transition-all w-full text-white`}
                >
                  {esperar ? "Entrando..." : "Entrar"}
                </button>
                {passwordNo && (
                  <div role="alert" className="alert alert-error">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current shrink-0 h-6 w-6 fill-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-white">
                      Usuario o contraseña incorrectos
                    </span>
                  </div>
                )}
              </div>
              <Link to={"/registrarse"} className=" w-20">
                <button className="text-left font-normal ml-1 mt-2 w-auto hover:underline text-red-500/90">
                  Registrarse
                </button>
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
