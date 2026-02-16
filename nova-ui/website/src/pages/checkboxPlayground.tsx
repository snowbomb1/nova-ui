import { useState } from "react";
import { Checkbox, Input, Toggle } from "@nova-ui/core";
import Playground from "../playground/Playground";

const CheckboxPlayground = () => {
    const [label, setLabel] = useState<string>("Example");
    const [checked, setChecked] = useState<boolean>(true);
    const [indeterminate, setIndeterminate] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
    return (
        <Playground
            utils={
                <>
                    <Input label="Label" value={label} onChange={setLabel} />
                    <Toggle value={indeterminate} onChange={setIndeterminate} label="Indeterminate" />
                    <Toggle value={disabled} onChange={setDisabled} label="Disabled" />
                </>
            }
            component={
                <Checkbox
                    checked={checked}
                    indeterminate={indeterminate}
                    disabled={disabled}
                    label={label}
                    onChange={setChecked}
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
/>
`
            }
        />
    )
}

export default CheckboxPlayground;