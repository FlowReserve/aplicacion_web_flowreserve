import Welcome from "./components/both/Welcome/Welcome";
import { useAuth } from "../../context/AuthContext";
import UltimosPacientesList from "./components/user/UltimosPacientesList/UltimosPacientesList";


function Home() {

    const {authData} = useAuth();
    const isMedico = authData?.roles?.includes("DOCTOR");

    return (<div className="flex flex-col gap-2 max-w-[1200px] m-auto mt-10">
        { isMedico && <Welcome></Welcome>}
        {isMedico && <UltimosPacientesList></UltimosPacientesList>}
        
    </div>)
}

export default Home;