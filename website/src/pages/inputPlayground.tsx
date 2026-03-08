import { useState } from "react";
import Playground from "../playground/Playground";
import { Input, Toggle } from "@nova-ui/core";


const InputPlayground = () => {
    const [value, setValue] = useState<string>("Option 1");
    const [label, setLabel] = useState<string>("Example Label");
    const [helper, setHelper] = useState<string>("Example Helper Text")
    const [error, setError] = useState<string>("")
    const [required, setRequired] = useState<boolean>(true);
    const [suggesstions, setSuggesstions] = useState<boolean>(true);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [hideClear, setHideClear] = useState<boolean>(false);
    return (
        <Playground
            utils={
                <>
                    <Input label="Label" value={label} onChange={setLabel} />
                    <Input label="Helper Text" value={helper} onChange={setHelper} />
                    <Input label="Error" value={error} onChange={setError} />
                    <Toggle label="Required" value={required} onChange={setRequired} />
                    <Toggle label="Suggesstions" value={suggesstions} onChange={setSuggesstions} />
                    <Toggle label="Disabled" value={disabled} onChange={setDisabled}  />
                    <Toggle label="Hide Clear Icon" value={hideClear} onChange={setHideClear}  />
                </>
            }
            component={
                <Input
                    value={value}
                    onChange={setValue}
                    suggestions={suggesstions ? ["Option 1", "Option 2", "Option 3"] : []}
                    disabled={disabled}
                    hideClear={hideClear}
                    label={label}
                    helperText={helper}
                    error={error}
                    required={required}
                />
            }
            code={
                `
<Input
    value={value}
    onChange={setValue}
    suggestions={${suggesstions ? '["Option 1", "Option 2", "Option 3"]' : "[]"}}
    disabled={${disabled}}
    hideClear={${hideClear}}
    label={"${label}"}
    helperText={"${helper}"}
    error={"${error}"}
    required={${required}}
/>         
`
            }
        />
    )
}

export default InputPlayground;