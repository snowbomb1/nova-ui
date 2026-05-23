import { useState } from "react";
import { Checkbox, Input, Toggle } from "@snowbomb1/nova-ui";
import Playground from "../playground/Playground";

const CheckboxPlayground = () => {
    const [label, setLabel] = useState<string>("Example Checkbox");
    const [checked, setChecked] = useState<boolean>(true);
    const [indeterminate, setIndeterminate] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [skeleton, setSkeleton] = useState<boolean>(false);
    
    return (
        <Playground
            utils={
                <>
                    <Input label="Label" value={label} onChange={setLabel} />
                    <Toggle checked={indeterminate} onChange={setIndeterminate} label="Indeterminate" />
                    <Toggle checked={disabled} onChange={setDisabled} label="Disabled" />
                    <Toggle checked={skeleton} onChange={setSkeleton} label="Skeleton" />
                </>
            }
            component={
                <Checkbox
                    checked={checked}
                    indeterminate={indeterminate}
                    disabled={disabled}
                    label={label}
                    onChange={setChecked}
                    skeleton={skeleton}
                />
            }
            code={
                `
<Checkbox
    checked={${checked}}
    indeterminate={${indeterminate}}
    disabled={${disabled}}
    label={"${label}"}
    onChange={setChecked}
    skeleton={${skeleton}}
/>
`
            }
        />
    )
}

export default CheckboxPlayground;