import { useState } from "react";
import { register } from "../services/authService";
import type { UserRegisterProps } from "../interfaces/UserRegisterProps";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerUser = async (user: UserRegisterProps) => {
    setLoading(true);
    setError(null);

    try {
      const result = await register(user);
      return result;
    } catch (err: any) {
      setError(err.message || 'Error desconocido');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, error };
};
