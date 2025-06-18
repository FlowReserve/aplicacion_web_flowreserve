import CustomLink from "../../../../../components/interactive/CustomLink/CustomLink";
import PacientesList from "../../../../Pacientes/components/PacientesList/PacientesList";

const UltimosPacientesList = () => {

    return (
        <section>
            <hr/>
            <div className='flex justify-between items-center py-4'>
                <h2 className='text-5xl py-3 text-primary font-bold'>Tús últimos pacientes</h2>
                <CustomLink to="/pacientes" className="w-[160px]" title="Ver todos los pacientes">Ver todos</CustomLink>
                
            </div>
            <PacientesList params={{ size: 4, sortDir: 'desc' }}></PacientesList>
        </section>
    )
}

export default UltimosPacientesList;