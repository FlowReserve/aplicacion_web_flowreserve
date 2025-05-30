import { useState } from 'react';
import { useRegister } from '../../../hooks/useRegister';
import './RegisterForm.css'
import CustomButton from '../../../components/CustomButton/CustomButton';

const RegisterForm = () => {

  const { registerUser, loading } = useRegister();

  const [message, setMessage] = useState<{ type: 'success' | 'warning' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    contraseña: '',
    confirmarContraseña: '',
    codigoInvitacion: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.contraseña !== formData.confirmarContraseña) {
      setMessage({ type: 'warning', text: 'Error, las contraseñas no coinciden' })
      return;
    }

    try {
      const user = { ...formData };
      delete (user as any).confirmPassword;
      await registerUser(user);
      setMessage({ type: 'success', text: 'Registro completado con éxito' })
      // Aquí puedes redirigir, mostrar mensaje, etc
    } catch (err) {
      setMessage({ type: 'error', text: 'Error al registrar usuario' })
    }
  };

  return (
    <form className='register-form' onSubmit={handleSubmit}>
      <input className='register-form-input' type='text' name='nombre' required placeholder='Nombre' onChange={handleChange} value={formData.nombre} />
      <input className='register-form-input' type='text' name='apellido' required placeholder='Apellido' onChange={handleChange} value={formData.apellido} />
      <input className='register-form-input' type='email' name='email' required placeholder='Email' onChange={handleChange} value={formData.email} />
      <input className='register-form-input' type='password' name='contraseña' required placeholder='Contraseña' onChange={handleChange} value={formData.contraseña} />
      <input className='register-form-input' type='password' name='confirmarContraseña' required placeholder='Confirmar Contraseña' onChange={handleChange} value={formData.confirmarContraseña} />
      <div>
        <label htmlFor="codigoInvitacion">Código invitación</label>
        <input className='register-form-input' type='text' name='codigoInvitacion' required placeholder='INV-000-000' onChange={handleChange} value={formData.codigoInvitacion} />
      </div>

      <div className='privacity-terms-section'>
        <input type='checkbox' name="privacity-terms" required />
        <label className='privacity-text'>He leído y acepto los términos y condiciones, política de privacidad y protección de datos</label>
      </div>

      <div className="message-wrapper">
        {message && (
          <p className={`message-output-form ${message.type}`}>
            {message.text}
          </p>
        )}
      </div>

      <CustomButton className='create-account-btn' type='submit' disabled={loading} title='Crear cuenta en FlowReserve'>Crear cuenta</CustomButton>
    </form>
  );
};

export default RegisterForm;
