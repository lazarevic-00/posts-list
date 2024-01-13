import React, {SetStateAction, useState} from 'react';
import {Row} from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useQuery} from 'react-query';
import ErrorScreen from '../../shared/components/ErrorScreen';
import SkeletonCard from '../../shared/components/SkeletonCard';
import {IPagination} from '../../shared/model/Pagination';
import {IPost} from '../../shared/model/Post';
import {usePostPaginationContext} from '../../utils/context/PostPaginationContext';
import PostCard from './components/PostCard';
import {PostsService} from './service';


const fetchPosts = async (pagination: IPagination, setTotalCount: React.Dispatch<SetStateAction<number>>): Promise<IPost[]> => {
    const response = await PostsService.getPosts(pagination);
    const totalNumberOfPosts = response?.headers?.['x-total-count'];
    setTotalCount(Number(totalNumberOfPosts));
    return response?.data;
}

const Posts: React.FC = () => {
    const [totalCount, setTotalCount] = useState<number>(0)
    const {pagination, changeFilterHandler} = usePostPaginationContext();
    const {
        data: posts,
        isLoading,
        isError,
        error,
    } = useQuery<IPost[], Error>(
        ['posts', pagination],
        () => fetchPosts(pagination, setTotalCount),
        {
            keepPreviousData: true,
            getNextPageParam: (lastPage, allPages) => (lastPage.length === 10 ? allPages.length + 1 : undefined),
        }
    );

    if (isLoading) {
        return <SkeletonCard/>
    }

    if (isError) {
        return <ErrorScreen message={error?.message}/>
    }
    return (
        <div className="container">
            <h2 className="text-center mt-4">Posts list</h2>
            <InfiniteScroll
                dataLength={posts?.length || 0}
                next={() => changeFilterHandler('_limit', pagination?._limit + 10)}
                hasMore={pagination?._limit < totalCount}
                loader={<p className="text-center">Loading more...</p>}
                endMessage={<p className="text-center fw-bold">You reached end!</p>}
            >
                <Row>
                    {posts?.map(({id, title, userId, body}) => {
                        return (
                            <PostCard key={id} id={id} title={title} userId={userId} body={body}/>
                        )
                    })}
                </Row>
            </InfiniteScroll>

        </div>
    );
};

export default Posts;
