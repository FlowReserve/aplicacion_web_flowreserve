import CustomButton from '../../components/CustomButton/CustomButton';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login('admin', '543dgfsf294nsfsDAdaftasdas'); // simula login como admin
    navigate('/admin');
  };

  return (
    <div>
      <h1>Landing - Login</h1>
      <CustomButton onClick={handleLogin} title='Iniciar sesión'>Iniciar sesión como admin</CustomButton>

      <CustomButton onClick={logout} title='Cerrar sesión'>Cerrar sesión</CustomButton>
    </div>
  );
}

export default Landing;
