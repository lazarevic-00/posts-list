import React from 'react';
import {IUser} from '../../../shared/model/User';
import {users} from '../../../utils/data/users';

interface IAuthorProps {
    userId: number
}

const PostAuthorDetails: React.FC<IAuthorProps> = ({userId}) => {
    const user = users.find(u => u.id === userId)

    return (
        <div>
            <span className="fw-bold">By:</span>
            <span> {user?.name}</span>
        </div>
    )
};


export default PostAuthorDetails;
