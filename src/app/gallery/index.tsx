import React, {useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useQuery} from 'react-query';
import ErrorScreen from '../../shared/components/ErrorScreen';
import LoadingScreen from '../../shared/components/LoadingScreen';
import {usePagination} from '../../shared/hooks/usePagination';
import {IGallery} from '../../shared/model/Gallery';
import {IPagination} from '../../shared/model/Pagination';
import GalleryCard from './components/GalleryCard';
import GalleryFilter from './components/GalleryFilter';
import {GalleryService} from './service';

const fetchGalleryImages = async (pagination: IPagination) => {
    return await GalleryService.getGalleryImages(pagination);
}

const Gallery: React.FC = () => {
    const [limit, setLimit] = useState<number>(20)

    const {pagination, changeFilterHandler} = usePagination({
        _limit: limit
    });
    const {
        data: galleryImages,
        isLoading,
        isError,
        error,
    } = useQuery<IGallery[], Error>(
        ['gallery', pagination],
        () => fetchGalleryImages(pagination),
        {
            keepPreviousData: true,
            getNextPageParam: (lastPage, allPages) => (lastPage.length === 10 ? allPages.length + 1 : undefined),
        }
    );
    const handleSetLimit = () => {
        changeFilterHandler('_limit', limit)
    }

    if (isLoading) {
        return <LoadingScreen message="Loading images..."/>;
    }

    if (isError) {
        return <ErrorScreen message={error?.message}/>
    }
    return (
        <div className="container">
            <h2 className="text-center mt-4">Gallery</h2>
            <GalleryFilter handleSetLimit={handleSetLimit} limit={limit} setLimit={setLimit}/>
            <Row>
                {galleryImages?.map(({id, title, thumbnailUrl, url, albumId}) => {
                    return (
                        <Col md={6} lg={4} xl={2} key={id} className="mb-3">
                            <GalleryCard id={id} url={url} title={title} thumbnailUrl={thumbnailUrl}
                                         albumId={albumId}/>
                        </Col>

                    )
                })}
            </Row>

        </div>
    );
};

export default Gallery;
