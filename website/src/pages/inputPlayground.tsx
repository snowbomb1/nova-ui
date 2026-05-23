import { useState } from "react";
import Playground from "../playground/Playground";
import { Input, Toggle, Select, Option } from "@snowbomb1/nova-ui";


const InputPlayground = () => {
    const [value, setValue] = useState<string>("Option 1");
    const [label, setLabel] = useState<string>("Example Label");
    const [helper, setHelper] = useState<string>("Example Helper Text")
    const [error, setError] = useState<string>("")
    const [required, setRequired] = useState<boolean>(true);
    const [suggestions, setSuggestions] = useState<boolean>(true);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [hideClear, setHideClear] = useState<boolean>(false);
    const [skeleton, setSkeleton] = useState<boolean>(false);
    const [inputType, setInputType] = useState<Option>({ label: "text", value: "text" });
    const [showAdornments, setShowAdornments] = useState<boolean>(false);

    const typeOptions: Option[] = [
        { label: "text", value: "text" },
        { label: "password", value: "password" },
        { label: "email", value: "email" },
        { label: "tel", value: "tel" },
        { label: "url", value: "url" },
        { label: "search", value: "search" },
        { label: "number", value: "number" }
    ];

    return (
        <Playground
            utils={
                <>
                    <Input label="Label" value={label} onChange={setLabel} />
                    <Input label="Helper Text" value={helper} onChange={setHelper} />
                    <Input label="Error" value={error} onChange={setError} />
                    <Select 
                        label="Input Type" 
                        selectedOption={inputType} 
                        onChange={setInputType}
                        options={typeOptions}
                    />
                    <Toggle label="Required" checked={required} onChange={setRequired} />
                    <Toggle label="Suggestions" checked={suggestions} onChange={setSuggestions} />
                    <Toggle label="Disabled" checked={disabled} onChange={setDisabled} />
                    <Toggle label="Hide Clear Icon" checked={hideClear} onChange={setHideClear} />
                    <Toggle label="Show Adornments" checked={showAdornments} onChange={setShowAdornments} />
                    <Toggle label="Skeleton" checked={skeleton} onChange={setSkeleton} />
                </>
            }
            component={
                <Input
                    value={value}
                    onChange={setValue}
                    type={inputType.value as 'text' | 'password' | 'email' | 'tel' | 'url' | 'search' | 'number'}
                    suggestions={suggestions ? ["Option 1", "Option 2", "Option 3"] : []}
                    disabled={disabled}
                    hideClear={hideClear}
                    label={label}
                    helperText={helper}
                    error={error}
                    required={required}
                    skeleton={skeleton}
                    startAdornment={showAdornments ? <span>$</span> : undefined}
                    endAdornment={showAdornments ? <span>.00</span> : undefined}
                />
            }
            code={
                `
<Input
    value={value}
    onChange={setValue}
    type={"${inputType.value}"}
    suggestions={${suggestions ? '["Option 1", "Option 2", "Option 3"]' : "[]"}}
    disabled={${disabled}}
    hideClear={${hideClear}}
    label={"${label}"}
    helperText={"${helper}"}
    error={"${error}"}
    required={${required}}
    skeleton={${skeleton}}${showAdornments ? `
    startAdornment={<span>$</span>}
    endAdornment={<span>.00</span>}` : ''}
/>         
`
            }
        />
    )
}

export default InputPlayground;