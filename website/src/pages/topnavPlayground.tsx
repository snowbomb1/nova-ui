import { useState } from "react";
import { Header, Input, TopNav, Option, Select, HeaderVariant, Toggle } from '@nova-ui/core';
import { SupernovaLogo } from '../logo/Logo'
import Playground from "../playground/Playground";


const TopNavPlayground = () => {
    const [string, setString] = useState<string>("")
    const [header, setHeader] = useState<string>("Nova UI")
    const [variant, setVariant] = useState<Option>({ label: "h2", value: "h2" })
    const [autoComplete, setAutoComplete] = useState<boolean>(true);
    const suggestions = ["Option 1", "Option 2", "Option 3"]
    
    const handleChange = (value: string) => {
        setString(value)
        const matchingRoute = suggestions.find((sug) => sug === value);
        if (matchingRoute) {
            return;
        }
    }

    return (
        <Playground
            utils={
                <>
                    <Input label="Header" value={header} onChange={setHeader} />
                    <Select
                        label="Header Variant"
                        selectedOption={variant}
                        onChange={setVariant}
                        options={[
                            { label: "H1", value: "h1" },
                            { label: "H2", value: "h2" },
                            { label: "H3", value: "h3" },
                            { label: "H4", value: "h4" }
                        ]}
                    />
                    <Toggle label="AutoComplete" value={autoComplete} onChange={setAutoComplete} />
                </>
            }
            component={
                <TopNav
                    header={
                        <Header variant={variant.value as HeaderVariant}>
                            {header}
                        </Header>
                    }
                    logo={<SupernovaLogo />}
                    search={
                        <Input 
                            value={string} 
                            autoComplete={autoComplete ? 'on' : 'off'}
                            suggestions={suggestions} onChange={handleChange}
                            placeholder='Search for a component...'
                        />
                    }
                />
            }
            code={
                `
<TopNav
    header={
        <Header variant={"${variant.value}">
            ${header}
        </Header>
    }
    logo={<SupernovaLogo />}
    search={
        <Input 
            value={string} 
            autoComplete={${autoComplete ? '"on"' : '"off"'}}
            suggestions={${suggestions}} 
            onChange={handleChange}
            placeholder='Search for a component...'
        />
    }
/>                
`
            }
        />
    )
}

export default TopNavPlayground;