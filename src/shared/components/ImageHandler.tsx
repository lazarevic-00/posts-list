import React, {ImgHTMLAttributes, SyntheticEvent} from 'react';

interface ImageHandlerProps extends ImgHTMLAttributes<HTMLImageElement> {
    // Additional props for ImageHandler component
}

const ImageHandler: React.FC<ImageHandlerProps> = ({onError, ...props}) => {
    const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        if (onError) {
            onError(e);
        }
        // Set a fallback image source on error
        e.currentTarget.src = '/images/placeholder.jpeg';
    };

    return (
        <img
            {...props}
            alt={props?.alt || props?.title}
            onError={handleImageError}
            loading="lazy"
        />
    );
};
export default ImageHandler;
