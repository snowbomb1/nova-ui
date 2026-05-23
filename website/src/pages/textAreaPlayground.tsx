import { useState } from "react";
import Playground from "../playground/Playground";
import { Input, TextArea, Toggle } from "@snowbomb1/nova-ui";


export default function TextAreaPlayground() {
    const [value, setValue] = useState<string>("");
    const [label, setLabel] = useState<string>("Example Label");
    const [helperText, setHelperText] = useState<string>("Example Helper Text");
    const [error, setError] = useState<string>("");
    const [required, setRequired] = useState<boolean>(true);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [skeleton, setSkeleton] = useState<boolean>(false);

    return (
        <Playground
            utils={
                <>
                    <Input label="Label" value={label} onChange={setLabel} />
                    <Input label="Helper Text" value={helperText} onChange={setHelperText} />
                    <Input label="Error" value={error} onChange={setError} />
                    <Toggle label="Required" checked={required} onChange={setRequired} />
                    <Toggle label="Disabled" checked={disabled} onChange={setDisabled} />
                    <Toggle label="Skeleton" checked={skeleton} onChange={setSkeleton} />
                </>
            }
            component={
                <TextArea
                    fullWidth
                    required={required}
                    disabled={disabled}
                    label={label}
                    helperText={helperText}
                    error={error}
                    value={value}
                    onChange={setValue}
                    placeholder="Enter text here"
                    skeleton={skeleton}
                />
            }
            code={`
<TextArea
    fullWidth
    required={${required}}
    disabled={${disabled}}
    label={"${label}"}
    helperText={"${helperText}"}
    error={"${error}"}
    value={value}
    onChange={setValue}
    placeholder="Enter text here"
    skeleton={${skeleton}}
/>
`}
        />
    )
}