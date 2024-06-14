import { Link } from "react-router-dom";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as Yup from "yup";
import { BackendMethods } from "../../../services/BackendClient";
import { ILocalidad } from "../../../types/Domicilio/Localidad";
import { IProvincia } from "../../../types/Domicilio/Provincia";
import { ICliente } from "../../../types/Cliente";
import { TiChevronRightOutline, TiChevronLeftOutline } from "react-icons/ti";
import ImageInput from "../../ui/Forms/Inputs/ImageInput";
import { IFormRegister } from "../../../types/Forms/FormRegister";

export const Register = () => {
  const [mostrarAlerta] = useState(false);
  const [actualizacion, setActualizacion] = useState(false);
  const [nombreUsado, setNombreUsado] = useState(false);
  const [esperar, setEsperar] = useState<boolean>(false);
  const [exito, setExito] = useState<boolean>(false);

  const [provincias, setProvincias] = useState<IProvincia[]>([]);
  const [localidades, setLocalidades] = useState<ILocalidad[]>([]);
  const [selectedProvincia, setSelectedProvincia] = useState<IProvincia | null>(
    null
  );
  const [seccionDomicilio, setSeccionDomicilio] = useState<boolean>(false);

  type FileWithPreview = File & { preview: string };

  const [files, setFile] = useState<FileWithPreview | null>();

  const backend = new BackendMethods();

  const mostrarUsadoONo = () => {
    setNombreUsado(true);
    setTimeout(() => {
      setNombreUsado(false);
    }, 3000);
  };

  const enviarUsuario = async (
    cliente: IFormRegister,
    { setSubmitting }: FormikHelpers<IFormRegister>
  ) => {
    setEsperar(true);
    try {
      const domiciliosGuardados = await Promise.all(
        cliente.domicilios.map(async (domicilio) => {
          const res = await backend.post(
            `${import.meta.env.VITE_LOCAL}domicilio`,
            domicilio
          );
          return res;
        })
      );

      cliente.domicilios = domiciliosGuardados;

      console.log("ESTO VOY A ENVIAR")
      console.log(cliente)
      const res: ICliente = await backend.postConImagen(
        `${import.meta.env.VITE_LOCAL}cliente/save`,
        cliente as IFormRegister,
        files as File
      );
      console.log("ESTO DEVUELVE")
      console.log(res);
      setExito(true);
    } catch (error) {
      console.error(error);
      mostrarUsadoONo();
      setEsperar(false);
    }
    setActualizacion(!actualizacion);
    setSubmitting(false);
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
      clave: Yup.string().required("La contraseña es obligatoria"),
    }),
    domicilios: Yup.array().of(
      Yup.object().shape({
        calle: Yup.string().required("La calle es obligatoria"),
        cp: Yup.string().required("El código postal es obligatorio"),
        nroDpto: Yup.string().required(
          "El número de departamento es obligatorio"
        ),
        numero: Yup.string().required("El número del domicilio es obligatorio"),
        piso: Yup.string().required("El piso del domicilio es obligatorio"),
        idLocalidad: Yup.number().required("La localidad es obligatoria"),
      })
    ),
  });

  useEffect(() => {
    const fetchProvincias = async () => {
      try {
        const res: IProvincia[] = await backend.getAll(
          `${import.meta.env.VITE_LOCAL}provincia`
        );
        const uniqueProvincias = Array.from(
          new Set(res.map((provincia) => provincia.id))
        ).map((id) => res.find((provincia) => provincia.id === id));
        setProvincias(uniqueProvincias as IProvincia[]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProvincias();
  }, []);

  useEffect(() => {
    if (selectedProvincia) {
      const fetchLocalidades = async () => {
        try {
          const res: ILocalidad[] = await backend.getAll(
            `${import.meta.env.VITE_LOCAL}localidad/findByProvincia/${
              selectedProvincia.id
            }`
          );
          const uniqueLocalidades = Array.from(
            new Set(res.map((localidad) => localidad.id))
          ).map((id) => res.find((localidad) => localidad.id === id));
          setLocalidades(uniqueLocalidades as ILocalidad[]);
        } catch (error) {
          console.error(error);
        }
      };
      fetchLocalidades();
    }
  }, [selectedProvincia]);

  return (
    <div className="bg-[#bc4749] h-screen flex items-center justify-center relative z-50">
      <div className={`bg-white ${exito && "hidden"} border-red-500 border-[1px] card w-auto shadow-lg `}>
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
              clave: "",
            },
            domicilios: [
              {
                calle: "",
                cp: null,
                nroDpto: null,
                numero: null,
                piso: null,
                idLocalidad: null,
              },
            ],
          }}
          onSubmit={enviarUsuario}
          validationSchema={schema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ errors, touched, setFieldValue }) => (
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
                        id="clave"
                        name="usuario.clave"
                        type="password"
                        className="grow text-black"
                        placeholder=""
                      />
                    </label>
                    {errors.usuario?.clave && touched.usuario?.clave && (
                      <div className="pl-2 text-red-500 font-normal text-left text-sm">
                        {errors.usuario.clave}
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
                <ImageInput
                  id={1}
                  key={1}
                  file={files as FileWithPreview}
                  setFile={
                    setFile as Dispatch<
                      SetStateAction<FileWithPreview | null | undefined>
                    >
                  }
                />
              </div>
              <div
                className={`space-y-5 text-red-500/90 ${
                  seccionDomicilio || "hidden"
                }`}
              >
                <div className="flex flex-row space-x-5">
                  <div>
                    <label className="form-control w-full max-w-xs">
                      <div className="label italic gap-3">
                        <span className="label-text text-base">Provincia</span>
                      </div>
                      <Field
                        as="select"
                        id="provincia"
                        name="provincia"
                        className={` select text-base select-bordered w-[280.34px] max-w-xs border-slate-700 hover:border-red-500/90 flex items-center font-normal`}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          const selectedValue = e.target.value;
                          const selectedProvincia =
                            provincias.find(
                              (provincia) => provincia.nombre === selectedValue
                            ) || null;
                          setSelectedProvincia(selectedProvincia);
                          setFieldValue("provincia", selectedValue);
                          setFieldValue("localidad", ""); // Resetear la localidad seleccionada
                          setFieldValue("domicilios[0].idLocalidad", 0); // Resetear el idLocalidad
                        }}
                      >
                        <option value="" label="Selecciona una provincia" />
                        {provincias.map((provincia, id) => (
                          <option key={id} value={provincia.nombre}>
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
                        <span className="label-text text-base ">Localidad</span>
                      </div>
                      <Field
                        as="select"
                        id="domicilios.idLocalidad"
                        name="domicilios.idLocalidad"
                        className={` select text-base select-bordered w-[280.34px] max-w-xs border-slate-700 hover:border-red-500/90 flex items-center font-normal`}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          const selectedValue = e.target.value;
                          const selectedLocalidad =
                            localidades.find(
                              (localidad) => localidad.nombre === selectedValue
                            ) || null;
                          setFieldValue("localidad", selectedValue);
                          setFieldValue(
                            "domicilios[0].idLocalidad",
                            selectedLocalidad?.id || 0
                          );
                        }}
                      >
                        <option value="" label="Selecciona una localidad" />
                        {localidades.map((localidad, id) => (
                          <option key={id} value={localidad.nombre}>
                            {localidad.nombre}
                          </option>
                        ))}
                      </Field>
                    </label>
                    {errors.localidad && touched.localidad && (
                      <div className="text-red-500 text-sm mt-1">
                        Localidad obligatoria
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-row- space-x-5">
                  <div className="w-[280.34px]">
                    <label className="form-control w-full max-w-xs">
                      <div className="label italic gap-3">
                        <span className="label-text text-base">Calle</span>
                      </div>
                      <Field
                        id="calle"
                        name="domicilios[0].calle"
                        type="text"
                        className="input text-base text-black input-bordered w-[280.34px] max-w-xs border-slate-700 hover:border-red-500/90 flex items-center font-normal"
                        placeholder="Calle"
                      />
                    </label>
                    {errors.domicilios?.[0]?.calle &&
                      touched.domicilios?.[0]?.calle && (
                        <div className="pl-2 text-red-500 font-normal text-left text-sm">
                          {errors.domicilios?.[0]?.calle}
                        </div>
                      )}
                  </div>
                  <div className="w-[280.34px]">
                    <label className="form-control w-full max-w-xs">
                      <div className="label italic gap-3">
                        <span className="label-text text-base">
                          Código Postal
                        </span>
                      </div>
                      <Field
                        id="cp"
                        name="domicilios[0].cp"
                        type="text"
                        className="input text-base text-black input-bordered w-[280.34px] max-w-xs border-slate-700 hover:border-red-500/90 flex items-center font-normal"
                        placeholder="Código Postal"
                      />
                    </label>
                    {errors.domicilios?.[0]?.cp &&
                      touched.domicilios?.[0]?.cp && (
                        <div className="pl-2 text-red-500 font-normal text-left text-sm">
                          {errors.domicilios?.[0]?.cp}
                        </div>
                      )}
                  </div>
                </div>
                <div className="flex flex-row space-x-5">
                  <div className="w-[280.34px]">
                    <label className="form-control w-full max-w-xs">
                      <div className="label italic gap-3">
                        <span className="label-text text-base">
                          Número Dpto.
                        </span>
                      </div>
                      <Field
                        id="nroDpto"
                        name="domicilios[0].nroDpto"
                        type="text"
                        className="input text-base text-black input-bordered w-[280.34px] max-w-xs border-slate-700 hover:border-red-500/90 flex items-center font-normal"
                        placeholder="0"
                      />
                    </label>
                    {errors.domicilios?.[0]?.nroDpto &&
                      touched.domicilios?.[0]?.nroDpto && (
                        <div className="pl-2 text-red-500 font-normal text-left text-sm">
                          {errors.domicilios?.[0]?.nroDpto}
                        </div>
                      )}
                  </div>
                  <div className="w-[280.34px]">
                    <label className="form-control w-full max-w-xs">
                      <div className="label italic gap-3">
                        <span className="label-text text-base">
                          Número Domicilio.
                        </span>
                      </div>
                      <Field
                        id="numero"
                        name="domicilios[0].numero"
                        type="text"
                        className="input text-base text-black input-bordered w-[280.34px] max-w-xs border-slate-700 hover:border-red-500/90 flex items-center font-normal"
                        placeholder="0"
                      />
                    </label>
                    {errors.domicilios?.[0]?.numero &&
                      touched.domicilios?.[0]?.numero && (
                        <div className="pl-2 text-red-500 font-normal text-left text-sm">
                          {errors.domicilios?.[0]?.numero}
                        </div>
                      )}
                  </div>
                </div>
                <div className="flex flex-row space-x-5">
                  <div className="w-[280.34px]">
                    <label className="form-control w-full max-w-xs">
                      <div className="label italic gap-3">
                        <span className="label-text text-base">Piso</span>
                      </div>
                      <Field
                        id="piso"
                        name="domicilios[0].piso"
                        type="text"
                        className="input text-base text-black input-bordered w-[280.34px] max-w-xs border-slate-700 hover:border-red-500/90 flex items-center font-normal"
                        placeholder="0"
                      />
                    </label>
                    {errors.domicilios?.[0]?.piso &&
                      touched.domicilios?.[0]?.piso && (
                        <div className="pl-2 text-red-500 font-normal text-left text-sm">
                          {errors.domicilios?.[0]?.piso}
                        </div>
                      )}
                  </div>
                </div>
                <button
                  type="submit"
                  className={`btn btn-success ${
                    esperar && "btn-disabled animate-pulse"
                  } w-full text-xl  font-light text-white`}
                >
                  {esperar ? "Espere..." : "Registrarse"}
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
                  <button
                    className={`flex text-left font-normal ml-1 mt-2 hover:underline text-red-500/90`}
                  >
                    Iniciar Sesión
                  </button>
                </Link>
                {seccionDomicilio ? (
                  <button
                    className={` btn btn-outline ${
                      exito && "hidden"
                    } font-light text-white bg-red-500 hover:bg-white hover:border-red-500/90 hover:text-red-500/90 text-base`}
                    onClick={() => setSeccionDomicilio(!seccionDomicilio)}
                  >
                    <TiChevronLeftOutline className="text-xl" />
                    Usuario
                  </button>
                ) : (
                  <button
                    className={` btn btn-outline font-light ${
                      exito && "hidden"
                    } text-white bg-red-500 hover:bg-white hover:border-red-500/90 hover:text-red-500/90 text-base`}
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
      {exito && (
        <div className="bg-white p-10 rounded-lg space-y-10">
          <div className="text-4xl flex justify-center items-center text-red-600 font-semibold">
        ¡Usuario registrado con exito!
      </div>
      <Link to={"/iniciarSesion"} className="flex justify-center w-full">
          <button
            className={`flex font-semibold ml-1 mt-2 hover:underline text-red-500/90`}
          >
            Iniciar Sesión
          </button>
        </Link>
        </div>
      )}
    </div>
  );
};
