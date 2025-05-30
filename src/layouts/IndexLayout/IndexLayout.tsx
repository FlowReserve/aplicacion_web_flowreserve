import { Outlet } from "react-router-dom";
import FooterWeb from "../../components/FooterWeb/FooterWeb";
import './IndexLayout.css';
const IndexLayout = () =>{
    return (
        <div className="index-layout">
        <main className="app-content">
            <Outlet />
        </main>
        <FooterWeb></FooterWeb>
        </div>
    );
}

export default IndexLayout;