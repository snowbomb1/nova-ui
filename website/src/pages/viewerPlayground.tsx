import { useState } from "react";
import { Viewer, Input, FormField, ViewerProps, Select, Option, Toggle } from "@nova-ui/core";
import Playground from '../playground/Playground';
import { formattedObject } from '../utils/stringFormatter';

const imageUrl = "https://uggaa8teyxhdfwbc.public.blob.vercel-storage.com/nova-portrait"
const videoUrl = "https://uggaa8teyxhdfwbc.public.blob.vercel-storage.com/nova-running.mp4"

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
                    <Select label="Media Type" helperText="Detected Automatically"
                        selectType="single" 
                        selectedOption={mediaType}
                        onChange={(option) => setMediaType(option)}
                        options={[
                            { label: "image", value: "image" },
                            { label: "video", value: "video"}
                        ]}
                    />
                    <Input label="Thumbnail Width" helperText="Width in Pixels" value={width} onChange={setWidth} />
                    <FormField label="Video Options">
                        <>
                            {Object.keys(videoOptions as Array<keyof typeof videoOptions>).map((key) => (
                                <Toggle
                                    key={key}
                                    label={key}
                                    value={videoOptions[key as keyof typeof videoOptions] || false}
                                    onChange={() => toggleVideoSetting(key as keyof typeof videoOptions)}
                                />
                            ))}
                        </>
                    </FormField>
                </>
            }
            component={
                <Viewer
                    src={mediaType?.value === "image" ? imageUrl : videoUrl}
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