import Gallery from '../../app/gallery';
import PostDetails from '../../app/post-details';
import Posts from '../../app/posts';
import {IRoute} from '../../shared/model/Route';

export const routes: IRoute[] = [
    {
        id: 0,
        path: '/',
        name: 'Posts',
        isShownInHeader: true,
        element: <Posts/>
    },
    {
        id: 1,
        path: '/posts/:postId',
        name: 'Post Details',
        element: <PostDetails/>
    },
    {
        id: 2,
        path: '/gallery',
        isShownInHeader: true,
        name: 'Gallery',
        element: <Gallery/>
    },
]