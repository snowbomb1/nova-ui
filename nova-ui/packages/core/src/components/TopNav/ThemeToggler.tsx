import { useTheme } from "../../hooks/useTheme";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { Button } from "../Button/Button";


export const ThemeToggler = () => {
    const { theme, isTransitioning, toggleTheme } = useTheme();
    return (
        <Button variant="icon" onClick={toggleTheme} disabled={isTransitioning}
            aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}>
            { theme === 'dark' ? <SunIcon width="24" /> : <MoonIcon width="24" />}
        </Button>
    )
};