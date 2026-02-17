import { useState } from "react";
import { Accordion, Box, Input, Toggle, Viewer } from "@nova-ui/core";
import Playground from "../playground/Playground";

const imageUrl = "https://uggaa8teyxhdfwbc.public.blob.vercel-storage.com/nova-portrait"

const AccordionPlayground = () => {
    const [title, setTitle] = useState<string>("Example Title");
    const [defaultOpen, setDefaultOpen] = useState<boolean>(false);
    return (
        <Playground
            utils={
                <>
                    <Input label="Title" required value={title} onChange={setTitle} />
                    <Toggle value={defaultOpen} onChange={setDefaultOpen} label="Default Open" />
                </>
            }
            component={
                <Accordion
                    title={title}
                    defaultOpen={defaultOpen}
                >
                    <Box>
                        <Viewer src={imageUrl} alt="Nova Portrait" />
                    </Box>
                </Accordion>
            }
            code={
                `
 <Accordion
    title={"${title}"}
    defaultOpen={${defaultOpen}}
>
    <Box>
        <Viewer src={imageUrl} alt="Nova Portrait" />
    </Box>
</Accordion>
`
            }
        />
    )
};

export default AccordionPlayground;