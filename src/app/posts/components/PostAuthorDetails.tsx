import React from 'react';

interface IAuthorProps {
    userId: number
}

const PostAuthorDetails: React.FC<IAuthorProps> = ({userId}) => {

    return (
        <div>
            <span className="fw-bold">By:</span>
            <span> {userId} ID</span>
        </div>
    )
};


export default PostAuthorDetails;
