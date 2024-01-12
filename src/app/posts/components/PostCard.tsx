import {truncate} from 'lodash';
import React, {useState} from 'react';
import {Button, Card, Col} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {IPost} from '../../../shared/model/Post';
import PostAuthorDetails from './PostAuthorDetails';

const PostCard: React.FC<IPost> = ({id, userId, body, title, isList = true}) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const navigate = useNavigate();
    const getBodyLength = (expanded = false) => {
        return expanded ? body?.length + 1 : 100;
    }
    const handleExpand = () => {
        setIsExpanded(prev => !prev);
    }

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
                        {truncate(body ?? '-', {length: getBodyLength(isExpanded)})}
                    </Card.Text>
                    <div className="mb-2">
                        <a href="#1" onClick={handleExpand}>
                            Read {isExpanded ? 'less' : 'more'}
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
