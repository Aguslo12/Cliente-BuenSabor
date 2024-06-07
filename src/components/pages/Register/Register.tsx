import { Link } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import * as Yup from "yup";
import { IUsuario } from "../../../types/Usuario";
import { BackendMethods } from "../../../services/BackendClient";
import { ILocalidad } from "../../../types/Domicilio/Localidad";
import { IProvincia } from "../../../types/Domicilio/Provincia";
import { ICliente } from "../../../types/Cliente";
import { TiChevronRightOutline, TiChevronLeftOutline } from "react-icons/ti";

export const Register = () => {
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [actualizacion, setActualizacion] = useState(false);
  const [nombreUsado, setNombreUsado] = useState(false);
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);

  //States para manejar las provincias
  const [provincias, setProvincias] = useState<IProvincia[]>([]);

  const [selectedProvincia, setSelectedProvincia] = useState<IProvincia | null>();

  //States para manejar las localidades
  const [localidades, setLocalidades] = useState<ILocalidad[]>([]);

  const [selectedLocalidad, setSelectedLocalidad] = useState<ILocalidad>();

  const [seccionDomicilio, setSeccionDomicilio] = useState<boolean>(false);

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
    domicilios: [
      {
        id: number;
        eliminado: boolean;
        calle: string;
        numero: number;
        cp: number;
        piso: number;
        nroDpto: number;
        idLocalidad: number;
      }
    ];
  };

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
    console.log(usuarioConMismoNombre);
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
    email: Yup.string()
      .email("Debe introducir una dirección de correo electrónico válida.")
      .required("El email es obligatorio."),
    usuario: Yup.object().shape({
      userName: Yup.string().required("El nombre de usuario es obligatorio"),
      auth0Id: Yup.string().required("La contraseña es obligatoria"),
    }),
    domicilios: Yup.object().shape({
      calle: Yup.string().required("La calle es obligatoria"),
      cp: Yup.string().required("El codigo postal es obligatorio"),
      nroDpto: Yup.string().required(
        "El número de departamento es obligatorio"
      ),
      numero: Yup.string().required("El número del domicilio es obligatorio"),
      piso: Yup.string().required("El piso del domicilio es obligatorio"),
    }),
  });

  //Effect para traer las provincias de Argentina
  useEffect(() => {
    const provincias = async () => {
      try {
        const res: IProvincia[] = await backend.getAll(
          `${import.meta.env.VITE_LOCAL}provincia`
        );
        setProvincias(res);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    };
    provincias();
  }, []);

  useEffect(() => {
    const localidades = async () => {
      try {
        const res: ILocalidad[] = await backend.getAll(
          `${import.meta.env.VITE_LOCAL}localidad/findByProvincia/${
            selectedProvincia?.id
          }`
        );
        setLocalidades(res);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    };
    localidades();
  }, [selectedProvincia]);

  const localidadInput = () => {
    return (
      <div className="w-full">
        <div className="font-Roboto text-xl mt-2 w-full">
          Localidades disponibles:{" "}
        </div>
        <select
          className=" border rounded-md w-full"
          id="localidad"
          name="localidad"
          value={selectedLocalidad?.nombre || ""}
          onChange={(e) => {
            {
              const selectedValue = e.target.value;
              const selectedLocalidad = localidades.find(
                (localidad) => localidad.nombre === selectedValue
              );
              setSelectedLocalidad(selectedLocalidad);
            }
          }}
        >
          {localidades.map((localidad, index) => (
            <option key={index} value={localidad.nombre} className="">
              {localidad.nombre}
            </option>
          ))}
        </select>
      </div>
    );
  };

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
            domicilios: [
              {
                id: 0,
                eliminado: false,
                calle: "",
                cp: 0,
                nroDpto: 0,
                numero: 0,
                piso: 0,
                idLocalidad: 0,
              },
            ],
          }}
          onSubmit={enviarUsuario}
          validationSchema={schema}
        >
          {({ errors, touched }) => (
            <Form className="card-body">
              <h1 className="card-title flex justify-center text-3xl font-extralight text-red-500/90 mb-5">
                Registrarse
              </h1>
              <div
                className={`space-y-5 text-red-500/90 ${
                  seccionDomicilio && "hidden"
                }`}
              >
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
              {/* 
              
              
              ASDASASDSDAS










              
              
              
              
              */}
              <div
                className={`space-y-5 text-red-500/90 ${
                  seccionDomicilio || "hidden"
                }`}
              >
                <div className="flex flex-row space-x-5">
                  <div>
                    <label className="form-control w-full max-w-xs">
                      <div className="label italic gap-3">
                        <span className="label-text">Provincia</span>
                      </div>
                      <Field
                        as="select"
                        id="provincia"
                        name="provincia"
                        className={`border rounded-md w-full mt-1 ${
                          errors.provincia && touched.provincia
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          const selectedValue = e.target.value;
                          const selectedProvincia =
                            provincias.find(
                              (provincia) => provincia.nombre === selectedValue
                            ) || null;
                          setSelectedProvincia(selectedProvincia);
                        }}
                      >
                        <option value="" label="Selecciona una provincia" />
                        {provincias.map((provincia, index) => (
                          <option key={index} value={provincia.nombre}>
                            {provincia.nombre}
                          </option>
                        ))}
                      </Field>
                    </label>
                    {errors.provincia && touched.provincia && (
                      <div className="text-red-500 text-sm mt-1">
                        La provincia es obligatoria
                      </div>
                    )}
                  </div>
                  <div className="w-[280.34px]">
                    <label className="form-control w-full max-w-xs">
                      <div className="label italic gap-3">
                        <span className="label-text">Localidad</span>
                      </div>
                      <Field
                        as="select"
                        id="localidad"
                        name="localidad"
                        className={`italic select select-bordered w-[280.34px] max-w-xs border-slate-700 hover:border-red-500/90 flex items-center font-normal`}
                      >
                        <option value="" label="Selecciona una localidad" />
                        {console.log(localidades)}
                        {localidades.map((localidad, index) => (
                          <option key={index} value={localidad.nombre}>
                            {localidad.nombre}
                          </option>
                        ))}
                      </Field>
                    </label>
                    {errors.localidad && touched.localidad && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.localidad}
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
              <div className="flex justify-between w-full">
                <Link to={"/iniciarSesion"} className="flex w-[100px]">
                  <button className="flex text-left font-normal ml-1 mt-2 hover:underline text-red-500/90">
                    Iniciar Sesión
                  </button>
                </Link>
                {seccionDomicilio ? (
                  <button
                    className="flex justify-end btn btn-outline font-light text-white bg-red-500 hover:bg-white hover:border-red-500/90 hover:text-red-500/90 text-base"
                    onClick={() => setSeccionDomicilio(!seccionDomicilio)}
                  >
                    <TiChevronLeftOutline className="text-xl" />
                    Usuario
                  </button>
                ) : (
                  <button
                    className="flex justify-end btn btn-outline font-light text-white bg-red-500 hover:bg-white hover:border-red-500/90 hover:text-red-500/90 text-base"
                    onClick={() => setSeccionDomicilio(!seccionDomicilio)}
                  >
                    Domicilio
                    <TiChevronRightOutline className="text-xl" />
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
