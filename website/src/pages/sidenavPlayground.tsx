import { useState } from "react";
import { SideNav, Toggle } from "@snowbomb1/nova-ui";
import Playground from "../playground/Playground";


const SideNavPlayground = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [position, setPosition] = useState<boolean>(true);

    return (
        <Playground
            utils={
                <Toggle label={`Position - ${position ? "Left Side" : "Right Side"} `} value={position} onChange={setPosition} />
            }
            component={
                <>
                    <SideNav
                        isOpen={isOpen}
                        position={position ? "left" : "right"}
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
    position={${position ? "left" : "right"}}
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