import { useState } from "react";
import { Stepper, FormField, Toggle, Input, Option, StepperSize, Select } from "@nova-ui/core";
import Playground from "../playground/Playground";


const StepperPlayground = () => {
    const [number, setNumber] = useState<number>(0);
    const [min, setMin] = useState<string>("0")
    const [max, setMax] = useState<string>("10")
    const [step, setStep] = useState<string>("1")
    const [size, setSize] = useState<Option>({ label: 'Medium', value: 'md' })
    const [disable, setDisable] = useState<boolean>(false);

    return (
        <Playground
            utils={
                <>
                    <FormField label="Min">
                        <Input inputMode="numeric" value={min} onChange={setMin} />
                    </FormField>
                    <FormField label="Max">
                        <Input inputMode="numeric" value={max} onChange={setMax} />
                    </FormField>
                    <FormField label="Step Amount">
                        <Input inputMode="numeric" value={step} onChange={setStep} />
                    </FormField>
                    <FormField label="Stepper Size">
                        <Select
                            selectedOption={size}
                            onChange={setSize}
                            options={[
                                { label: "Small", value: "sm" },
                                { label: "Medium", value: "md" },
                                { label: "Large", value: "lg" }
                            ]}
                        />
                    </FormField>
                    <Toggle label="Disabled" value={disable} onChange={setDisable} />
                </>
            }
            component={
                <Stepper
                    value={number}
                    onChange={setNumber}
                    min={Number(min)}
                    max={Number(max)}
                    step={Number(step)}
                    disabled={disable}
                    size={size.value as StepperSize}
                />
            }
            code={
                `
<Stepper
    value={number}
    onChange={setNumber}
    min={${Number(min)}}
    max={${Number(max)}}
    step={${Number(step)}}
    disabled={${disable}}
    size={${size.value}}
/>          
`
            }
        />
    )
};

export default StepperPlayground;