import {IPagination} from '../../shared/model/Pagination';
import {IPost} from '../../shared/model/Post';
import {IUser} from '../../shared/model/User';
import {POSTS_URL, USER_URL} from '../../utils/helpers/api.routes';
import {requests} from '../../utils/helpers/api.service';

export const PostsService = {
    getUserById: (userId: number): Promise<IUser> => requests.get(`${USER_URL}/${userId}`),
    getPosts: (pagination?: IPagination): Promise<IPost[]> => requests.get(POSTS_URL, pagination),
    getPostById: (postId: number): Promise<IPost> => requests.get(`${POSTS_URL}/${postId}`)
}