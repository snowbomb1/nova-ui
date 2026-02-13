import { useState } from "react";
import Playground from "../playground/Playground";
import { FormField, Option, Select, Input } from "@nova-ui/core";


const FormFieldPlayground = () => {
    const [label, setLabel] = useState<string>("This field is required")
    const [description, setDescription] = useState<string>("This will scale when hovered")
    const [selected, setSelected] = useState<Option | undefined>(undefined);
    return (
        <Playground
            utils={
                <>
                <FormField label="Label">
                    <Input value={label} onChange={setLabel} />
                </FormField>
                <FormField label="Description">
                    <Input value={description} onChange={setDescription} />
                </FormField>
                </>
            }
            component={
                <FormField
                    label={label}
                    description={description}
                >
                    <Select
                        selectedOption={selected}
                        onChange={setSelected}
                        options={[
                            { label: "Option 1", value: "opt1" },
                            { label: "Option 2", value: "opt2" },
                            { label: "Option 3", value: "opt3" }
                        ]}
                    />
                </FormField>
            }
            code={
                `
<FormField
    label={label}
    description={description}
>
    <Select
        selectedOption={selected}
        onChange={setSelected}
        options={[
            { label: "Option 1", value: "opt1" },
            { label: "Option 2", value: "opt2" },
            { label: "Option 3", value: "opt3" }
        ]}
    />
</FormField>              
`
            }
        />
    )
}

export default FormFieldPlayground;