import { Link } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { IUsuario } from "../../../types/Usuario";
import { BackendMethods } from "../../../services/BackendClient";
import { ILocalidad } from "../../../types/Domicilio/Localidad";
import { IProvincia } from "../../../types/Domicilio/Provincia";
import { validationRegister } from "../../validations/RegisterValidation";
import { ICliente } from "../../../types/Cliente";
import ImageInput from "../../ui/Forms/Inputs/ImageInput";

export const Register = () => {
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [actualizacion, setActualizacion] = useState(false);
  const [nombreUsado, setNombreUsado] = useState(false);
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);

  //States para manejar las provincias
  const [provincias, setProvincias] = useState<IProvincia[]>([]);

  const [selectedProvincia, setSelectedProvincia] = useState<IProvincia>();

  //States para manejar las localidades
  const [localidades, setLocalidades] = useState<ILocalidad[]>([]);

  const [selectedLocalidad, setSelectedLocalidad] = useState<ILocalidad>();

  type FormState = {
    [key: string]: any;
    id: number;
    eliminado: boolean;
    nombre: string;
    apellido: string;
    telefono: number;
    email: string;
    usuario: {
      id: number;
      eliminado: boolean;
      auth0Id: string;
      userName: string;
    };
    domicilios: [];
    pedidos: [];
  };

  type FileWithPreview = File & { preview: string };
 
  const backend = new BackendMethods();

  useEffect(() => {
    const traerCategorias = async () => {
      const res: IUsuario[] = (await backend.getAll(
        `${import.meta.env.VITE_LOCAL}usuarioCliente`
      )) as IUsuario[];
      setUsuarios(res);
    };
    traerCategorias();
  }, [actualizacion]);

  const mostrarYEsconderAlerta = () => {
    setMostrarAlerta(true);
    setTimeout(() => {
      setMostrarAlerta(false);
    }, 3000);
  };

  const mostrarUsadoONo = () => {
    setNombreUsado(true);
    setTimeout(() => {
      setNombreUsado(false);
    }, 3000);
  };

  const enviarUsuario = async (cliente: FormState) => {
    console.log("Formulario enviado", cliente);
    const usuarioConMismoNombre = usuarios.find(
      (actual: IUsuario) => actual.userName === cliente.usuario.userName
    );
    console.log(usuarioConMismoNombre)
    if (usuarioConMismoNombre) {
      mostrarUsadoONo();
    } else {
      try {
        const res: ICliente = await backend.post(
          `${import.meta.env.VITE_LOCAL}cliente`,
          cliente
        );
        console.log("Usuario registrado", res);
      } catch (error) {
        console.error(error);
      }
      mostrarYEsconderAlerta();
      setActualizacion(!actualizacion);
    }
  };

  const schema = Yup.object().shape({
    nombre: Yup.string().required("El nombre es obligatorio."),
    apellido: Yup.string().required("El apellido es obligatorio."),
    telefono: Yup.string().required("El teléfono es obligatorio."),
    email: Yup.string().email("Debe introducir una dirección de correo electrónico válida.").required("El email es obligatorio."),
    usuario: Yup.object().shape({
      userName: Yup.string().required("El nombre de usuario es obligatorio"),
      auth0Id: Yup.string().required("La contraseña es obligatoria")
    })
  });

  return (
    <div className="bg-[#bc4749] h-screen flex items-center justify-center relative z-50">
      <div className="bg-white border-red-500 border-[1px] card w-auto shadow-lg">
      <Formik
          initialValues={{
            id: 0,
            eliminado: false,
            nombre: "",
            apellido: "",
            telefono: "",
            email: "",
            usuario: {
              id: 0,
              eliminado: false,
              auth0Id: "",
              userName: "",
            },
            domicilios: [],
            pedidos: [],
          }}
          onSubmit={enviarUsuario}
          validationSchema={schema}
        >
          {({ errors, touched }) => (
            <Form className="card-body">
              <h1 className="card-title flex justify-center text-3xl font-extralight text-red-500/90 mb-5">
                Registrarse
              </h1>
              <div className="space-y-5 text-red-500/90">
                <div className="flex flex-row space-x-5">
                  <div>
                    <label className="italic input input-bordered border-slate-700 hover:border-red-500/90 flex items-center font-normal gap-3">
                      Usuario
                      <Field
                        id="userName"
                        name="usuario.userName"
                        type="text"
                        className="grow font-normal text-black"
                        placeholder=""
                      />
                    </label>
                    {errors.usuario?.userName && touched.usuario?.userName && (
                      <div className="pl-2 text-red-500 font-normal text-left text-sm">
                        {errors.usuario?.userName}
                      </div>
                    )}
                  </div>

                  <div className="w-[280.34px]">
                    <label className="input italic input-bordered flex border-slate-700 hover:border-red-500/90 text-justify items-center font-normal gap-3">
                      Contraseña
                      <Field
                        id="auth0Id"
                        name="usuario.auth0Id"
                        type="password"
                        className="grow text-black"
                        placeholder=""
                      />
                    </label>
                    {errors.usuario?.auth0Id && touched.usuario?.auth0Id && (
                      <div className="pl-2 text-red-500 font-normal text-left text-sm">
                        {errors.usuario.auth0Id}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-row- space-x-5">
                  <div className="w-[280.34px]">
                    <label className="input italic input-bordered border-slate-700 hover:border-red-500/90 flex text-justify items-center font-normal gap-3">
                      Nombre
                      <Field
                        id="nombre"
                        name="nombre"
                        type="text"
                        className="grow text-black"
                        placeholder=""
                      />
                    </label>
                    {errors.nombre && touched.nombre && (
                      <div className="pl-2 text-red-500 font-normal text-left text-sm">
                        {errors.nombre}
                      </div>
                    )}
                  </div>

                  <div className="w-[280.34px]">
                    <label className="input italic input-bordered border-slate-700 hover:border-red-500/90 flex text-justify items-center font-normal gap-3">
                      Apellido
                      <Field
                        id="apellido"
                        name="apellido"
                        type="text"
                        className="grow text-black"
                        placeholder=""
                      />
                    </label>
                    {errors.apellido && touched.apellido && (
                      <div className="pl-2 text-red-500 font-normal text-left text-sm">
                        {errors.apellido}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-row space-x-5">
                  <div className="w-[280.34px]">
                    <label className="input italic input-bordered border-slate-700 hover:border-red-500/90 flex text-justify items-center font-normal gap-3">
                      E-mail
                      <Field
                        id="email"
                        name="email"
                        type="text"
                        className="grow text-black"
                        placeholder=""
                      />
                    </label>
                    {errors.email && touched.email && (
                      <div className="pl-2 text-red-500 font-normal text-left text-sm">
                        {errors.email}
                      </div>
                    )}
                  </div>
                  <div className="w-[280.34px]">
                    <label className="input italic input-bordered border-slate-700 hover:border-red-500/90 flex text-justify items-center font-normal gap-3">
                      Teléfono
                      <Field
                        id="telefono"
                        name="telefono"
                        type="text"
                        className="grow text-black"
                        placeholder=""
                      />
                    </label>
                    {errors.telefono && touched.telefono && (
                      <div className="pl-2 text-red-500 font-normal text-left text-sm">
                        {errors.telefono}
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full flex justify-center "></div>
                <button
                  type="submit"
                  className="btn btn-outline w-full text-xl font-light text-white bg-red-500 hover:bg-white hover:border-red-500/90 hover:text-red-500/90"
                >
                  Registrarse
                </button>
                {mostrarAlerta && (
                  <div
                    role="alert"
                    className="alert alert-success alerta animate__animated animate__fadeInUp"
                  >
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-white">
                      Usuario registrado con éxito!
                    </span>
                  </div>
                )}
                {nombreUsado && (
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
                      Error! Nombre de usuario en uso.
                    </span>
                  </div>
                )}
              </div>
              <Link to={"/iniciarSesion"} className=" w-20">
                <button className="text-left font-normal ml-1 mt-2 hover:underline text-red-500/90">
                  Iniciar Sesión
                </button>
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
