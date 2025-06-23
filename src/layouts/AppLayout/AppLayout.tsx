import { Outlet } from "react-router-dom";
import FooterWeb from "../../components/webElements/FooterWeb/FooterWeb";
import './AppLayout.css';
import NavBarWeb from "../../components/webElements/NavbarWeb/NavbarWeb";
const AppLayout = () => {
    return (
        <div className="app-layout">
            <NavBarWeb></NavBarWeb>
            <main className="app-content">
                <Outlet />
            </main>
            <FooterWeb></FooterWeb>
        </div>
    );
}

export default AppLayout;