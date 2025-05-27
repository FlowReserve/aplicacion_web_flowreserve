import type { FC } from 'react';
import './FooterWeb.css';

const FooterWeb: FC = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <img src="/public/web/flowreserve-logo.png" alt="Logo" className="footer-logo" />

                <nav className="footer-links">
                    <a href="https://www.google.es" target="_blank" rel="noopener noreferrer">Inicio</a>
                    <a href="https://www.google.es" target="_blank" rel="noopener noreferrer">Contacto</a>
                    <a href="https://www.google.es" target="_blank" rel="noopener noreferrer">Ayuda</a>
                </nav>
            </div>
        </footer>
    )
}

export default FooterWeb;