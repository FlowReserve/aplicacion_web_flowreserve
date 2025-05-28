import { useState } from 'react';
import { useRegister } from '../../../hooks/useRegister';
import './RegisterForm.css'

const RegisterForm = () => {

  const { registerUser, loading, error } = useRegister();

  
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    contraseña: '',
    confirmarContraseña : '',
    codigoInvitacion: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.contraseña !== formData.confirmarContraseña) {
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
    <form className='register-form' onSubmit={handleSubmit}>
      <input type='text' name='nombre' placeholder='Nombre' onChange={handleChange} value={formData.nombre} />
      <input type='text' name='apellido' placeholder='Apellido' onChange={handleChange} value={formData.apellido} />
      <input type='email' name='email' placeholder='Email' onChange={handleChange} value={formData.email} />
      <input type='password' name='contraseña' placeholder='Contraseña' onChange={handleChange} value={formData.contraseña} />
      <input type='password' name='confirmarContraseña' placeholder='Confirmar Contraseña' onChange={handleChange} value={formData.confirmarContraseña} />
      <input type='text' name='codigoInvitacion' placeholder='INV-000-000' onChange={handleChange} value={formData.codigoInvitacion} />

      <div><input type='checkbox' name="privacity-terms"/> <label >He leido y acepto los terminos y condiciones política de privacidad y protección de datos </label></div>
      <button className='btn-register-form' type='submit' disabled={loading}>Crear cuenta</button>

      {error && <p className='error-message'>{error}</p>}
    </form>
  );
};

export default RegisterForm;
