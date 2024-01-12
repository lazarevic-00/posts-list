import React from 'react';
import {Row} from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useQuery} from 'react-query';
import ErrorScreen from '../../shared/components/ErrorScreen';
import LoadingScreen from '../../shared/components/LoadingScreen';
import {usePagination} from '../../shared/hooks/usePagination';
import {IPagination} from '../../shared/model/Pagination';
import {IPost} from '../../shared/model/Post';
import PostCard from './components/PostCard';
import {PostsService} from './service';

 
const fetchPosts = async (pagination: IPagination) => {
    return await PostsService.getPosts(pagination);
}


const Posts: React.FC = () => {
    const {pagination, changeFilterHandler} = usePagination({
        _limit: 20
    });
    const {
        data: posts,
        isLoading,
        isError,
        error,
    } = useQuery<IPost[], Error>(
        ['posts', pagination],
        () => fetchPosts(pagination),
        {
            keepPreviousData: true,
            getNextPageParam: (lastPage, allPages) => (lastPage.length === 10 ? allPages.length + 1 : undefined),
        }
    );

    if (isLoading) {
        return <LoadingScreen message="Loading posts..."/>;
    }

    if (isError) {
        return <ErrorScreen message={error?.message}/>
    }
    return (
        <div className="container">
            <h2 className="text-center mt-4">Posts list</h2>
            <InfiniteScroll
                dataLength={!!posts ? posts.length : 0}
                next={() => changeFilterHandler('_limit', pagination?._limit + 10)}
                hasMore={!!posts ? posts?.length < 99 : false}
                loader={<p className="text-center">Loading more...</p>}
                endMessage={<p className="text-center fw-bold">You reached end!</p>}
            >
                <Row>
                    {posts?.map(({id, title, userId, body}) => (
                        <PostCard key={id} id={id} title={title} userId={userId} body={body}/>
                    ))}
                </Row>
            </InfiniteScroll>

        </div>
    );
};

export default Posts;
