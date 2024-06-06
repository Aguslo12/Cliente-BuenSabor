import Hero from "../../ui/Landing/Hero";
import { EmpresaInicio } from "../Empresa/EmpresaInicio";

export const Home = () => {
  return (
    <div className="h-screen justify-center">
      <Hero/>
      <EmpresaInicio />
    </div>
  );
};
