import { useState } from "react";
import { Toggle, Input, Option, Select } from "@nova-ui/core";
import Playground from "../playground/Playground";

const TogglePlayground = () => {
    const [label, setLabel] = useState<string>("State 1");
    const [toggleState, setToggleState] = useState<boolean>(false)
    const [disableState, setDisabledState] = useState<Option>({ label: 'Not Disabled', value: 'false' })

    return (
        <Playground
            utils={
                <>
                    <Input label="Toggle Label" value={label} onChange={setLabel} />
                    <Select
                        label="Disabled State"
                        selectedOption={disableState}
                        onChange={setDisabledState}
                        options={[
                            { label: 'Disabled', value: 'true' },
                            { label: 'Enabled', value: 'off'}
                        ]}
                    />
                </>
            }
            component={
                <Toggle
                    label={label}
                    value={toggleState}
                    onChange={setToggleState}
                    disabled={disableState.value === 'true'}
                />
            }
            code={
                `
<Toggle
    label={label}
    value={toggleState}
    onChange={setToggleState}
    disabled={disableState}
/>            
`
            }
        />
    )
}

export default TogglePlayground;