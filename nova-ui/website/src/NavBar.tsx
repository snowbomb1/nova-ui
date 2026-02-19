import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Input, TopNav } from '@nova-ui/core';
import { routes } from './routes';
import { SupernovaLogo } from './logo/Logo'

const suggestions: {path: string, pageName: string}[] = routes.map((r) => {
    if (!r.path) return null;
    return {
        path: r.path,
        pageName: r.path.charAt(1).toUpperCase() + r.path.slice(2)
    }
}).filter((r): r is {path: string, pageName: string} => Boolean(r));


const NavBar = () => {
    const navigate = useNavigate();
    const [string, setString] = useState<string>("")

    const navigateHome = () => {
        navigate('/')
    }
    
    const handleChange = (value: string) => {
        setString(value)
        if (!value || value === "") return;
        const matchingRoute = suggestions.find((route) => route.pageName === value);
        if (matchingRoute) {
            navigate(matchingRoute.path)
            setString("")
        }
    }

    return (
        <TopNav
            header={
                <Header variant='h2'>
                Nova UI
                </Header>
            }
            logo={<SupernovaLogo />}
            logoClick={navigateHome}
            search={<Input value={string} suggestions={suggestions.map(r => r.pageName)} onChange={(value) => handleChange(value)} placeholder='Search for a component...' />}
        />
    )
}

export default NavBar;