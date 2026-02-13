import { useState } from "react";
import Playground from "../playground/Playground";
import { Input, Toggle } from "@nova-ui/core";


const InputPlayground = () => {
    const [value, setValue] = useState<string>("Option 1")
    const [disabled, setDisabled] = useState<boolean>(false);
    const [hideClear, setHideClear] = useState<boolean>(false);
    return (
        <Playground
            utils={
                <>
                    <Toggle label="Disabled" value={disabled} onChange={setDisabled}  />
                    <Toggle label="Hide Clear Icon" value={hideClear} onChange={setHideClear}  />
                </>
            }
            component={
                <Input
                    value={value}
                    onChange={setValue}
                    suggestions={["Option 1", "Option 2", "Option 3"]}
                    disabled={disabled}
                    hideClear={hideClear}
                />
            }
            code={
                `
<Input
    value={value}
    onChange={setValue}
    suggestions={["Option 1", "Option 2", "Option 3"]}
    disabled={${disabled}}
    hideClear={${hideClear}}
/>         
`
            }
        />
    )
}

export default InputPlayground;