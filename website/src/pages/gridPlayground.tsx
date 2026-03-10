import { useState } from "react";
import Playground from "../playground/Playground";
import { Grid, GridGap, Option, Select, Stepper } from "@snowbomb1/nova-ui";

const GridPlayground = () => {
    const [children, setChildren] = useState<number>(3);
    const [defaultColspan, setDefaultColspan] = useState<number>(12)
    const [smColspan, setSmColspan] = useState<number>(12);
    const [mdColspan, setMdColspan] = useState<number>(6);
    const [gridGap, setGridGap] = useState<Option>({ label: 'Medium', value: 'md' });

    return (
        <Playground
            utils={
                <>
                    <Select
                        label="Grid Gap"
                        selectedOption={gridGap}
                        onChange={setGridGap}
                        options={[
                            { label: 'Small', value: 'sm' },
                            { label: 'Medium', value: 'md' },
                            { label: 'Large', value: 'lg' }
                        ]}
                    />
                    <Stepper label="Default Colspan" min={1} max={12} value={defaultColspan} onChange={setDefaultColspan} />
                    <Stepper label="SM Colspan" min={1} max={12} value={smColspan} onChange={setSmColspan} />
                    <Stepper label="MD Colspan" min={1} max={12} value={mdColspan} onChange={setMdColspan} />
                    <Stepper label="Total Children" min={1} value={children} onChange={setChildren} />
                </>
            }
            component={
                <Grid
                    gridDefinition={Array.from({ length: children }).map((c) => {
                        return ({ colspan: { default: defaultColspan, sm: smColspan, md: mdColspan }})
                    })}
                    gap={gridGap.value as GridGap}
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
                </Grid>
            }
            code={
                `
<Box
    gridDefinition={[
        { colspan: { default: ${defaultColspan}, sm: ${smColspan}, md: ${mdColspan} } },
        { colspan: { default: ${defaultColspan}, sm: ${smColspan}, md: ${mdColspan} } },
        { colspan: { default: ${defaultColspan}, sm: ${smColspan}, md: ${mdColspan} } }
    ]}
    gap="${gridGap.value as GridGap}"
>
    {children}
</Box>
`
            }
        />
    )
}

export default GridPlayground;