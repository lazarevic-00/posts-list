import React from 'react';
import {Spinner} from 'react-bootstrap';

interface IProps {
    message?: string;
}

const LoadingScreen: React.FC<IProps> = ({message = 'Loading...'}) => {
    return (
        <div className="flex-center my-5">
            <Spinner animation="border" variant="muted" role="status"/>
            <h5 className="text-muted text-center ms-2 mb-0">{message}</h5>
        </div>
    );
};

export default LoadingScreen;
