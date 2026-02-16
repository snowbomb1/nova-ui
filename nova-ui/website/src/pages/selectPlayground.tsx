import { useState } from "react";
import Playground from "../playground/Playground";
import { Select, Option, Toggle, Input } from '@nova-ui/core';


const SelectPlayground = () => {
    const [selectType, setSelectType] = useState<"single" | "multi">("single")
    const [disabled, setDisabled] = useState<boolean>(false);
    const [autoFilter, setAutoFilter] = useState<boolean>(true);
    const [placeholder, setPlaceHolder] = useState<string>("Select an Item")
    const [selectedItem, setSelectedItem] = useState<Option | undefined>(undefined);
    const [selectedItems, setSelectedItems] = useState<Option[]>([])
    return (
        <Playground
            utils={
                <>
                    <Toggle label="Disabled" value={disabled} onChange={setDisabled} />
                    <Toggle label="Auto Filter" value={autoFilter} onChange={setAutoFilter} />
                    <Toggle label={selectType === 'single' ? "Single Select" : "Multi Select"}
                        value={selectType !== "single"}
                        onChange={() => {
                            if (selectType === 'single') {
                                setSelectType("multi")
                            } else {
                                setSelectType("single")
                            }
                        }}
                    />
                    <Input label="Placeholder" value={placeholder} onChange={setPlaceHolder} />
                </>
            }
            component={
                selectType === 'single' ? (
                    <Select
                        selectType="single"
                        selectedOption={selectedItem}
                        onChange={setSelectedItem}
                        disabled={disabled}
                        placeholder={placeholder}
                        autoFilter={autoFilter}
                        options={[
                            { label: "Option 1", value: "opt1" },
                            { label: "Option 2", value: "opt2" },
                            { label: "Option 3", value: "opt3" }
                        ]}
                    />
                ) : (
                    <Select
                        selectType="multi"
                        selectedOption={selectedItems}
                        onChange={setSelectedItems}
                        disabled={disabled}
                        placeholder={placeholder}
                        autoFilter={autoFilter}
                        options={[
                            { label: "Option 1", value: "opt1" },
                            { label: "Option 2", value: "opt2" },
                            { label: "Option 3", value: "opt3" }
                        ]}
                    />
                )
            }
            code={
                `
const [selectedItem, setSelectedItem] = useState<Option | undefined>(undefined);
return (
    <Select
        selectType={"${selectType}"}
        selectedOption={${selectType === 'single' ? "selectedItem" : "selectedItems"}}
        onChange={${selectType === 'single' ? "setSelectedItem" : "setSelectedItems"}}
        disabled={${disabled}}
        placeholder={placeholder}
        autoFilter={${autoFilter}}
        options={[
            { label: "Option 1", value: "opt1" },
            { label: "Option 2", value: "opt2" },
            { label: "Option 3", value: "opt3" }
        ]}
    />
)     
`
            }
        />
    )
}

export default SelectPlayground;