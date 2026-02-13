import { useState } from "react";
import { FormField, Toggle, Input, Option, Select } from "@nova-ui/core";
import Playground from "../playground/Playground";

const TogglePlayground = () => {
    const [label, setLabel] = useState<string>("State 1");
    const [toggleState, setToggleState] = useState<boolean>(false)
    const [disableState, setDisabledState] = useState<Option>({ label: 'Not Disabled', value: 'false' })

    return (
        <Playground
            utils={
                <>
                    <FormField label="Toggle label">
                        <Input value={label} onChange={setLabel} />
                    </FormField>
                    <FormField label="Disabled State">
                        <Select
                            selectedOption={disableState}
                            onChange={setDisabledState}
                            options={[
                                { label: 'Disabled', value: 'true' },
                                { label: 'Not Disabled', value: 'off'}
                            ]}
                        />
                    </FormField>
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