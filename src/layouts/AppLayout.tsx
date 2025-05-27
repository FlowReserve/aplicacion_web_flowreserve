import { Outlet } from "react-router-dom";

const AppLayout = () =>{
    return (
        <div className="app-layout">
        <header className="app-header">
            <h1>FlowReserve</h1>
        </header>
        <main className="app-content">
            <Outlet />
        </main>
        <footer className="app-footer">
            <p>&copy; 2023 FlowReserve</p>
        </footer>
        </div>
    );
}

export default AppLayout;