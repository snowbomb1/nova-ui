import { useState } from "react";
import { Header, HeaderVariant, Option, Select, FormField, Input } from '@nova-ui/core';
import Playground from "../playground/Playground";


const HeaderPlayground = () => {
    const [variant, setVariant] = useState<Option>({ label: "H1", value: 'h1' })
    const [string, setString] = useState<string>("Nova UI")
    return (
        <Playground
            utils={
                <>
                    <FormField label="Header">
                        <Input value={string} onChange={setString} />
                    </FormField>
                    <FormField label="Header variant">
                        <Select
                            selectedOption={variant}
                            onChange={setVariant}
                            options={[
                                { label: "H1", value: "h1" },
                                { label: "H2", value: "h2" },
                                { label: "H3", value: "h3" },
                                { label: "H4", value: "h4" }
                            ]}
                        />
                    </FormField>
                </>
            }
            component={
                <Header variant={variant.value as HeaderVariant}>
                    {string}
                </Header>
            }
            code={
                `
<Header variant={"${variant.value as HeaderVariant}"}>
    ${string}
</Header>                
`
            }
        />
    )
}

export default HeaderPlayground;