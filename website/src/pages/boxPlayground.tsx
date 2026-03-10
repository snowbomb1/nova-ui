import { useState } from "react";
import Playground from "../playground/Playground";
import { Box, BoxPosition, FlexDirection, Option, Select, Stepper, Toggle } from "@snowbomb1/nova-ui";

const BoxPlayground = () => {
    const [children, setChildren] = useState<number>(3);
    const [position, setPosition] = useState<Option>({ label: "Center", value: "center" });
    const [direction, setDirection] = useState<Option>({ label: "Vertical", value: 'vertical' })
    const [reverse, setReverse] = useState<boolean>(false);

    return (
        <Playground
            utils={
                <>
                    <Select
                        label="Position"
                        selectedOption={position}
                        onChange={setPosition}
                        options={[
                            { label: "Left", value: 'left' },
                            { label: "Center", value: 'center' },
                            { label: 'Right', value: 'right' }
                        ]}
                    />
                    <Select
                        label="Flex Direction"
                        selectedOption={direction}
                        onChange={setDirection}
                        options={[
                            { label: 'Vertical', value: 'vertical' },
                            { label: 'Horizontal', value: 'horizontal' }
                        ]}
                    />
                    <Toggle label="Reverse direction" value={reverse} onChange={setReverse} />
                    <Stepper label="Total Children" min={1} value={children} onChange={setChildren} />
                </>
            }
            component={
                <Box position={position.value as BoxPosition}
                    direction={direction.value as FlexDirection}
                    reverse={reverse}
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
    reverse={${reverse}}
>
    {children}
</Box>
`
            }
        />
    )
}

export default BoxPlayground;