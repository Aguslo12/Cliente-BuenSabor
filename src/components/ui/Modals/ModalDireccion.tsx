import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { ILocalidad } from "../../../types/Domicilio/Localidad";
import { IProvincia } from "../../../types/Domicilio/Provincia";
import { BackendMethods } from "../../../services/BackendClient";
import { ICliente } from "../../../types/Cliente";
import { IDomicilioDto } from "../../../types/CreateDtos/DomicilioDto";

interface ModalDireccionProps {
  closeModal: () => void;
}

const storedCliente = sessionStorage.getItem("cliente");
  let user: ICliente | undefined = undefined;

  if (storedCliente) {
    user = JSON.parse(storedCliente) as ICliente;
  }

export const ModalDireccion: React.FC<ModalDireccionProps> = ({
  closeModal,
}) => {
  const backend = new BackendMethods();
  const [esperar, setEsperar] = useState<boolean>(false);
  const [exito, setExito] = useState<boolean>(false);
  const [provincias, setProvincias] = useState<IProvincia[]>([]);
  const [localidades, setLocalidades] = useState<ILocalidad[]>([]);
  const [selectedProvincia, setSelectedProvincia] = useState<IProvincia | null>(
    null
  );

  const [newDomicilio, setNewDomicilio] = useState<IDomicilioDto>({
    calle: "",
    cp: "",
    id: 0,
    nroDpto:"",
    numero: "",
    piso: "",
    localidad: null,
  })

  const guardarDomicilio = async (domicilio: IDomicilioDto) => {
    setEsperar(true);
    setNewDomicilio((prevState) => ({
      ...prevState,
      calle: domicilio.calle,
      cp: domicilio.cp,
      id: domicilio.id,
      nroDpto: domicilio.nroDpto,
      numero: domicilio.numero,
      piso: domicilio.piso,
      localidad: domicilio.localidad
    }))
    console.log("ESTO ESTOY ENVIANDO EYOU")
    console.log(newDomicilio)
    try {
      const res: ICliente = await backend.put(
        `${import.meta.env.VITE_LOCAL}cliente/${user?.id}`,
        newDomicilio
      )
      console.log("EYOU ESTO ME ESTA TRAYENDO EYOU")
      console.log(res)
    } catch (error) {
      console.log(error)
      setEsperar(false)
    }
  };

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

  const schema = Yup.object().shape({
    calle: Yup.string().required("La calle es obligatoria."),
    numero: Yup.number().required("El número es obligatorio."),
    cp: Yup.number().required("El código postal es obligatorio."),
    piso: Yup.number().required("El piso es obligatorio."),
    nroDpto: Yup.number().required("El número de departamento es obligatorio."),
    localidad: Yup.string().required("La localidad es obligatoria"),
    provincia: Yup.string().required("La provincia es obligatoria"),
  });

  return (
    <div className="bg-white text-red-600 p-4 rounded-md relative">
      <button
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        onClick={closeModal}
      >
        ✕
      </button>
      <h1 className="card-title flex justify-center text-3xl font-extralight text-red-500/90  mb-5">
        Añadir Domicilio
      </h1>
      <Formik
        initialValues={{
          id: 0,
          calle: "",
          numero: "",
          cp: "",
          piso: "",
          nroDpto: "",
          localidad: null,
        }}
        onSubmit={guardarDomicilio}
        validationSchema={schema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {(
            { errors, touched, setFieldValue } // Obtener los errores y el estado de toque de los campos del formulario
          ) => (
            <Form className="card-body">
              <div className="flex flex-row- space-x-5">
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
                        name="calle"
                        type="text"
                        className="input text-base text-black input-bordered w-[280.34px] max-w-xs border-slate-700 hover:border-red-500/90 flex items-center font-normal"
                        placeholder="Calle"
                      />
                    </label>
                    {errors.calle &&
                      touched.calle && (
                        <div className="pl-2 text-red-500 font-normal text-left text-sm">
                          {errors.calle}
                        </div>
                      )}
                  </div>
                  <div className="w-[280.34px]">
                    <label className="form-control w-full max-w-xs">
                      <div className="label italic gap-3">
                        <span className="label-text text-base">
                          Número
                        </span>
                      </div>
                      <Field
                        id="numero"
                        name="numero"
                        type="text"
                        className="input text-base text-black input-bordered w-[280.34px] max-w-xs border-slate-700 hover:border-red-500/90 flex items-center font-normal"
                        placeholder="Código Postal"
                      />
                    </label>
                    {errors.numero &&
                      touched.numero && (
                        <div className="pl-2 text-red-500 font-normal text-left text-sm">
                          {errors.numero}
                        </div>
                      )}
                  </div>
                </div>
                <div className="flex flex-row- space-x-5">
                  <div className="w-[280.34px]">
                    <label className="form-control w-full max-w-xs">
                      <div className="label italic gap-3">
                        <span className="label-text text-base">Código Postal</span>
                      </div>
                      <Field
                        id="cp"
                        name="cp"
                        type="text"
                        className="input text-base text-black input-bordered w-[280.34px] max-w-xs border-slate-700 hover:border-red-500/90 flex items-center font-normal"
                        placeholder="Código postal"
                      />
                    </label>
                    {errors.cp &&
                      touched.cp && (
                        <div className="pl-2 text-red-500 font-normal text-left text-sm">
                          {errors.cp}
                        </div>
                      )}
                  </div>
                  <div className="w-[280.34px]">
                    <label className="form-control w-full max-w-xs">
                      <div className="label italic gap-3">
                        <span className="label-text text-base">
                          Piso
                        </span>
                      </div>
                      <Field
                        id="piso"
                        name="piso"
                        type="text"
                        className="input text-base text-black input-bordered w-[280.34px] max-w-xs border-slate-700 hover:border-red-500/90 flex items-center font-normal"
                        placeholder="Código Postal"
                      />
                    </label>
                    {errors.piso &&
                      touched.piso && (
                        <div className="pl-2 text-red-500 font-normal text-left text-sm">
                          {errors.piso}
                        </div>
                      )}
                  </div>
                </div>
                <div className="flex flex-row- space-x-5">
                  <div className="w-[280.34px]">
                    <label className="form-control w-full max-w-xs">
                      <div className="label italic gap-3">
                        <span className="label-text text-base">Número Dpto.</span>
                      </div>
                      <Field
                        id="nroDpto"
                        name="nroDpto"
                        type="text"
                        className="input text-base text-black input-bordered w-[280.34px] max-w-xs border-slate-700 hover:border-red-500/90 flex items-center font-normal"
                        placeholder="Código postal"
                      />
                    </label>
                    {errors.nroDpto &&
                      touched.nroDpto && (
                        <div className="pl-2 text-red-500 font-normal text-left text-sm">
                          {errors.nroDpto}
                        </div>
                      )}
                  </div>
                </div>
                <button
                  type="submit"
                  className={`btn btn-success ${
                    esperar && "btn-disabled animate-pulse"
                  } w-full text-xl mt-5 font-light text-white`}
                >
                  {esperar ? "Agregando..." : "Agregar"}
                </button>
            </Form>
          )}
      </Formik>
    </div>
  );
};
