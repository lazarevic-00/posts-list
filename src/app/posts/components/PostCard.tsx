import React, {useState} from 'react';
import {Button, Card, Col} from 'react-bootstrap';
import {useQuery} from 'react-query';
import {useNavigate} from 'react-router-dom';
import ErrorScreen from '../../../shared/components/ErrorScreen';
import LoadingScreen from '../../../shared/components/LoadingScreen';
import {IComment} from '../../../shared/model/Comment';
import {IPost} from '../../../shared/model/Post';
import {PostsService} from '../service';
import PostAuthorDetails from './PostAuthorDetails';
import PostComment from './PostComment';

const fetchComments = async (postId: number, isExpanded = false): Promise<IComment[]> => {
    if (isExpanded)
        return await PostsService.getCommentsForPostById(postId);
    return []
}
const PostCard: React.FC<IPost> = ({id, userId, body, title, isList = true}) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const navigate = useNavigate();
    const {
        data: comments,
        isLoading,
        isError,
        error
    } = useQuery<IComment[], Error>(['comments', id], () => fetchComments(Number(id), isExpanded), {
        retry: false,
        staleTime: 60000, // if comments are same, dont trigger api call
        enabled: isExpanded, // Enable the query only when isExpanded is true
    });

    const handleNavigate = (postId: number, isInList: boolean) => {
        if (isInList) { // list view with all cards
            navigate(`/posts/${postId}`)
        } else { // go back to list of posts
            navigate('/')
        }
    }

    return (
        <Col lg={isList ? 4 : 12} md={6} className="my-3">
            <Card>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text className="mb-0">
                        {body}
                    </Card.Text>
                    <div className="mb-2">
                        {!isLoading && <LoadingScreen message="Loading comments..."/>}
                        {isError && <ErrorScreen message={error?.message}/>}
                        {isExpanded && comments?.map(({id, body, name, email}) => {
                            return (
                                <PostComment key={id} email={email} body={body} name={name}/>
                            )
                        })}
                        <a href={`#${id}`} onClick={() => setIsExpanded(prev => !prev)}>
                            {isExpanded ? 'Hide comments' : 'Show comments'}
                        </a>
                    </div>
                    <Card.Footer className="d-flex align-items-center justify-content-between">
                        <PostAuthorDetails userId={userId}/>
                        <Button variant="primary" onClick={() => handleNavigate(id, isList)}>
                            {isList ? 'Preview' : 'Back'}
                        </Button>
                    </Card.Footer>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default PostCard;
