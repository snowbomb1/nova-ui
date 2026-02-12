import { useTheme } from "../../hooks/useTheme";
import { FaSun, FaMoon } from "react-icons/fa";
import { Button } from "../Button/Button";


export const ThemeToggler = () => {
    const { isDark, isTransitioning, toggleTheme } = useTheme();
    return (
        <Button variant="icon" onClick={toggleTheme} disabled={isTransitioning}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}>
            { isDark ? <FaSun size="20" /> : <FaMoon size="20" />}
        </Button>
    )
};