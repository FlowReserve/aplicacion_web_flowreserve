import CustomLink from "../../../../../components/interactive/CustomLink/CustomLink";
import EstadisticasDashboard from "../EstadisticasDashboard/EstadisticasDashboard";
import CustomLinkOutline from "../../../../../components/interactive/CustomLinkOutline/CustomLinkOutline";

const DashBoardCallToAction = () => {
    return (
        <section className="grid grid-cols-2 gap-4 mb-10">
            {/* Columna izquierda */}
            <div className="flex flex-col p-4">
                <h2 className="text-4xl font-semibold text-primary mb-10">¿Necesitas ayuda?</h2>
                <div className="flex gap-4 items-center">
                    <CustomLink className="w-[180px]" to="/preguntas-frecuentes" title="Visitar preguntas frecuentes">
                        Preguntas Frecuentes
                    </CustomLink>
                    <CustomLinkOutline className="w-[180px]" to="/contacto" title="Visitar contacto">
                        Contacto
                    </CustomLinkOutline>
                </div>
            </div>

            {/* Columna derecha alineada a la derecha */}
            <div className="flex justify-end items-start">
                <EstadisticasDashboard />
            </div>

           
            <hr className="col-span-2 border-t border-gray-300 mt-4" />
        </section>
    );
};

export default DashBoardCallToAction;
