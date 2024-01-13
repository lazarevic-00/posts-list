import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {useQuery} from 'react-query';
import {useParams} from 'react-router-dom';
import ErrorScreen from '../../shared/components/ErrorScreen';
import SkeletonCard from '../../shared/components/SkeletonCard';
import {IPost} from '../../shared/model/Post';
import PostCard from '../posts/components/PostCard';
import {PostsService} from '../posts/service';

const fetchPost = async (postId: number) => {
    return await PostsService.getPostById(postId);
}
const PostDetails: React.FC = () => {
    const {postId} = useParams<{ postId: string }>();
    const {
        data: post,
        isLoading,
        isError,
        error
    } = useQuery<IPost, Error>(['post', postId], () => fetchPost(Number(postId)), {
        retry: false,
    });

    if (isLoading) {
        return <SkeletonCard nbElements={1} colSize={12}/>
    }

    if (isError) {
        return <ErrorScreen message={error?.message}/>
    }
    if (!post) {
        return <ErrorScreen message="Not found"/>
    }
    return (
        <div className="container mt-3">
            <Row>
                <Col md={12}>
                    <h2 className="text-center mt-4">Post details #{postId}</h2>
                </Col>
                <Col md={12} className="flex-center">
                    <PostCard {...post} isList={false}/>
                </Col>
            </Row>
        </div>
    );
};

export default PostDetails;
