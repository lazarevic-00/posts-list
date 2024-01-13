import {IComment} from '../../shared/model/Comment';
import {IPagination} from '../../shared/model/Pagination';
import {IPost} from '../../shared/model/Post';
import {IUser} from '../../shared/model/User';
import {POSTS_URL, USER_URL} from '../../utils/helpers/api.routes';
import {requests} from '../../utils/helpers/api.service';

export const PostsService = {
    getUsers: (): Promise<IUser[]> => requests.get(USER_URL),
    getPosts: (pagination?: IPagination): Promise<IPost[]> => requests.get(POSTS_URL, pagination),
    getPostById: (postId: number): Promise<IPost> => requests.get(`${POSTS_URL}/${postId}`),
    getCommentsForPostById: (postId: number): Promise<IComment[]> => requests.get(`${POSTS_URL}/${postId}/comments`)
}