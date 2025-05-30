import CustomLink from "../../../components/CustomLink/CustomLink";
import type { FC } from 'react';

interface MainMenuProps{
    className?: string
}

const MainMenu: FC<MainMenuProps> = ({
    className = ''
}) => {

    return(
        <ul className= {`flex flex-col gap-3 justify-center ${className}`}>
            <li><CustomLink className="w-[140px]" to="/register">Iniciar sesión</CustomLink></li>
            <li><CustomLink className="w-[140px]" to="/register">Registrar cuenta</CustomLink></li>
        </ul>
    )

}
export default MainMenu;