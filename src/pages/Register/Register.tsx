import { Link } from "react-router-dom"
import RegisterForm from "./components/RegisterForm/RegisterForm"

function Register() {
    return (
        <section className="flex flex-col justify-center items-center h-full">
            <h1 className="text-4xl font-bold mb-10 text-primary">Crea tu cuenta en FlowReserve</h1>
            <RegisterForm></RegisterForm>

            <p className="mt-10 text-xl">¿Ya tienes cuenta?
                <Link to="/login" className="hover:underline text-secondary font-semibold">Iniciar sesión</Link>
            </p>
        </section>
    )
}

export default Register