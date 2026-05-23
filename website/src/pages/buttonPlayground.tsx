import { useState } from "react";
import { Button, ButtonVariant, TooltipPosition, Option, Select, Toggle, Input } from "@snowbomb1/nova-ui";
import Playground from "../playground/Playground";



const ButtonPlayground = () => {
    const [position, setPosition] = useState<Option>({ label: 'Top', value: 'top' })
    const [variant, setVariant] = useState<Option>({ label: 'Primary', value: 'primary' })
    const [disabled, setDisabled] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [skeleton, setSkeleton] = useState<boolean>(false); 
    const [disabledMessage, setDisabledMessage] = useState<string>("")

    return (
        <Playground
            utils={
                <>
                    <Select
                        label="Variant"
                        selectedOption={variant}
                        onChange={setVariant}
                        options={[
                            { label: "Primary", value: "primary" },
                            { label: "Secondary", value: "secondary" },
                            { label: "Icon", value: "icon" }
                        ]}
                    />
                    <Select
                        label="Tooltip Position"
                        selectedOption={position}
                        onChange={setPosition}
                        options={[
                            { label: "Top", value: "top" },
                            { label: "Bottom", value: "bottom" },
                            { label: "Left", value: "left" },
                            { label: "Right", value: "right" }
                        ]}
                    />
                    <Input label="Disabled Message" value={disabledMessage} onChange={setDisabledMessage} />
                    <Toggle label="Disabled" checked={disabled} onChange={setDisabled} />
                    <Toggle label="Loading" checked={loading} onChange={setLoading} />
                    <Toggle label="Skeleton" checked={skeleton} onChange={setSkeleton} />
                </>
            }
            component={
                <Button
                    variant={variant.value as ButtonVariant}
                    disabled={disabled}
                    onClick={() => console.log("clicked!")}
                    disabledMessage={disabledMessage}
                    tooltipPosition={position.value as TooltipPosition}
                    loading={loading}
                    skeleton={skeleton}
                >Click me</Button>
            }
            code={
                `
<Button
    variant={"${variant.value}"}
    disabled={${disabled}}
    onClick={() => console.log("clicked!")}
    disabledMessage={"${disabledMessage}"}
    tooltipPosition={"${position.value}"}
    loading={${loading}}
    skeleton={${skeleton}}
>Click me</Button>             
`
            }
        />
    )
}

export default ButtonPlayground;