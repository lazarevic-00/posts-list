import {IGallery} from '../../shared/model/Gallery';
import {IPagination} from '../../shared/model/Pagination';
import {GALLERY_URL} from '../../utils/helpers/api.routes';
import {requests} from '../../utils/helpers/api.service';

export const GalleryService = {
    getGalleryImages: (pagination: IPagination): Promise<IGallery[]> => requests.get(GALLERY_URL, pagination)
}