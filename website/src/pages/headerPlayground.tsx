import { useState } from "react";
import { Header, HeaderVariant, Option, Select, Input, Toggle } from '@snowbomb1/nova-ui';
import Playground from "../playground/Playground";


const HeaderPlayground = () => {
    const [variant, setVariant] = useState<Option>({ label: "H1", value: 'h1' })
    const [text, setText] = useState<string>("Nova UI")
    const [skeleton, setSkeleton] = useState<boolean>(false);
    
    return (
        <Playground
            utils={
                <>
                    <Input label="Header Text" required value={text} onChange={setText} />
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
                    <Toggle label="Skeleton" checked={skeleton} onChange={setSkeleton} />
                </>
            }
            component={
                <Header variant={variant.value as HeaderVariant} skeleton={skeleton}>
                    {text}
                </Header>
            }
            code={
                `
<Header variant={"${variant.value}"} skeleton={${skeleton}}>
    ${text}
</Header>                
`
            }
        />
    )
}

export default HeaderPlayground;