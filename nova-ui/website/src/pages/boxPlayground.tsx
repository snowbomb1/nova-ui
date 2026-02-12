import { useState } from "react";
import Playground from "../playground/Playground";
import { Box, BoxPosition, FormField, Option, Select } from "@nova-ui/core";


const BoxPlayground = () => {
    const [position, setPosition] = useState<Option>({ label: "Center", value: "center" });
    return (
        <Playground
            utils={
                <FormField label="Position">
                    <Select
                        selectedOption={position}
                        onChange={setPosition}
                        options={[
                            { label: "Left", value: 'left' },
                            { label: "Center", value: 'center' },
                            { label: 'Right', value: 'right' }
                        ]}
                    />
                </FormField>
            }
            component={
                <Box position={position.value as BoxPosition}>
                    Box Example
                </Box>
            }
            code={
                `
<Box position={"${position.value}"}>
    Box Example
</Box>
`
            }
        />
    )
}

export default BoxPlayground;