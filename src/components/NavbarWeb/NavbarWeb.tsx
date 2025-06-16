// src/components/NavBarWeb.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NavBarWeb = () => {
  const { authData, logout } = useAuth();
  const navigate = useNavigate();

  const isAdmin = authData?.roles.includes('ADMIN');
  const isDoctor = authData?.roles.includes('DOCTOR');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-primary p-3 text-white sticky top-0 shadow-xl">
      <div className="flex justify-between items-center p-2 max-w-[1200px] m-auto">
        <h1 className="text-3xl"><Link to="/home">FlowReserve</Link></h1>

        <ul className="flex gap-5 [&_a]:p-2 [&_a]:inline-block [&_button]:p-2">
          <li><Link to="/home">Inicio</Link></li>

          {isDoctor && (
            <li><Link to="/pacientes">Mis pacientes</Link></li>
          )}

          {isAdmin && (
            <li><Link to="/admin">Admin</Link></li>
          )}

          <li><Link to="/cuenta">Mi cuenta</Link></li>

          <li>
            <button onClick={handleLogout} className="hover:underline">
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default NavBarWeb;
