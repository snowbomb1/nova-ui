import { useState } from "react";
import { Tooltip, Select, Option, TooltipPosition } from "@nova-ui/core";
import Playground from '../playground/Playground';


const TooltipPlayground = () => {
    const [position, setPosition] = useState<Option>({ label: 'Top', value: 'top' })
    return (
        <Playground
            utils={
                <Select
                    label="Position"
                    selectedOption={position}
                    onChange={setPosition}
                    options={[
                        { label: 'Top', value: 'top' },
                        { label: 'Bottom', value: 'bottom' },
                        { label: 'Left', value: 'left' },
                        { label: 'Right', value: 'right' }
                    ]}
                />
            }
            component={
                <Tooltip position={position.value as TooltipPosition} message="Hello World">
                    Hover me
                </Tooltip>
            }
            code={
                `
<Tooltip position={"${position.value}"} message="Hello World">
    Hover me
</Tooltip>          
`
            }
        />
    )
}

export default TooltipPlayground;