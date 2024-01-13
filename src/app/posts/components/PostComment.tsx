import React from 'react';
import {Card} from 'react-bootstrap';
import {IComment} from '../../../shared/model/Comment';


const PostComment: React.FC<Pick<IComment, 'body' | 'name' | 'email'>> = ({body, name, email}) => {
    return (
        <Card className="mt-3">
            <Card.Body>
                <div>
                    <div>
                        <span className="fw-bold text-muted">
                            Email:
                        </span>
                        <span className="text-muted">
                            {email}
                        </span>
                    </div>
                    <div>
                        <span className="fw-bold text-muted">
                            Name:
                        </span>
                        <span className="text-muted">
                            {name}
                        </span>
                    </div>
                    <div>
                        <span className="fw-bold text-muted">
                            Body:
                        </span>
                        <span className="text-muted">
                            {body}
                        </span>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default PostComment;