import { Link } from "react-router-dom";
import { IUsuario } from "../../../types/Usuario";
import { FaAngleDoubleDown } from "react-icons/fa";

const Hero = () => {
  const storedUsuario = sessionStorage.getItem('usuario');
  let usuario: IUsuario | null = null;

  if (storedUsuario) {
    usuario = JSON.parse(storedUsuario) as IUsuario;
  }

  return (
    <div className="hero min-h-screen bg-fondo relative flex flex-col justify-center items-center px-10">
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="hero-content lg:flex-row bg-opacity-90 rounded-xl p-5">
        <div className="p-5 rounded-xl bg-opacity-20">
          {sessionStorage.getItem("usuario") ? (
            <h1 className="flex justify-center text-5xl font-bold text-white">
              ¡Bienvenido
              <span className="pl-2 text-red-600">{" "}{usuario?.userName}</span>!
            </h1>
          ) : (
            <h1 className="flex justify-center text-5xl font-bold text-white">
              ¡Bienvenido al <span className="pl-2 text-red-600">Buen Sabor</span>!
            </h1>
          )}
          <p className="py-6 text-white text-2xl text-center">
            Tu comida favorita, a un <span className="text-red-600">click</span>{" "}
            de distancia.
          </p>
          {!sessionStorage.getItem("usuario") && (
            <Link to={"/iniciarSesion"}>
              <button className="btn bg-red-600 hover:bg-red-700 border-none text-white w-full">
                Iniciar Sesión
              </button>
            </Link>
          )}
        </div>
      </div>
      <FaAngleDoubleDown className="absolute animate-bounce bottom-4 text-9xl text-red-700" />
    </div>
  );
};

export default Hero;