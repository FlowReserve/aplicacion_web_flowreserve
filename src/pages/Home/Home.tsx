import Welcome from "./components/both/Welcome/Welcome";
import { useAuth } from "../../context/AuthContext";


function Home() {

    const {authData} = useAuth();
    const isMedico = authData?.roles?.includes("DOCTOR");

    return (<div className="max-w-[1200px] m-auto mt-10">
        { isMedico && <Welcome></Welcome>}
    </div>)
}

export default Home;