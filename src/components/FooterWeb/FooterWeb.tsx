import type { FC } from 'react';
import { Link } from 'react-router-dom';
import './FooterWeb.css';

const FooterWeb: FC = () => {
    return (
        <footer className="flex flex-col items-center p-5">
            <Link to="/">
                <img src="/web/flowreserve-logo.png" alt="Logo" className="w-[90%] m-auto  sm:w-[300px]" />
            </Link>

            <nav className="flex items-center flex-col md:flex-row gap-8">
                <a href="https://www.google.es" target="_blank" rel="noopener noreferrer">Inicio</a>
                <a href="https://www.google.es" target="_blank" rel="noopener noreferrer">Contacto</a>
                <a href="https://www.google.es" target="_blank" rel="noopener noreferrer">Ayuda</a>
                <a href="https://www.google.es" target="_blank" rel="noopener noreferrer">Términos legales</a>
                <a href="https://www.google.es" target="_blank" rel="noopener noreferrer">Privacidad</a>
            </nav>
        </footer>
    )
}

export default FooterWeb;