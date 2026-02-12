import { useState } from "react";
import { Tooltip, Select, Option, FormField, TooltipPosition } from "@nova-ui/core";
import Playground from '../playground/Playground';


const TooltipPlayground = () => {
    const [position, setPosition] = useState<Option>({ label: 'top', value: 'top' })
    return (
        <Playground
            utils={
                <FormField label="Position">
                    <Select
                        selectedOption={position}
                        onChange={setPosition}
                        options={[
                            { label: 'Top', value: 'top' },
                            { label: 'Bottom', value: 'bottom' },
                            { label: 'Left', value: 'left' },
                            { label: 'Right', value: 'right' }
                        ]}
                    />
                </FormField>
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