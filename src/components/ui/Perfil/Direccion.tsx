import { useEffect, useState } from "react";
import { ICliente } from "../../../types/Cliente";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { BackendMethods } from "../../../services/BackendClient";
import { ILocalidad } from "../../../types/Domicilio/Localidad";
import { IProvincia } from "../../../types/Domicilio/Provincia";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const Direccion = () => {
  const storedCliente = sessionStorage.getItem("cliente");

  let client: ICliente | null = null;

  if (storedCliente) {
    client = JSON.parse(storedCliente) as ICliente;
  }

  const [esperar, setEsperar] = useState<boolean>(false);

  const backend = new BackendMethods();

  const eliminarDomicilio = async (id: number) => {
    const res = await backend.delete(
      `${import.meta.env.VITE_LOCAL}domicilio/${id}`
    );
    console.log(res);
  };

  //States para manejar las provincias
  const [provincias, setProvincias] = useState<IProvincia[]>([]);

  const [selectedProvincia, setSelectedProvincia] = useState<IProvincia>();

  //States para manejar las localidades
  const [localidades, setLocalidades] = useState<ILocalidad[]>([]);
  const [filteredLocalidades, setFilteredLocalidades] = useState<ILocalidad[]>([]);

  const [selectedLocalidad, setSelectedLocalidad] = useState<ILocalidad>();

  const actualizarPedido = () => {};

  //Effect para traer las provincias de Argentina
  useEffect(() => {
    const provincias = async () => {
      try {
        const res: IProvincia[] = await backend.getAll(
          `${import.meta.env.VITE_LOCAL}provincia`
        );
        setProvincias(res.slice(0,24));
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    };
    provincias();
  }, []);

  //Effect para traer las localidades de la provincia seleccionada
  useEffect(() => {
    const localidades = async () => {
      try {
        const res: ILocalidad[] = await backend.getAll(
          `${import.meta.env.VITE_LOCAL}localidad/findByProvincia/${
            selectedProvincia?.id
          }`
        );
        setLocalidades(res.slice(0,2029));
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    };
    localidades();
  }, [selectedProvincia]);



  const schema = Yup.object().shape({
    calle: Yup.string().required("La calle es obligatoria"),
    cp: Yup.number().required("El código postal es obligatorio"),
    nroDpto: Yup.number().required("El número de departamento es obligatorio"),
    numero: Yup.number().required("El número del domicilio es obligatorio"),
    piso: Yup.number().required("El piso del domicilio es obligatorio"),
    idLocalidad: Yup.number().required("La localidad es obligatoria"),
  });

  return (
    <div className="flex text-black w-[1600px] text-3xl ml-10 pt-10 flex-col">
      <div className="flex justify-between">
        <p>Mis direcciones</p>
        {/*
        <button
          className="btn btn-ghost btn-accent bg-green-600 text-white hover:text-green-600 hover:border-green-600 mr-10"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Añadir dirección +
        </button>
        */}
      </div>

      <div className="flex overflow-x-auto w-[1600px] justify-center mt-10 ">
        <table className="table table-zebra w-full rounded-lg shadow-lg">
          <thead className="text-base">
            <tr className="border-black">
              <th></th>
              <th>Calle</th>
              <th>Número</th>
              <th>Código P.</th>
              <th>Piso</th>
              <th>Nro. Dpto.</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          {client === null ? (
            <div></div>
          ) : (
            client.domicilios?.map((domicilio) =>
              domicilio.eliminado === false ? (
                <tbody key={domicilio.id}>
                  <tr
                    className="border-black justify-center"
                    key={domicilio.id}
                  >
                    <th>{domicilio.id}</th>
                    <td>{domicilio.calle}</td>
                    <td>{domicilio.numero}</td>
                    <td>{domicilio.cp}</td>
                    <td>{domicilio.piso}</td>
                    <td>{domicilio.nroDpto}</td>
                    {/* 
                    <td>
                      <button className="btn btn-sm btn-primary">
                        <AiOutlineEdit className="text-white" />
                      </button>
                    </td>
                    */}
                    <td>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => eliminarDomicilio(domicilio.id)}
                      >
                        <FaRegTrashAlt className="text-white" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <div></div>
              )
            )
          )}
        </table>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box bg-red-600 max-w-[680px] h-[650px]">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <Formik
              initialValues={{
                calle: "",
                cp: null,
                nroDpto: null,
                numero: null,
                piso: null,
                idLocalidad: null,
              }}
              onSubmit={actualizarPedido}
              validateOnChange={false}
              validateOnBlur={false}
              validationSchema={schema}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form className="card-body">
                  <h1 className="card-title flex justify-center text-3xl font-extralight text-white mb-5">
                    Crear dirección
                  </h1>

                  <div className="flex flex-row space-x-5">
                    <div className="w-[280.34px]">
                      <label className="form-control w-full max-w-xs">
                        <div className="label italic gap-3">
                          <span className="label-text text-base text-white">
                            Provincia
                          </span>
                        </div>
                        <Field
                          as="select"
                          className="select text-base select-bordered w-[280.34px] max-w-xs border-slate-700 hover:border-red-500/90 flex items-center font-normal"
                          id="provincia"
                          name="provincia"
                          value={selectedProvincia?.nombre || ""}
                          onChange={(
                            e: React.ChangeEvent<HTMLSelectElement>
                          ) => {
                            const selectedValue = e.target.value;
                            const selectedProvincia =
                              provincias.find(
                                (provincia) =>
                                  provincia.nombre === selectedValue
                              ) || undefined;
                            setSelectedProvincia(selectedProvincia);
                            setFieldValue("provincia", selectedValue);
                            setFieldValue("localidad", ""); // Resetear la localidad seleccionada
                            setFieldValue("idLocalidad", 0); // Resetear el idLocalidad
                          }}
                        >
                          {provincias.map((provincia, id) => (
                            <option key={id} value={provincia.nombre}>
                              {provincia.nombre}
                            </option>
                          ))}
                        </Field>
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-row space-x-5">
                    <div className="w-[280.34px]">
                      <label className="form-control w-full max-w-xs">
                        <div className="label italic gap-3">
                          <span className="label-text text-base text-white">
                            Calle
                          </span>
                        </div>
                        <Field
                          id="calle"
                          name="calle"
                          type="text"
                          className="input text-base text-black input-bordered w-[280.34px] max-w-xs border-slate-700 hover:border-red-500/90 flex items-center font-normal"
                          placeholder="Calle"
                        />
                      </label>
                      {errors.calle && touched.calle && (
                        <div className="pl-2 text-red-500 font-normal text-left text-sm">
                          {errors.calle}
                        </div>
                      )}
                    </div>
                    <div className="w-[280.34px]">
                      <label className="form-control w-full max-w-xs">
                        <div className="label italic gap-3">
                          <span className="label-text text-base text-white">
                            Código Postal
                          </span>
                        </div>
                        <Field
                          id="cp"
                          name="cp"
                          type="text"
                          className="input text-base text-black input-bordered w-[280.34px] max-w-xs border-slate-700 hover:border-red-500/90 flex items-center font-normal"
                          placeholder="Código Postal"
                        />
                      </label>
                      {errors.cp && touched.cp && (
                        <div className="pl-2 text-red-500 font-normal text-left text-sm">
                          {errors.cp}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-row space-x-5">
                    <div className="w-[280.34px]">
                      <label className="form-control w-full max-w-xs">
                        <div className="label italic gap-3">
                          <span className="label-text text-base text-white">
                            Número Dpto.
                          </span>
                        </div>
                        <Field
                          id="nroDpto"
                          name="nroDpto"
                          type="text"
                          className="input text-base text-black input-bordered w-[280.34px] max-w-xs border-slate-700 hover:border-red-500/90 flex items-center font-normal"
                          placeholder="0"
                        />
                      </label>
                      {errors.nroDpto && touched.nroDpto && (
                        <div className="pl-2 text-red-500 font-normal text-left text-sm">
                          {errors.nroDpto}
                        </div>
                      )}
                    </div>
                    <div className="w-[280.34px]">
                      <label className="form-control w-full max-w-xs">
                        <div className="label italic gap-3">
                          <span className="label-text text-base text-white">
                            Número Domicilio
                          </span>
                        </div>
                        <Field
                          id="numero"
                          name="numero"
                          type="text"
                          className="input text-base text-black input-bordered w-[280.34px] max-w-xs border-slate-700 hover:border-red-500/90 flex items-center font-normal"
                          placeholder="0"
                        />
                      </label>
                      {errors.numero && touched.numero && (
                        <div className="pl-2 text-red-500 font-normal text-left text-sm">
                          {errors.numero}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-row space-x-5">
                    <div className="w-[280.34px]">
                      <label className="form-control w-full max-w-xs">
                        <div className="label italic gap-3">
                          <span className="label-text text-base text-white">
                            Piso
                          </span>
                        </div>
                        <Field
                          id="piso"
                          name="piso"
                          type="text"
                          className="input text-base text-black input-bordered w-[280.34px] max-w-xs border-slate-700 hover:border-red-500/90 flex items-center font-normal"
                          placeholder="0"
                        />
                      </label>
                      {errors.piso && touched.piso && (
                        <div className="pl-2 text-red-500 font-normal text-left text-sm">
                          {errors.piso}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className={`btn btn-success ${
                      esperar && "btn-disabled animate-pulse"
                    } w-full text-xl font-light text-white mt-7`}
                  >
                    {esperar ? "Espere..." : "Agregar dirección"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Direccion;
