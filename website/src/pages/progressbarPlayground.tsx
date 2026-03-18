import { useState } from "react";
import Playground from "../playground/Playground";
import { Input, ProgressBar, Stepper } from "@snowbomb1/nova-ui";


export default function ProgressBarPlayground() {
    const [label, setLabel] = useState<string>("Example Label");
    const [value, setValue] = useState<number>(62);
    const [max, setMax] = useState<number>(100);

    return (
        <Playground
            utils={
                <>
                    <Input label="Label" value={label} onChange={setLabel} />
                    <Stepper label="Progress Value" onChange={setValue} value={value} min={0} max={max} />
                    <Stepper label="Max Value" onChange={setMax} value={max} min={0} max={500} />
                </>
            }
            component={
                <ProgressBar label={label} value={value} max={max} />
            }
            code={``}
        />
    )
}