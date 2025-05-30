import { useState } from 'react';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        contraseña: '',
    });

    const [message, setMessage] = useState<{ text: string; type: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            // Simulación de autenticación
            if (!formData.email || !formData.contraseña) {
                throw new Error('Todos los campos son obligatorios');
            }

            // Lógica de autenticación (reemplazar con tu hook o servicio real)
            console.log('Autenticando...', formData);
            // Simular éxito
            setTimeout(() => {
                setMessage({ text: 'Inicio de sesión exitoso', type: 'success' });
                setLoading(false);
            }, 1000);
        } catch (err: any) {
            setMessage({ text: err.message || 'Error al iniciar sesión', type: 'error' });
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col rounded gap-2 px-4 py-10 w-full max-w-md shadow-2xl"
        >
            <label htmlFor="email">Dirección correo electrónico</label>
            <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                required
                className="input"
                value={formData.email}
                onChange={handleChange}
            />

            <label htmlFor="contraseña">Contraseña</label>
            <input
                id="contraseña"
                name="contraseña"
                type="password"
                placeholder="Contraseña"
                required
                className="input"
                value={formData.contraseña}
                onChange={handleChange}
            />
            <Link to="/" className='font-bold text-center'>Olvidé mi contraseña</Link>
            <div className="message-wrapper h-6">
                {message && (
                    <p className={`message-output-form ${message.type}`}>
                        {message.text}
                    </p>
                )}
            </div>

            <CustomButton
                className="mt-4"
                type="submit"
                disabled={loading}
                title="Iniciar sesión en FlowReserve"
            >
                Iniciar sesión
            </CustomButton>
        </form>
    );
};

export default LoginForm;
