import Welcome from "./components/both/Welcome/Welcome";
import { useAuth } from "../../context/AuthContext";
import UltimasConsultasList from "./components/user/UltimasConsultasList/UltimasConsultasList";


function Home() {

    const {authData} = useAuth();
    const isMedico = authData?.roles?.includes("DOCTOR");

    return (<div className="flex flex-col gap-2 max-w-[1200px] m-auto mt-10">
        { isMedico && <Welcome></Welcome>}
        {isMedico && <UltimasConsultasList></UltimasConsultasList>}
    </div>)
}

export default Home;