import React from 'react';

interface IProps {
    message?: string;
}

const LoadingScreen: React.FC<IProps> = ({message = 'Loading...'}) => {
    return (
        <div className="flex-center text-center my-5">
            <h5 className="text-muted">{message}</h5>
        </div>
    );
};

export default LoadingScreen;
