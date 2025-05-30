import { Outlet } from "react-router-dom";
import FooterWeb from "../../components/FooterWeb/FooterWeb";
import './AppLayout.css';
const AppLayout = () =>{
    return (
        <div className="app-layout">
        <header className="app-header">
            <h1 className="text-3xl font-bold underline">FlowReserve</h1>
        </header>
        <main className="app-content">
            <Outlet />
        </main>
        <FooterWeb></FooterWeb>
        </div>
    );
}

export default AppLayout;