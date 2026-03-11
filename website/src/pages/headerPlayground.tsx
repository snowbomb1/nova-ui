import { useState } from "react";
import { Header, HeaderVariant, Option, Select, Input } from '@snowbomb1/nova-ui';
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
                            { label: "H4", value: "h4" },
                            { label: "H5", value: "h5" },
                            { label: "H6", value: "h6" }
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