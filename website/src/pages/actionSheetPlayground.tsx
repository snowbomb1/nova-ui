import { useState } from "react";
import { ActionSheet, Button } from "@nova-ui/core";
import Playground from "../playground/Playground";


const ActionSheetPlayground = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    return (
        <Playground
            component={
                <>
                <Button onClick={() => setIsOpen(true)}>Open</Button>
                <ActionSheet
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Example Action Sheet"
                    message="Example Message"
                    actions={[
                        { label: "Example Action", onClick: () => console.log("Action Clicked") },
                        { label: "Disabled Action", onClick: () => null, disabled: true },
                        { label: "Distructive Action", onClick: () => console.error("Distructive Action Clicked!"), destructive: true }
                    ]}
                />
                </>
            }
            code={
                `
<ActionSheet
    isOpen={${isOpen}}
    onClose={() => setIsOpen(false)}
    title="Example Action Sheet"
    message="Example Message"
    actions={[
        { label: "Example Action", onClick: () => console.log("Action Clicked") },
        { label: "Disabled Action", onClick: () => null, disabled: true },
        { label: "Distructive Action", onClick: () => console.error("Distructive Action Clicked!"), destructive: true }
    ]}
/>
`
            }
        />
    )
};

export default ActionSheetPlayground;