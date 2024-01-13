import React from 'react';
import {Card, Placeholder, Row, Col, Container} from 'react-bootstrap';

interface IProps {
    colSize?: number;
    nbElements?: number;
}

const SkeletonCard: React.FC<IProps> = ({colSize = 4, nbElements = 12}) => {
    return (
        <Container>
            <Row>
                {[...Array(nbElements)].map((_, index) =>
                    <Col md={colSize} key={index} className="my-3">
                        <Card>
                            <Card.Body>
                                <Placeholder as={Card.Title} animation="glow">
                                    <Placeholder xs={6}/>
                                </Placeholder>
                                <Placeholder as={Card.Text} animation="glow">
                                    <Placeholder xs={7}/> <Placeholder xs={4}/> <Placeholder xs={4}/>{' '}
                                    <Placeholder xs={6}/> <Placeholder xs={8}/>
                                </Placeholder>
                                <Placeholder.Button variant="primary" xs={6}/>
                            </Card.Body>
                        </Card>
                    </Col>)
                }
            </Row>
        </Container>
    );
};

export default SkeletonCard;
