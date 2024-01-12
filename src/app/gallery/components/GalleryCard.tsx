import React from 'react';
import {Card} from 'react-bootstrap';
import {IGallery} from '../../../shared/model/Gallery';

const GalleryCard: React.FC<IGallery> = ({
                                             id,
                                             title,
                                             url,
                                             albumId,
                                             thumbnailUrl
                                         }) => {
    return (
        <Card>
            <Card.Img variant="top" loading="lazy" className="w-100" src={thumbnailUrl}/>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <div>
                    <span className="fw-bold">ALBUM ID: </span>
                    <span>{albumId}</span>
                </div>
                <div>
                    <span className="fw-bold">ID: </span>
                    <span>{id}</span>
                </div>
                {/*<Button variant="primary">Go somewhere</Button>*/}
            </Card.Body>
        </Card>
    );
};

export default GalleryCard;
