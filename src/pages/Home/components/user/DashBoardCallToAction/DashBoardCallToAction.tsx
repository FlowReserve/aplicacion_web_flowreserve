import CustomLink from "../../../../../components/CustomLink/CustomLink";
import EstadisticasDashboard from "../EstadisticasDashboard/EstadisticasDashboard";

const DashBoardCallToAction = () => {

    return(
        <section className="flex gap-4">

            <div className="flex flex-col flex-grow justify-center items-center">
                <h2 className="text-4xl text-primary mb-4">¿Necesitas ayuda?</h2>

                <div className="flex items-center flex-1">
                    <CustomLink to="/preguntas-frecuentes" title="Visitar preguntas frecuentes">Preguntas Frecuentes</CustomLink>
                    <CustomLink to="/contacto" title="Visitar contacto">Contacto</CustomLink>
                </div>
            </div>

            <EstadisticasDashboard></EstadisticasDashboard>
        </section>
    )
}

export default DashBoardCallToAction;