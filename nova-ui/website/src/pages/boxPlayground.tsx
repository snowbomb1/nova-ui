import { useState } from "react";
import Playground from "../playground/Playground";
import { Box, BoxPosition, FlexDirection, FormField, Option, Select, Stepper } from "@nova-ui/core";

const BoxPlayground = () => {
    const [children, setChildren] = useState<number>(3);
    const [position, setPosition] = useState<Option>({ label: "Center", value: "center" });
    const [direction, setDirection] = useState<Option>({ label: "Vertical", value: 'vertical' })
    return (
        <Playground
            utils={
                <>
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
                    <FormField label="Flex Direction">
                        <Select
                            selectedOption={direction}
                            onChange={setDirection}
                            options={[
                                { label: 'Vertical', value: 'vertical' },
                                { label: 'Horizontal', value: 'horizontal' }
                            ]}
                        />
                    </FormField>
                    <FormField label="Total Children">
                        <Stepper size="md" min={0} value={children} onChange={setChildren} />
                    </FormField>
                </>
            }
            component={
                <Box position={position.value as BoxPosition}
                    direction={direction.value as FlexDirection}
                >
                    {Array.from({ length: children }).map((_, index) => (
                        <div key={index} style={{ 
                            padding: '1rem', 
                            background: 'var(--color-primary)', 
                            color: 'white',
                            borderRadius: '4px' 
                        }}>
                            Child {index + 1}
                        </div>
                    ))}
                </Box>
            }
            code={
                `
<Box
    position={"${position.value}"}
    direction={"${direction.value}"}
>
    {children}
</Box>
`
            }
        />
    )
}

export default BoxPlayground;