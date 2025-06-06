import { useState } from 'react';
import { useRegister } from '../../../../hooks/useRegister';
import './RegisterForm.css'
import CustomButton from '../../../../components/CustomButton/CustomButton';

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
<form
  className="flex flex-col gap-4 p-8 rounded-xl shadow-2xl bg-white w-full max-w-md"
  onSubmit={handleSubmit}
>
  {/* Nombre */}
  <div className="flex flex-col">
    <label htmlFor="nombre" className="text-sm font-medium text-gray-700 mb-1">Nombre</label>
    <input
      id="nombre"
      name="nombre"
      type="text"
      required
      placeholder="Ingresa tu nombre"
      className="input"
      onChange={handleChange}
      value={formData.nombre}
    />
  </div>

  {/* Apellido */}
  <div className="flex flex-col">
    <label htmlFor="apellido" className="text-sm font-medium text-gray-700 mb-1">Apellido</label>
    <input
      id="apellido"
      name="apellido"
      type="text"
      required
      placeholder="Ingresa tu apellido"
      className="input"
      onChange={handleChange}
      value={formData.apellido}
    />
  </div>

  {/* Email */}
  <div className="flex flex-col">
    <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
    <input
      id="email"
      name="email"
      type="email"
      required
      placeholder="ejemplo@email.com"
      className="input"
      onChange={handleChange}
      value={formData.email}
    />
  </div>

  {/* Contraseña */}
  <div className="flex flex-col">
    <label htmlFor="contraseña" className="text-sm font-medium text-gray-700 mb-1">Contraseña</label>
    <input
      id="contraseña"
      name="contraseña"
      type="password"
      required
      placeholder="••••••••"
      className="input"
      onChange={handleChange}
      value={formData.contraseña}
    />
  </div>

  {/* Confirmar contraseña */}
  <div className="flex flex-col">
    <label htmlFor="confirmarContraseña" className="text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
    <input
      id="confirmarContraseña"
      name="confirmarContraseña"
      type="password"
      required
      placeholder="Repite tu contraseña"
      className="input"
      onChange={handleChange}
      value={formData.confirmarContraseña}
    />
  </div>

  {/* Código de invitación */}
  <div className="flex flex-col">
    <label htmlFor="codigoInvitacion" className="text-sm font-medium text-gray-700 mb-1">Código de invitación</label>
    <input
      id="codigoInvitacion"
      name="codigoInvitacion"
      type="text"
      required
      placeholder="INV-000-000"
      className="input"
      onChange={handleChange}
      value={formData.codigoInvitacion}
    />
  </div>

  {/* Términos y condiciones */}
  <div className="flex items-start gap-2">
    <input id="privacity-terms" type="checkbox" name="privacity-terms" required />
    <label htmlFor="privacity-terms" className="text-sm text-gray-600">
      He leído y acepto los <a href="#" className="text-blue-600 hover:underline">términos y condiciones</a>, política de privacidad y protección de datos.
    </label>
  </div>

  {/* Mensaje de error/success */}
  <div className="min-h-[40px]">
    {message && (
      <p className={`message-output-form ${message.type}`}>
        {message.text}
      </p>
    )}
  </div>

  {/* Botón de envío */}
  <CustomButton className="mt-4" type="submit" disabled={loading}>
    Crear cuenta
  </CustomButton>
</form>

  );
};

export default RegisterForm;
