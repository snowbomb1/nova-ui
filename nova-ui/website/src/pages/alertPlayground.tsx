import { useState } from "react";
import { Alert, AlertType, Option, Select } from "@nova-ui/core";
import Playground from "../playground/Playground";


const AlertPlayground = () => {
    const [alertType, setAlertType] = useState<Option>({ label: 'Info', value: 'info' })

    return (
        <Playground
            utils={
                <Select
                    label="Status"
                    selectedOption={alertType}
                    onChange={setAlertType}
                    options={[
                        { label: "Info", value: "info" },
                        { label: "Success", value: "success" },
                        { label: "Warning", value: "warning" },
                        { label: "Error", value: "error" }
                    ]}
                />
            }
            component={
                <Alert type={alertType.value as AlertType}>Example Alert</Alert>
            }
            code={
                `
<Alert type={"${alertType.value as AlertType}"}>Example Alert</Alert>
`
            }
        />
    )
}

export default AlertPlayground;