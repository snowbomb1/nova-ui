import { useState } from "react";
import { Header, HeaderVariant, Option, Select, Input } from '@nova-ui/core';
import Playground from "../playground/Playground";


const HeaderPlayground = () => {
    const [variant, setVariant] = useState<Option>({ label: "H1", value: 'h1' })
    const [string, setString] = useState<string>("Nova UI")
    return (
        <Playground
            utils={
                <>
                    <Input label="Header" required value={string} onChange={setString} />
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