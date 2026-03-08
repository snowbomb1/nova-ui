import { SideNav } from "@nova-ui/core";
import { useNavigate } from "react-router-dom";
import { routes } from "./routes";

interface SideNavBarProps {
    isOpen: boolean;
    onToggle: () => void;
}

const labelFormat = (path: string) => {
    if (path === '/') return 'Home';
    const segment = path.split('/')[1]; 
    return segment.charAt(0).toUpperCase() + segment.slice(1);
}

export const SideNavBar = ({isOpen, onToggle}: SideNavBarProps) => {
    const navigate = useNavigate();
    return (
        <SideNav
            isOpen={isOpen}
            items={routes.map((r) => {
                return {
                    label: labelFormat(r.path!),
                    onClick: () => navigate(r.path!)
                }
            })}
            onToggle={onToggle}
        />
    )
}