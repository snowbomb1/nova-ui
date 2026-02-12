import { useState } from "react";
import { Button, ButtonVariant, TooltipPosition, Option, FormField, Select, Toggle, Input } from "@nova-ui/core";
import Playground from "../playground/Playground";



const ButtonPlayground = () => {
    const [position, setPosition] = useState<Option>({ label: 'top', value: 'top' })
    const [variant, setVariant] = useState<Option>({ label: 'Primary', value: 'primary' })
    const [disabled, setDisabled] = useState<boolean>(false);
    const [disabledMesssage, setDisabledMessage] = useState<string>("")

    return (
        <Playground
            utils={
                <>
                    <FormField label="Variant">
                        <Select
                            selectedOption={variant}
                            onChange={setVariant}
                            options={[
                                { label: "Primary", value: "primary" },
                                { label: "Secondary", value: "secondary" },
                                { label: "Icon", value: "icon" }
                            ]}
                        />
                    </FormField>
                    <Toggle label="Disabled" state={disabled} onChange={setDisabled} />
                    <FormField label="Disabled Mesage">
                        <Input value={disabledMesssage} onChange={setDisabledMessage} />
                    </FormField>
                    <FormField label="Tooltip Position">
                        <Select
                            selectedOption={position}
                            onChange={setPosition}
                            options={[
                                { label: "Top", value: "top" },
                                { label: "Bottom", value: "bottom" },
                                { label: "Left", value: "left" },
                                { label: "Right", value: "right" }
                            ]}
                        />
                    </FormField>
                </>
            }
            component={
                <Button
                    variant={variant.value as ButtonVariant}
                    disabled={disabled}
                    onClick={() => console.log("clicked!")}
                    disabledMessage={disabledMesssage}
                    tooltipPosition={position.value as TooltipPosition}
                >Click me</Button>
            }
            code={
                `
<Button
    variant={"${variant.value}"}
    disabled={${disabled}}
    onClick={() => console.log("clicked!")}
    disabledMessage={"${disabledMesssage}"}
    tooltipPosition={"${position.value}"}
>Click me</Button>             
`
            }
        />
    )
}

export default ButtonPlayground;