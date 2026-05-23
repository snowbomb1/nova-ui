import { useState } from "react";
import { Accordion, AccordionGroup, Box, Input, Toggle, Viewer } from "@snowbomb1/nova-ui";
import Playground from "../playground/Playground";

const imageUrl = "https://uggaa8teyxhdfwbc.public.blob.vercel-storage.com/nova-portrait"

const AccordionPlayground = () => {
    const [title, setTitle] = useState<string>("Example Title");
    const [defaultOpen, setDefaultOpen] = useState<boolean>(false);
    const [skeleton, setSkeleton] = useState<boolean>(false);
    const [useGroup, setUseGroup] = useState<boolean>(false);
    const [allowMultiple, setAllowMultiple] = useState<boolean>(false);
    
    return (
        <Playground
            utils={
                <>
                    <Input label="Title" required value={title} onChange={setTitle} />
                    <Toggle checked={defaultOpen} onChange={setDefaultOpen} label="Default Open" />
                    <Toggle checked={skeleton} onChange={setSkeleton} label="Skeleton" />
                    <Toggle checked={useGroup} onChange={setUseGroup} label="Use AccordionGroup" />
                    {useGroup && (
                        <Toggle checked={allowMultiple} onChange={setAllowMultiple} label="Allow Multiple Open" />
                    )}
                </>
            }
            component={
                useGroup ? (
                    <AccordionGroup allowMultiple={allowMultiple}>
                        <Accordion id="section-1" title={title} skeleton={skeleton}>
                            <Box>
                                <Viewer src={imageUrl} alt="Nova Portrait" />
                            </Box>
                        </Accordion>
                        <Accordion id="section-2" title="Section 2" skeleton={skeleton}>
                            <Box>
                                <p>Content for section 2</p>
                            </Box>
                        </Accordion>
                        <Accordion id="section-3" title="Section 3" skeleton={skeleton}>
                            <Box>
                                <p>Content for section 3</p>
                            </Box>
                        </Accordion>
                    </AccordionGroup>
                ) : (
                    <Accordion
                        title={title}
                        defaultOpen={defaultOpen}
                        skeleton={skeleton}
                    >
                        <Box>
                            <Viewer src={imageUrl} alt="Nova Portrait" />
                        </Box>
                    </Accordion>
                )
            }
            code={
                useGroup ? `
<AccordionGroup allowMultiple={${allowMultiple}}>
    <Accordion id="section-1" title={"${title}"} skeleton={${skeleton}}>
        <Box>
            <Viewer src={imageUrl} alt="Nova Portrait" />
        </Box>
    </Accordion>
    <Accordion id="section-2" title="Section 2" skeleton={${skeleton}}>
        <Box>
            <p>Content for section 2</p>
        </Box>
    </Accordion>
    <Accordion id="section-3" title="Section 3" skeleton={${skeleton}}>
        <Box>
            <p>Content for section 3</p>
        </Box>
    </Accordion>
</AccordionGroup>
` : `
<Accordion
    title={"${title}"}
    defaultOpen={${defaultOpen}}
    skeleton={${skeleton}}
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