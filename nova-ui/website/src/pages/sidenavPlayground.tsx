import { useState } from "react";
import { SideNav } from "@nova-ui/core";
import Playground from "../playground/Playground";


const SideNavPlayground = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Playground
            component={
                <>
                    <SideNav
                        isOpen={isOpen}
                        onToggle={() => setIsOpen(!isOpen)}
                        items={[
                            { label: "Item 1", icon: <>😀</>, onClick: () => console.log("Clicked Item 1") }
                        ]}
                    />
                </>
            }
            code={
                `
<SideNav
    isOpen={isOpen}
    onToggle={() => setIsOpen(!isOpen)}
    items={[
        { label: "Item 1", icon: <>😀</>, onClick: () => console.log("Clicked Item 1") }
    ]}
/>   
`
            }
        />
    )
}

export default SideNavPlayground;