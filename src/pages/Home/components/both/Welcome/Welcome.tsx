import { usePerfilMedico } from "../../../../../hooks/medico/usePerfilMedico";
import { useAuth } from "../../../../../context/AuthContext";
import { useEstadisticasMedico } from "../../../../../hooks/medico/useEstadisticasMedico";
import ItemStats from "../../../../../components/ItemStats/ItemStats";

const Welcome = () => {
    const { authData } = useAuth();

    if (!authData?.id || !authData?.token) {
        return <p>Error: No hay datos de autenticación disponibles.</p>;
    }

    const {
        data: perfil,
        loading: loadingPerfil,
        error: errorPerfil
    } = usePerfilMedico(authData.token);

    const {
        data: estadisticas,
        loading: loadingEstadisticas,
        error: errorEstadisticas
    } = useEstadisticasMedico(authData.id, authData.token);

    if (loadingPerfil || loadingEstadisticas) return <p>Cargando datos...</p>;

    if (errorPerfil || errorEstadisticas) {
        return (
            <p>
                Error al obtener datos:
                {errorPerfil && <span> Perfil: {errorPerfil}</span>}
                {errorEstadisticas && <span> Estadísticas: {errorEstadisticas}</span>}
            </p>
        );
    }

    return (
        <section className="flex justify-between items-center min-h-[250px] max-h-[400px]">
            <h1 className="text-6xl">Bienvenido, <br /> <strong>Dr. {perfil?.nombre}!</strong></h1>
            <ul className="flex gap-2">
                <li>
                    <ItemStats className="w-[180px]" linkPath={{ path: '/pacientes', value: 'Ver consultas' }} number={estadisticas?.total || 0}>Consultas totales</ItemStats>
                </li>
                <li>
                    <ItemStats className="w-[180px]" linkPath={{ path: '/pacientes', value: 'Ver consultas' }} number={estadisticas?.finalizadas || 0}>Consultas completadas</ItemStats>
                </li>
                <li>
                    <ItemStats className="w-[180px]" linkPath={{ path: '/pacientes', value: 'Ver pacientes' }} number={estadisticas?.totalPacientes || 0}> Pacientes únicos</ItemStats>
                </li>
            </ul>
        </section>
    );
};

export default Welcome;
