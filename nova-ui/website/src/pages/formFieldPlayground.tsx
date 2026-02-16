import { useState } from "react";
import Playground from "../playground/Playground";
import { FormField, Input, Toggle } from "@nova-ui/core";


const FormFieldPlayground = () => {
    const [label, setLabel] = useState<string>("Settings")
    const [description, setDescription] = useState<string>("Example Description")
    const [required, setRequired] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    return (
        <Playground
            utils={
                <>
                    <Input label="Label" required value={label} onChange={setLabel} />
                    <Input label="Description" value={description} onChange={setDescription} />
                    <Input label="Error State" value={error} onChange={setError} />
                    <Toggle label="Required" value={required} onChange={setRequired} />
                </>
            }
            component={
                <FormField
                    label={label}
                    description={description}
                    required={required}
                    error={error}
                >
                    <>
                        <Toggle label="Setting 1" value={true} onChange={() => null} />
                        <Toggle label="Setting 2" value={true} onChange={() => null} />
                        <Toggle label="Setting 3" value={true} onChange={() => null} />
                    </>
                </FormField>
            }
            code={
                `
<FormField
    label={label}
    description={description}
    required={${required}}
    error={${error}}
>
     <>
        <Toggle label="Setting 1" value={true} onChange={() => null} />
        <Toggle label="Setting 2" value={true} onChange={() => null} />
        <Toggle label="Setting 3" value={true} onChange={() => null} />
    </>
</FormField>             
`
            }
        />
    )
}

export default FormFieldPlayground;