import { useState } from "react";
import { Viewer, Input, FormField, ViewerProps, Select, Option, Toggle } from "@nova-ui/core";
import Playground from '../playground/Playground';
import image from '../assets/PXL_20210711_131653816.PORTRAIT.jpg';
import video from '../assets/20230622_065810.mp4';
import { formattedObject } from '../utils/stringFormatter';

const ViewerPlayground = () => {
    const [mediaType, setMediaType] = useState<Option>({ label: "image", value: "image"})
    const [width, setWidth] = useState<ViewerProps["thumbnailWidth"]>("300px");
    const [videoOptions, setVideoOptions] = useState<NonNullable<ViewerProps["video"]>>({ 
        loop: true, 
        controls: true, 
        autoPlay: true, 
        muted: true 
    });

    const toggleVideoSetting = (key: keyof typeof videoOptions) => {
        setVideoOptions(prev => ({
            ...prev,
            [key]: !prev[key]
        }))
    };

    return (
        <Playground
            utils={
                <>
                    <FormField label="Media Type">
                        <Select selectType="single" 
                            selectedOption={mediaType}
                            onChange={(option) => setMediaType(option)}
                            options={[
                                { label: "image", value: "image" },
                                { label: "video", value: "video"}
                            ]}
                        />
                    </FormField>
                    <FormField label="Thumbnail Width">
                        <Input value={width} onChange={setWidth} />
                    </FormField>
                    <FormField label="Video Options">
                        {Object.keys(videoOptions as Array<keyof typeof videoOptions>).map((key) => (
                            <Toggle
                                key={key}
                                label={key}
                                value={videoOptions[key as keyof typeof videoOptions] || false}
                                onChange={() => toggleVideoSetting(key as keyof typeof videoOptions)}
                            />
                        ))}
                    </FormField>
                </>
            }
            component={
                <Viewer
                    src={mediaType?.value === "image" ? image : video}
                    alt={mediaType?.value === "image" ? 'Nova Portrait' : "Nova Running"}
                    thumbnailWidth={width}
                    video={videoOptions}
                    onError={(e) => console.error(e)}
                />
            }
            code={
                `
<Viewer
    src={src}
    alt={alt}
    thumbnailWidth={"${width}"}
    video={${formattedObject(videoOptions)}}
    onError={(e) => console.error(e)}
/>
`
            }
        />
    )
}

export default ViewerPlayground;