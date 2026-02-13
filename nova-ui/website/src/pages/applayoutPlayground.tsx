import { useState } from "react";
import Playground from "../playground/Playground";
import { AppLayout, Box, Header, SideNav, TopNav } from "@nova-ui/core";
import { SupernovaLogo } from '../logo/Logo';

const ApplayoutPlayground = () => {
    const [sideNavOpen, setSideNavOpen] = useState<boolean>(true);

    return (
        <Playground
            component={
                <AppLayout
                    sideNavOpen={sideNavOpen}
                    sideNav={
                        <SideNav
                            isOpen={sideNavOpen}
                            onToggle={() => setSideNavOpen(!sideNavOpen)}
                            items={[
                                { label: "Item 1", icon: <>😀</>, onClick: () => console.log("Clicked Item 1") }
                            ]}
                        />
                    }
                    topNav={
                        <TopNav
                            header={<Header variant="h2">Nova UI</Header>}
                            logo={<SupernovaLogo />}
                            logoClick={() => console.log("Navigate Home!")}
                        />
                    }
                >
                    <>
                    </>
                </AppLayout>
            }
            code={
                `
<AppLayout
    sideNavOpen={sideNavOpen}
    sideNav={
        <SideNavBar
            isOpen={sideNavOpen}
            onToggle={() => setSideNavOpen(!sideNavOpen)}
        />
    }
    topNav={
        <TopNavBar />
    }
>
    <Box position="center">
        App content
    </Box>
</AppLayout>      
`
            }
        />
    )
}

export default ApplayoutPlayground;