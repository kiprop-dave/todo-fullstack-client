import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";

const useLightMode = () => {
    const themeContext = useContext(ThemeContext)
    if(!themeContext) return null;

    const {lightMode,toggleTheme} = themeContext

    return {lightMode,toggleTheme}
}

export default useLightMode