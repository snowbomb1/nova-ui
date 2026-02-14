import { useTheme } from "../../hooks/useTheme";
import { FaSun, FaMoon } from "react-icons/fa";
import { Button } from "../Button/Button";


export const ThemeToggler = () => {
    const { theme, isTransitioning, toggleTheme } = useTheme();
    return (
        <Button variant="icon" onClick={toggleTheme} disabled={isTransitioning}
            aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}>
            { theme === 'dark' ? <FaSun size="20" /> : <FaMoon size="20" />}
        </Button>
    )
};