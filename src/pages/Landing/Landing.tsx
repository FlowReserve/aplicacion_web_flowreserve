import { useState } from "react";
import RegisterForm from "../Register/components/RegisterForm/RegisterForm";
import LoginForm from "./components/LoginForm/LoginForm";

function Landing() {
  const [showLogin, setShowLogin] = useState(true); // Por defecto se muestra Login

  const toggleForm = () => {
    setShowLogin((prev) => !prev);
  };

  return (
<section className="h-full flex flex-col lg:flex-row justify-center p-4 max-w-[1200px] min-h-dvh m-auto">
  {/* Columna izquierda: título + imagen futura */}
  <div className="w-full lg:w-3/5 flex flex-col items-center justify-center px-4 text-center">
    <h1 className="text-4xl text-primary font-bold mb-6">
      Bienvenido a FlowReserve
    </h1>

  </div>

{/* Columna derecha: formulario */}
<div className="w-full lg:w-2/5 h-full flex flex-col justify-center px-4 py-8">
  {/* Contenedor del formulario */}
  <div className="w-full max-w-md mx-auto">
    {showLogin ? <LoginForm /> : <RegisterForm />}
  </div>

  {/* Botón de alternar */}
  <div className="w-full max-w-md mx-auto text-center mt-4">
    {showLogin ? (
      <p className="text-sm">
        ¿No tienes cuenta?{" "}
        <button
          type="button"
          onClick={toggleForm}
          className="text-primary underline font-medium"
        >
          Crear cuenta
        </button>
      </p>
    ) : (
      <p className="text-sm">
        ¿Ya tienes cuenta?{" "}
        <button
          type="button"
          onClick={toggleForm}
          className="text-primary underline font-medium"
        >
          Iniciar sesión
        </button>
      </p>
    )}
  </div>
</div>

</section>

  );
}

export default Landing;
