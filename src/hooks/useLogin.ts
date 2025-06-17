// src/hooks/useLogin.ts
import { useState } from 'react';
import { login as loginService } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import type { UserLoginProps } from '../interfaces/Medico/UserLoginProps';
import type { Role } from '../types/Role';
import { useAuth } from '../context/AuthContext';

interface UseLoginReturn {
  loginUser: (data: UserLoginProps) => Promise<void>;
  loading: boolean;
  message: { text: string; type: 'success' | 'error' } | null;
}

export const useLogin = (): UseLoginReturn => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const loginUser = async (data: UserLoginProps) => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await loginService(data);
      console.log('Login exitoso:', response);

      // Guardar en el contexto, no en localStorage
      login({ id: response.user.id, 
        username: response.user.nombre, 
        token: response.jwt, 
        roles: response.user.roles as Role[] 
      });

      setMessage({ text: 'Inicio de sesión exitoso', type: 'success' });
      navigate('/home');
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err.message || 'Error al iniciar sesión';
      setMessage({ text: errorMessage, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, message };
};
