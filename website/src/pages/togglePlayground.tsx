import { useState } from "react";
import { Toggle, Input } from "@snowbomb1/nova-ui";
import Playground from "../playground/Playground";

const TogglePlayground = () => {
    const [label, setLabel] = useState<string>("Example Toggle");
    const [toggleState, setToggleState] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(false);
    const [skeleton, setSkeleton] = useState<boolean>(false);

    return (
        <Playground
            utils={
                <>
                    <Input label="Toggle Label" value={label} onChange={setLabel} />
                    <Toggle label="Disabled" checked={disabled} onChange={setDisabled} />
                    <Toggle label="Skeleton" checked={skeleton} onChange={setSkeleton} />
                </>
            }
            component={
                <Toggle
                    label={label}
                    checked={toggleState}
                    onChange={setToggleState}
                    disabled={disabled}
                    skeleton={skeleton}
                />
            }
            code={
                `
<Toggle
    label={"${label}"}
    checked={${toggleState}}
    onChange={setToggleState}
    disabled={${disabled}}
    skeleton={${skeleton}}
/>            
`
            }
        />
    )
}

export default TogglePlayground;