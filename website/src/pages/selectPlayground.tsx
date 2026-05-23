import { useState } from "react";
import Playground from "../playground/Playground";
import { Select, Option, Toggle, Input } from '@snowbomb1/nova-ui';


const SelectPlayground = () => {
    const [selectType, setSelectType] = useState<"single" | "multi">("single")
    const [disabled, setDisabled] = useState<boolean>(false);
    const [autoFilter, setAutoFilter] = useState<boolean>(true);
    const [placeholder, setPlaceholder] = useState<string>("Select an Item")
    const [selectedItem, setSelectedItem] = useState<Option | undefined>(undefined);
    const [selectedItems, setSelectedItems] = useState<Option[]>([])
    const [skeleton, setSkeleton] = useState<boolean>(false);
    const [label, setLabel] = useState<string>("Example Select");
    
    return (
        <Playground
            utils={
                <>
                    <Input label="Label" value={label} onChange={setLabel} />
                    <Input label="Placeholder" value={placeholder} onChange={setPlaceholder} />
                    <Toggle label="Disabled" checked={disabled} onChange={setDisabled} />
                    <Toggle label="Auto Filter" checked={autoFilter} onChange={setAutoFilter} />
                    <Toggle 
                        label={selectType === 'single' ? "Single Select" : "Multi Select"}
                        checked={selectType !== "single"}
                        onChange={() => setSelectType(selectType === 'single' ? "multi" : "single")}
                    />
                    <Toggle label="Skeleton" checked={skeleton} onChange={setSkeleton} />
                </>
            }
            component={
                selectType === 'single' ? (
                    <Select
                        label={label}
                        selectType="single"
                        selectedOption={selectedItem}
                        onChange={setSelectedItem}
                        disabled={disabled}
                        placeholder={placeholder}
                        autoFilter={autoFilter}
                        skeleton={skeleton}
                        options={[
                            { label: "Option 1", value: "opt1" },
                            { label: "Option 2", value: "opt2" },
                            { label: "Option 3", value: "opt3" }
                        ]}
                    />
                ) : (
                    <Select
                        label={label}
                        selectType="multi"
                        selectedOption={selectedItems}
                        onChange={setSelectedItems}
                        disabled={disabled}
                        placeholder={placeholder}
                        autoFilter={autoFilter}
                        skeleton={skeleton}
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
<Select
    label={"${label}"}
    selectType={"${selectType}"}
    selectedOption={${selectType === 'single' ? "selectedItem" : "selectedItems"}}
    onChange={${selectType === 'single' ? "setSelectedItem" : "setSelectedItems"}}
    disabled={${disabled}}
    placeholder={"${placeholder}"}
    autoFilter={${autoFilter}}
    skeleton={${skeleton}}
    options={[
        { label: "Option 1", value: "opt1" },
        { label: "Option 2", value: "opt2" },
        { label: "Option 3", value: "opt3" }
    ]}
/>     
`
            }
        />
    )
}

export default SelectPlayground;