import { useState } from "react";
import { Modal, ModalSize, Header, Box, BoxPosition, FormField, Select, Option, Viewer, Button } from "@nova-ui/core";
import Playground from "../playground/Playground";
import image from '../assets/PXL_20210711_131653816.PORTRAIT.jpg';


const ModalPlayground = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [size, setSize] = useState<Option>({ label: 'Small', value: 's' });
    const [footerPosition, setFooterPosition] = useState<Option>({ label: "Center", value: 'center' });

    return (
        <Playground
            utils={
                <>
                    <FormField label="Size">
                        <Select
                            selectedOption={size}
                            onChange={setSize}
                            options={[
                                { label: 'Small', value: 's' },
                                { label: 'Medium', value: 'm' },
                                { label: 'Large', value: 'l' },
                                { label: 'X-Large', value: 'xl' }
                            ]}
                        />
                    </FormField>
                    <FormField label="Footer Position">
                        <Select
                            selectedOption={footerPosition}
                            onChange={setFooterPosition}
                            options={[
                                { label: "Left", value: 'left' },
                                { label: "Center", value: 'center' },
                                { label: 'Right', value: 'right' }
                            ]}
                        />
                    </FormField>
                </>
            }
            component={
                <div>
                    <Button onClick={() => setVisible(true)}>
                        Open Modal
                    </Button>
                    <Modal
                        header={<Header variant="h2">Nova</Header>}
                        size={size.value as ModalSize}
                        isVisible={visible}
                        onClose={() => setVisible(false)}
                        footer={
                            <Box position={footerPosition.value as BoxPosition}>
                                <Button onClick={() => setVisible(false)}>
                                    Close Modal
                                </Button>
                            </Box>
                        }
                    >
                        <Box position="center">
                            <Viewer src={image} alt="Nova Image" />
                        </Box>
                    </Modal>
                </div>
            }
            code={
                `
<Modal
    header={<Header variant="h2">Nova</Header>}
    size={"${size.value as ModalSize}"}
    isVisible={${visible}}
    onClose={() => setVisible(false)}
    footer={
        <Box position={"${footerPosition.value as BoxPosition}"}>
            <Button onClick={() => setVisible(false)}>
                Close Modal
            </Button>
        </Box>
    }
>
    <Box position="center">
        <Viewer src={image} alt="Nova Image" />
    </Box>
</Modal>        
`
            }
        />
    )
}

export default ModalPlayground;