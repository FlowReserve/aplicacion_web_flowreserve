import { useState, useEffect, useRef } from "react";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import LoginForm from "./components/LoginForm/LoginForm";
import "./Landing.css";

function Landing() {
  const [showLogin, setShowLogin] = useState(true); // Por defecto se muestra Login
  const [isHeartBeating, setIsHeartBeating] = useState(false);
  const heartTimeoutRef = useRef<number | null>(null);

  const toggleForm = () => {
    setShowLogin((prev) => !prev);
  };

  // Función para generar intervalo aleatorio entre 15-25 segundos
  const getRandomInterval = () => {
    return Math.floor(Math.random() * (25000 - 15000 + 1)) + 7000;
  };

  // Función para activar el latido
  const triggerHeartbeat = () => {
    setIsHeartBeating(true);
    
    // Remover la clase después de la duración de la animación (2.5s)
    setTimeout(() => {
      setIsHeartBeating(false);
    }, 2500);
  };

  // Función para programar el siguiente latido
  const scheduleNextHeartbeat = () => {
    const randomInterval = getRandomInterval();
    
    heartTimeoutRef.current = setTimeout(() => {
      triggerHeartbeat();
      scheduleNextHeartbeat(); // Programar el siguiente latido
    }, randomInterval);
  };

  // Efecto para iniciar los latidos aleatorios
  useEffect(() => {
    // Primer latido después de 2 segundos (para que no sea inmediato)
    const initialTimeout = setTimeout(() => {
      triggerHeartbeat();
      scheduleNextHeartbeat();
    }, 2000);

    // Cleanup al desmontar el componente
    return () => {
      clearTimeout(initialTimeout);
      if (heartTimeoutRef.current) {
        clearTimeout(heartTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="h-full flex flex-col lg:flex-row justify-center p-4 max-w-[1200px] min-h-dvh m-auto">
      {/* Columna izquierda: título + imagen futura */}
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl text-primary font-bold mb-6">
          Bienvenido a FlowReserve
        </h1>
        <img 
          src="/web/human_heart_resize.webp" 
          alt="Imagen de login de flowreserve"  
          className={`w-[350px] drop-shadow-[0px_4px_8px_rgba(0,0,0,0.7)] ${isHeartBeating ? 'heart-beat' : ''}`}
        />
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