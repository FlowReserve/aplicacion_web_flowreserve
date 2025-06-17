import PacientesList from "../../../../Pacientes/components/PacientesList/PacientesList";
import { Link } from "react-router-dom";

const UltimosPacientesList = () => {

    return (
        <section>
            <hr/>
            <div className='flex justify-between items-center py-4'>
                <h2 className='text-5xl py-3 text-primary font-bold'>Tús últimos pacientes</h2>
                <Link className='rounded px-3 py-2 bg-primary text-white hover:bg-accent transition-colors w-[180px] text-center' to={"/pacientes"}>Ver todas</Link>
            </div>
            <PacientesList params={{ size: 5, sortDir: 'desc' }}></PacientesList>
        </section>
    )
}

export default UltimosPacientesList;