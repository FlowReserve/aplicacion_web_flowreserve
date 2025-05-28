import { useState } from 'react';
import { useRegister } from '../../../hooks/useRegister';
import './RegisterForm.css'

const RegisterForm = () => {

  const { registerUser, loading, error } = useRegister();

  
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: '',
    codigoInvitacion: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const user = { ...formData };
      delete (user as any).confirmPassword;

      const result = await registerUser(user);
      console.log('Registro exitoso:', result);
      // Aquí puedes redirigir, mostrar mensaje, etc
    } catch (err) {
      console.error('Error al registrar:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' name='nombre' placeholder='Nombre' onChange={handleChange} value={formData.nombre} />
      <input type='text' name='apellido' placeholder='Apellido' onChange={handleChange} value={formData.apellido} />
      <input type='email' name='email' placeholder='Email' onChange={handleChange} value={formData.email} />
      <input type='password' name='password' placeholder='Contraseña' onChange={handleChange} value={formData.password} />
      <input type='password' name='confirmPassword' placeholder='Confirmar Contraseña' onChange={handleChange} value={formData.confirmPassword} />
      <input type='text' name='codigoInvitacion' placeholder='INV-000-000' onChange={handleChange} value={formData.codigoInvitacion} />

      <button type='submit' disabled={loading}>Crear cuenta</button>

      {error && <p className='error-message'>{error}</p>}
    </form>
  );
};

export default RegisterForm;
