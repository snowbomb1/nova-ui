import { useState } from "react";
import { Stepper, Toggle, Input } from "@snowbomb1/nova-ui";
import Playground from "../playground/Playground";


const StepperPlayground = () => {
    const [number, setNumber] = useState<number>(0);
    const [min, setMin] = useState<string>("0")
    const [max, setMax] = useState<string>("10")
    const [step, setStep] = useState<string>("1")
    const [disabled, setDisabled] = useState<boolean>(false);
    const [skeleton, setSkeleton] = useState<boolean>(false);

    return (
        <Playground
            utils={
                <>
                    <Input label="Min" inputMode="numeric" value={min} onChange={setMin} />
                    <Input label="Max" inputMode="numeric" value={max} onChange={setMax} />
                    <Input label="Step Amount" inputMode="numeric" value={step} onChange={setStep} />
                    <Toggle label="Disabled" checked={disabled} onChange={setDisabled} />
                    <Toggle label="Skeleton" checked={skeleton} onChange={setSkeleton} />
                </>
            }
            component={
                <Stepper
                    value={number}
                    onChange={setNumber}
                    min={Number(min)}
                    max={Number(max)}
                    step={Number(step)}
                    disabled={disabled}
                    skeleton={skeleton}
                />
            }
            code={
                `
<Stepper
    value={${number}}
    onChange={setNumber}
    min={${Number(min)}}
    max={${Number(max)}}
    step={${Number(step)}}
    disabled={${disabled}}
    skeleton={${skeleton}}
/>          
`
            }
        />
    )
};

export default StepperPlayground;