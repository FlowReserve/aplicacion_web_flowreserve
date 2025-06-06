import { Link } from "react-router-dom"

const NavBarWeb = () => {
    return (
        <header className="bg-primary p-3 text-white sticky top-0">
            <div className="flex justify-between items-center p-2 max-w-[1200px] m-auto">
                <h1 className="text-3xl">FlowReserve</h1>
                <ul className="flex gap-5">
                    <li><Link to="/home">Inicio</Link></li>
                    <li><Link to="/pacientes">Mis pacientes</Link></li>
                    <li><Link to="/admin">Admin</Link></li>
                    <li><Link to="/cuenta">Mi cuenta</Link></li>
                    <li><Link to="/">Cerrar sesión</Link></li>
                </ul>
            </div>
        </header>
    )
}

export default NavBarWeb