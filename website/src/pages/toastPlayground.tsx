import { useState } from "react";
import { Toast, ToastPosition, ToastStatus, Button, Select, Option, Input, Toggle } from '@nova-ui/core';
import Playground from "../playground/Playground";


const ToastPlayground = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [dismissible, setDismissible] = useState<boolean>(true);
    const [timeOut, setTimeout] = useState<string>("5000");
    const [status, setStatus] = useState<Option>({ label: 'Info', value: 'info' })
    const [location, setLocation] = useState<Option>({ label: 'Top', value: 'top' })

    return (
        <Playground
            utils={
                <>
                    <Select
                        label="Status"
                        selectedOption={status}
                        onChange={setStatus}
                        options={[
                            { label: "Info", value: "info" },
                            { label: "Success", value: "success" },
                            { label: "Warning", value: "warning" },
                            { label: "Error", value: "error" }
                        ]}
                    />
                    <Select
                        label="Toast Location"
                        selectedOption={location}
                        onChange={setLocation}
                        options={[
                            { label: 'Top', value: 'top' },
                            { label: 'Bottom', value: 'bottom' }
                        ]}
                    />
                    <Input label="Timeout" inputMode="numeric" value={timeOut} onChange={setTimeout} />
                    <Toggle label="Dismissible" value={dismissible} onChange={setDismissible} />
                </>
            }
            component={
                <>
                    <Button onClick={() => setVisible(true)}>Open Toast</Button>
                    <Toast
                        visible={visible}
                        onDismiss={(() => setVisible(false))}
                        status={status.value as ToastStatus}
                        position={location.value as ToastPosition}
                        dismissible={dismissible}
                        timeout={Number(timeOut)}
                    >This is a toast</Toast>
                </>
            }
            code={
                `
<Toast
    visible={visible}
    onDismiss={(() => setVisible(false))}
    status={"${status.value as ToastStatus}"}
    position={"${location.value as ToastPosition}"}
    dismissible={${dismissible}}
    timeout={${timeOut}}
>This is a toast</Toast>  
`
            }
        />
    )
}

export default ToastPlayground;