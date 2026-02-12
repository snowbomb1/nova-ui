import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Input, TopNav } from '@nova-ui/core';
import { routes } from './routes';
import { SupernovaLogo } from './logo/Logo'

const suggestions: string[] = routes.map(r => r?.path!)


const NavBar = () => {
    const navigate = useNavigate();
    const [string, setString] = useState<string>("")

    const navigateHome = () => {
        navigate('/')
    }
    
    const handleChange = (value: string) => {
        setString(value)
        const matchingRoute = routes.find((route) => route.path === value);
        if (matchingRoute) {
            navigate(value)
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
            search={<Input value={string} autoComplete='on' suggestions={suggestions} onChange={(value) => handleChange(value)} placeholder='Search for a component...' />}
        />
    )
}

export default NavBar;