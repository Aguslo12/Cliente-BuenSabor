import * as Yup from 'yup'

export const validationRegister = Yup.object().shape({
    userName: Yup.string().required("El nombre de usuario es obligatorio"),
    auth0Id: Yup.string().required("La contraseña es obligatoria"),
    nombre: Yup.string().required("El nombre es obligatorio."),
    apellido: Yup.string().required("El apellido es obligatorio."),
    email: Yup.string().required("El email es obligatorio."),
    telefono: Yup.string().required("El teléfono es obligatorio."),
})