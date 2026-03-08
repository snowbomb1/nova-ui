import { useState } from "react";
import { Container, ContainerVariant, ContainerPadding, Button, Option,
    Select, Box, Viewer, Input, Toggle, Header} from "@nova-ui/core";
import Playground from "../playground/Playground";

const imageUrl = "https://uggaa8teyxhdfwbc.public.blob.vercel-storage.com/nova-portrait"


const ContainerPlayground = () => {
    const [header, setHeader] = useState<string>("Nova Portrait");
    const [footer, setFooter] = useState<string>("Example Footer")
    const [actions, setActions] = useState<boolean>(true);
    const [variant, setVariant] = useState<Option>({ label: "Default", value: "default" });
    const [padding, setPadding] = useState<Option>({ label: 'Medium', value: 'md' });
    return (
        <Playground
            utils={
                <>
                    <Input label="Header" value={header} onChange={setHeader} />
                    <Input label="Footer" value={footer} onChange={setFooter} />
                    <Select
                        label="Variant"
                        selectedOption={variant}
                        onChange={setVariant}
                        options={[
                            { label: "Default", value: "default" },
                            { label: "Flat", value: "flat" },
                            { label: "Outlined", value: "outlined" },
                            { label: "Elevated", value: "elevated" }
                        ]}
                    />
                    <Select
                        label="Padding"
                        selectedOption={padding}
                        onChange={setPadding}
                        options={[
                            { label: 'None', value: 'none' },
                            { label: 'Small', value: 'sm' },
                            { label: 'Medium', value: 'md' },
                            { label: 'Large', value: 'lg' }
                        ]}
                    />
                    <Toggle value={actions} onChange={setActions} label="Header Actions" />
                </>
            }
            component={
                <Container
                    header={header && <Header variant="h2">{header}</Header>}
                    headerActions={actions && (
                        <Button onClick={() => console.log("clicked")}>Click me</Button>
                    )}
                    variant={variant.value as ContainerVariant}
                    padding={padding.value as ContainerPadding}
                    footer={footer}
                >
                    <Box>
                        <Viewer src={imageUrl} alt="Nova Portrait" />
                    </Box>
                </Container>
            }
            code={
                `
<Container
    header={<Header variant="h2">${header}</Header>}
    ${actions ? `headerActions={<Button onClick={() => console.log("clicked")}>Click me</Button>}`: ''}
    variant={"${variant.value as ContainerVariant}"}
    padding={"${padding.value as ContainerPadding}"}
>
    <Box>
        <Viewer src={imageUrl} alt="Nova Portrait" />
    </Box>
</Container>
`
            }
        />
    )
}

export default ContainerPlayground;