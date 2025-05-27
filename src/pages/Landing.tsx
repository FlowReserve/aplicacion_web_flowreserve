import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login('admin'); // simula login como admin
    navigate('/admin');
  };

  return (
    <div>
      <h1>Landing - Login</h1>
      <button onClick={handleLogin}>Iniciar sesión como admin</button>
    </div>
  );
}

export default Landing;
