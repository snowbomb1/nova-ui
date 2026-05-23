import { useState } from "react";
import Playground from "../playground/Playground";
import { Box, FormField, Input, Toggle } from "@snowbomb1/nova-ui";


const FormFieldPlayground = () => {
    const [label, setLabel] = useState<string>("Settings")
    const [description, setDescription] = useState<string>("Example Helper")
    const [required, setRequired] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [skeleton, setSkeleton] = useState<boolean>(false);
    
    return (
        <Playground
            utils={
                <>
                    <Input label="Label" required value={label} onChange={setLabel} />
                    <Input label="Helper Text" value={description} onChange={setDescription} />
                    <Input label="Error State" value={error} onChange={setError} />
                    <Toggle label="Required" checked={required} onChange={setRequired} />
                    <Toggle label="Skeleton" checked={skeleton} onChange={setSkeleton} />
                </>
            }
            component={
                <FormField
                    label={label}
                    helperText={description}
                    required={required}
                    error={error}
                    skeleton={skeleton}
                >
                    <Box direction="horizontal">
                        <Toggle label="Setting 1" checked={true} onChange={() => null} />
                        <Toggle label="Setting 2" checked={true} onChange={() => null} />
                        <Toggle label="Setting 3" checked={true} onChange={() => null} />
                    </Box>
                </FormField>
            }
            code={
                `
<FormField
    label={"${label}"}
    helperText={"${description}"}
    required={${required}}
    error={"${error}"}
    skeleton={${skeleton}}
>
    <Box direction="horizontal">
        <Toggle label="Setting 1" checked={true} onChange={() => null} />
        <Toggle label="Setting 2" checked={true} onChange={() => null} />
        <Toggle label="Setting 3" checked={true} onChange={() => null} />
    </Box>
</FormField>             
`
            }
        />
    )
}

export default FormFieldPlayground;