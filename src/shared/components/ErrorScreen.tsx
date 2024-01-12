import React from 'react';

interface IProps {
    message: string;
}

const ErrorScreen: React.FC<IProps> = ({message}) => {
    return (
        <div className="flex-center flex-column mt-5">
            <h5 className="text-danger text-center">Ooops!</h5>
            <p>{message}</p>
        </div>
    );
};

export default ErrorScreen;
