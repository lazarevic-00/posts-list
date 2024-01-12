import React, {SetStateAction} from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';

interface IProps {
    limit: number;
    setLimit: React.Dispatch<SetStateAction<number>>
    handleSetLimit: () => void;
}

const GalleryFilter: React.FC<IProps> = ({handleSetLimit, limit, setLimit}) => {
    return (
        <Row className="mb-4 ">
            <Col xs={12} className="d-flex align-items-center justify-content-end">
                <Form.Control
                    type="number"
                    placeholder="Select number for displaying images"
                    className="w-25"
                    value={limit}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLimit(e?.target?.valueAsNumber)}
                    min="1"
                />
                <Button variant="primary"
                        className="w-25 ms-2"
                        onClick={handleSetLimit}>
                    Set Filter
                </Button>
            </Col>
        </Row>
    );
};

export default GalleryFilter;
